const { google } = require('googleapis');
const Event = require('../models/event');

const { getoAuth2Client } = require('./client');

/**
 * This takes event that was added to the database updates it to match
 * google API event resource
 * 
 * @param {Object} event Event object stored in the database
 * @returns {Object} event Event object formatted to match google API event resource
 */
function createGoogleCalendarEvent(event) {

  let googleCalendarEvent = {
    summary: event.title,
    location: event.address,
    start: { dateTime: (new Date(event.from)).toISOString() },
    end: { dateTime: (new Date(event.to)).toISOString() },
    description: event.description,
    colorId: 1
  };

  if (event.link && event['link'].trim().length > 0) {
    googleCalendarEvent.description += '\r\n\nSign Up: ' + event.link;
  }

  if (event.special && event['special'].trim().length > 0) {
    googleCalendarEvent.description += '\r\n\n' + event.special;
  }

  return googleCalendarEvent;
}

/**
 * Format the provided event object to match the event resource.
 * Insert the event using Google Calendar API
 * Update the event object in the database to store the event id from the Google Calendar
 * 
 * @param {Object} event event object stored in the database
 */
async function createEvent(event) {
  const auth = await getoAuth2Client();
  const calendar = google.calendar({ version: 'v3', auth });

  let googleCalendarEvent = createGoogleCalendarEvent(event);
  
  let response = await calendar.events.insert({
    auth: auth,
    calendarId: 'primary',
    resource: googleCalendarEvent
  });

  console.log('Event created successfully: %s [id: %s]', response.data.summary, response.data.id);
  event['google_event_id'] = response.data.id;

  Event.findByIdAndUpdate(event._id, event, (err, updatedEvent) => {
    if (err) {
      throw new Error('Failed to add Google Event Id to the database');
    } else {
      console.log('Added Google Event Id to database');
    }
  });

}

/**
 * Format the provided event object to match the event resource
 * Update the event in google calendar using the Google Calendar API
 * The Google Event Id is stored in the database
 * 
 * @param {Object} updatedEvent event object stored in the database
 */
async function updateEvent(updatedEvent) {
  const auth = await getoAuth2Client();
  const calendar = google.calendar({ version: 'v3', auth });

  if (updatedEvent.google_event_id){
    var googleCalendarEvent = createGoogleCalendarEvent(updatedEvent);
    console.log('Updating the Google calendar event %s', updatedEvent.google_event_id);

    let response = await calendar.events.update({
      auth: auth,
      calendarId: 'primary',
      eventId: updatedEvent.google_event_id,
      resource: googleCalendarEvent
    });

    console.log('Event updated successfully: %s [id: %s]', response.data.summary, response.data.id);
  } else {
    throw new Error('No Google Event found for the event');
  }
  
}

/**
 * Delete the event in google calendar using the Google Calendar API
 * The Google Event Id is stored in the database
 * 
 * @param {Object} deleteEvent event object stored in the database to be deleted
 */
async function deleteEvent(deleteEvent) {
  const auth = await getoAuth2Client();
  const calendar = google.calendar({ version: 'v3', auth });

  if (deleteEvent.google_event_id) {
    console.log('Deleting the Google calendar event %s', deleteEvent.google_event_id);

    let response = await calendar.events.delete({
      auth: auth,
      calendarId: 'primary',
      eventId: deleteEvent.google_event_id
    });

    console.log('Successfully deleted the event: %s', deleteEvent.title);

  } else {
    throw new Error('No Google Event found for the event');
  }

}

module.exports = {
  createEvent,
  updateEvent,
  deleteEvent
};

/**
 * Just a test method to check if the API is working
 */
async function testListEvents() {
  const auth = await getoAuth2Client();
  const calendar = google.calendar({ version: 'v3', auth });

  let response = await calendar.events.list({
    calendarId: 'primary',
    timeMin: (new Date()).toISOString(),
    maxResults: 5,
    singleEvents: true,
    orderBy: 'startTime',
  });

  const events = response.data.items;
  if (events.length) {
    console.log('Upcoming 5 events:');
    events.map((event, i) => {
      const start = event.start.dateTime || event.start.date;
      console.log(`${start} - ${event.summary}`);
    });
  } else {
    console.log('No upcoming events found.');
  }
}

// let testEvent = {
//   title: 'Test',
//   description: 'Test',
//   location: 'Test',
//   address: 'Test',
//   pickup: 'Test',
//   dress: 'Test',
//   link: 'Test',
//   special: 'Test',
//   from: '2020-06-06T17:00:00.000Z',
//   to: '2020-06-06T19:00:00.000Z',
//   __v: 0
// }
// testListEvents().catch(err => console.log('Test List events failed'));
