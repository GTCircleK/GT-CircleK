// TODO - Set up this schema in database
/* Generic Event Format
Remove the attribute if no entries for it
{
    'title': '',
    'multiDay': false,
    'from': '2019-10-29T18:00',
    'to': '2019-10-29T19:00',
    'description': '',
    'address': '',
    'pickup': '',
    'dress': '',
    'link': '',
    'special': ''
}
*/

let events = [
    {
        'title': 'Pumpkin and Gourd Painting',
        'multiDay': false,
        'from': '2019-10-29T18:00',
        'to': '2019-10-29T19:00',
        'description': 'Come have some fun and relax by painting a pumpkin or gourd!',
        'address': 'Instructional Center 211'
    },
    {
        'title': 'Trick or Treating',
        'multiDay': true,
        'from': '2019-10-31T17:00',
        'to': '2019-10-31T21:00',
        'description': 'Trick or treating to fundraise for UNICEF',
        'address': 'TBD. Let us know if there\'s an ATL neighborhood you recommend!',
        'dress': 'Show us your best',
        'special': 'Text Lucy (912- 506-2716) if you want to go'
    },
    {
        'title': 'Kiwanis Henry County Fair',
        'multiDay': false,
        'from': '2019-11-02T16:00',
        'to': '2019-11-02T20:00',
        'description': 'Help out at the entrances and wherever else needed at the fair. Also meet other Circle K members from the Metro Division (Emory, GSU, Lagrange, West GA, Spelman, and Southern Crescent). There are two two-hour shifts (4 - 6 pm and 6 - 8 pm). Feel free to volunteer for one shift and explore the fair or volunteer for both shifts!',
        'address': '99 Lake Dow Rd, McDonough, GA 30252',
        'link': 'https://docs.google.com/forms/d/e/1FAIpQLScWmpUFRd_jrI4-i-UEhN-yw1C7kw8_CpPq9SMrMlje-S98FA/viewform'
    },
    {
        'title': 'Fall Membership Retreat (FMR)',
        'multiDay': true,
        'from': '2019-11-08',
        'to': '2019-11-10',
        'description': "FMR is an annual Georgia Circle K weekend-long conference where Circle K\'ers from all over Georgia gather to have fun and learn more about leadership and service through workshops, team-bonding experiences, and more!\nThere'll be a bonfire Friday night, an off-site service project on Saturday along with workshops and team-building activities, and we'll get back to GT on Sunday around noon",
        'address': 'FFA-FFCLA campsite in Covington, GA',
        'pickup': 'TBD',
        'link': 'https://docs.google.com/forms/d/1CCApCMfT7Ocxx6QphEkgkQ0ctBYFzk2ZtHZ5Jtj9bmc/viewform',
        'special': 'Cost: $50/person. It includes 4 meals, 2 nights in a cabin and a t-shirt.\nVenmo (@GTCircleK), cash, or check (Georgia Tech Circle K)'
    },
    {
        'title': 'Penny Wars',
        'multiDay': true,
        'from': '2019-09-16',
        'to': '2019-11-18',
        'description': 'This is a fundraiser for WASH. We are competing against UGA to see which club raises the most money. Prize for whoever raises the most money in the club.'
    }
];

module.exports = events;