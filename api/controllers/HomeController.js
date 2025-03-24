const fs = require('fs');
const path = require('path');

module.exports = {
  homepage: function (req, res) {
    const eventsPath = path.resolve(__dirname, '../../assets/events/events.json');
    const events = JSON.parse(fs.readFileSync(eventsPath));

    // Choose a few featured events (first 3)
    const featuredEvents = events.slice(0, 3);

    return res.view('pages/homepage', { featuredEvents });
  }
};
