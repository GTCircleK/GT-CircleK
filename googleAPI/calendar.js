const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
const SCOPES = require('./scopes');
const TOKEN_PATH = 'token.json';
const Event = require('../models/event');

// Load client secrets from a local file.
function readCredentialsToken(callback) {
  fs.readFile('credentials.json', (err, content) => {
    if (err) {
      console.log('Error loading client secret file:', err);
    }
    authorize(JSON.parse(content), callback);
  });
}


/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) {
        console.error('Error retrieving access token', err);
      }
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) {
          console.error(err);
        }
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listEvents(auth) {
  const calendar = google.calendar({ version: 'v3', auth });
  calendar.events.list({
    calendarId: 'primary',
    timeMin: (new Date()).toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
  }, (err, res) => {
    if (err) {
      throw err;
    }
    const events = res.data.items;
    if (events.length) {
      console.log('Upcoming 10 events:');
      events.map((event, i) => {
        const start = event.start.dateTime || event.start.date;
        console.log(`${start} - ${event.summary}`);
      });
    } else {
      console.log('No upcoming events found.');
    }
  });
}
// [END calendar_quickstart]


function createGoogleCalendarEvent(event) {
  var googleCalendarEvent = {
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

function createEvent(event) {
  readCredentialsToken(function (auth) {
    const calendar = google.calendar({ version: 'v3', auth });
    var googleCalendarEvent = createGoogleCalendarEvent(event);
    calendar.events.insert({
      auth: auth,
      calendarId: 'primary',
      resource: googleCalendarEvent
    }, (err, newEvent) => {
      if (err) {
        console.log(err);
      } else {
        // If event created successfully, add the Google event id in database
        console.log('Event created successfully: %s [id: %s]', newEvent.data.summary, newEvent.data.id);
        event['google_event_id'] = newEvent.data.id;
        Event.findByIdAndUpdate(event._id, event, (err, newEvent) => {
          if (err) {
            console.log(err);
          } else {
            console.log('Added Google Event Id to database');
          }
        });
      }
    });
  });
}

function updateEvent(updatedEvent) {
  readCredentialsToken(function (auth) {
    const calendar = google.calendar({ version: 'v3', auth });
    var googleCalendarEvent = createGoogleCalendarEvent(updatedEvent);

    console.log('Updating the Google calendar event %s', updatedEvent.google_event_id);

    calendar.events.update({
      auth: auth,
      calendarId: 'primary',
      eventId: updatedEvent.google_event_id,
      resource: googleCalendarEvent
    }, (err, newEvent) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Event updated successfully: %s [id: %s]', newEvent.data.summary, newEvent.data.id);
      }
    });
  });
}

function deleteEvent(deleteEvent) {
    readCredentialsToken(function (auth) {
    const calendar = google.calendar({ version: 'v3', auth });
    console.log('Deleting the Google calendar event %s', deleteEvent.google_event_id);

    calendar.events.delete({
      auth: auth,
      calendarId: 'primary',
      eventId: deleteEvent.google_event_id
    }, (err, newEvent) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Successfully delete the event: %s', deleteEvent.title);
      }
    });
  });
}

module.exports = {
  createEvent,
  updateEvent,
  deleteEvent
};
