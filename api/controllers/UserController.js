const fs = require('fs');
const path = require('path');

// Paths
const userDataPath = path.resolve(__dirname, '../../assets/user-data.json');
const eventsPath = path.resolve(__dirname, '../../assets/events/events.json');

// Load user from file (or return default)
function loadUser() {
  if (!fs.existsSync(userDataPath)) {
    return {
      name: "Avery Lane",
      email: "avery@email.com",
      phone: "555-123-4567",
      rsvpEventIds: []
    };
  }
  return JSON.parse(fs.readFileSync(userDataPath, 'utf8'));
}

// Save user to file
function saveUser(user) {
  fs.writeFileSync(userDataPath, JSON.stringify(user, null, 2));
}

module.exports = {
  // Render the user profile with RSVP'd events
  showUserPage: function (req, res) {
    const user = loadUser();
    const events = JSON.parse(fs.readFileSync(eventsPath));
    const userEvents = events.filter(event => user.rsvpEventIds.includes(event.id));
    const message = req.session.message;
    delete req.session.message;

    return res.view('pages/userpage', { user, userEvents, message });
  },

  // Show edit form for user info
  editForm: function (req, res) {
    const user = loadUser();
    return res.view('pages/edituser', { user });
  },

  // Update user info and save
  updateInfo: function (req, res) {
    const user = loadUser();
    user.name = req.body.name;
    user.email = req.body.email;
    user.phone = req.body.phone;
    saveUser(user);
    return res.redirect('/userpage');
  },

  // RSVP to an event
  rsvpToEvent: function (req, res) {
    const { eventId } = req.body;
    const user = loadUser();

    if (!user.rsvpEventIds.includes(eventId)) {
      user.rsvpEventIds.push(eventId);
      saveUser(user);
      return res.json({ message: 'RSVP successful!' });
    } else {
      return res.json({ message: 'Already RSVP’d to this event.' });
    }
  },

  // Cancel RSVP and show message
  cancelRsvp: function (req, res) {
    const { eventId } = req.body;
    const user = loadUser();

    const index = user.rsvpEventIds.indexOf(eventId);
    if (index !== -1) {
      user.rsvpEventIds.splice(index, 1);
      saveUser(user);
      req.session.message = 'RSVP canceled successfully.';
    } else {
      req.session.message = 'Event was not in your RSVP list.';
    }

    return res.redirect('/userpage');
  }
};
