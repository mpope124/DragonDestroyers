const fs = require('fs');
const path = require('path');

// Path to events data
const eventsPath = path.resolve(__dirname, '../../assets/events/events.json');

// Load events from file
function loadEvents() {
  return JSON.parse(fs.readFileSync(eventsPath, 'utf8'));
}

// Save events to file
function saveEvents(eventList) {
  fs.writeFileSync(eventsPath, JSON.stringify(eventList, null, 2));
}

module.exports = {
  // Show the main event search/map page
  showEventsPage: function (req, res) {
    const events = loadEvents();
    return res.view('pages/events', { events });
  },

  // ======================
  // 🔹 ADD EVENT
  // ======================

  // Show add event form
  showAddForm: function (req, res) {
    const message = req.session.message;
    delete req.session.message;
    return res.view('pages/addevent', { message });
  },

  // Handle form submission to add event
  handleAddForm: function (req, res) {
    const events = loadEvents();

    const newEvent = {
      id: Date.now().toString(),
      name: req.body.name,
      location: req.body.location,
      date: req.body.date,
      description: req.body.description,
      lat: parseFloat(req.body.lat),
      lng: parseFloat(req.body.lng)
    };

    events.push(newEvent);
    saveEvents(events);

    req.session.message = 'Event added successfully!';
    return res.redirect('/event/add');
  },

  // ======================
  // 🔹 DELETE EVENT
  // ======================

  // Show delete event form
  showDeleteForm: function (req, res) {
    const events = loadEvents();
    const message = req.session.message;
    delete req.session.message;
    return res.view('pages/deleteevent', { events, message });
  },

  // Handle delete form submission
  handleDeleteForm: function (req, res) {
    let events = loadEvents();
    const eventId = req.body.id;

    const originalLength = events.length;
    events = events.filter(event => event.id !== eventId);

    if (events.length < originalLength) {
      saveEvents(events);
      req.session.message = 'Event deleted successfully.';
    } else {
      req.session.message = 'Event not found.';
    }

    return res.redirect('/event/delete');
  }
};
