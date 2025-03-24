// api/controllers/UserController.js
const fs = require('fs');
const path = require('path');

// Hardcoded user
let currentUser = {
  name: "Avery Lane",
  email: "avery@email.com",
  phone: "555-123-4567",
  rsvpEventIds: ["1742511140628", "1742511140626"]
};

module.exports = {
  showUserPage: async function (req, res) {
    const eventsPath = path.resolve(__dirname, '../../assets/events/events.json');
    const events = JSON.parse(fs.readFileSync(eventsPath));
    const userEvents = events.filter(event => currentUser.rsvpEventIds.includes(event.id));

    return res.view('pages/userpage', { user: currentUser, userEvents });
  },

  editForm: function (req, res) {
    return res.view('pages/edituser', { user: currentUser });
  },

  updateInfo: function (req, res) {
    currentUser.name = req.body.name;
    currentUser.email = req.body.email;
    currentUser.phone = req.body.phone;

    return res.redirect('/userpage');
  }
};
