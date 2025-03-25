module.exports.routes = {

  // Homepage Routes
  '/': { view: 'pages/homepage' },
  'GET /': 'HomeController.homepage',

  // User Routes
  'GET /userpage': 'UserController.showUserPage',
  'GET /user/edit': 'UserController.editForm',

  'POST /user/update': 'UserController.updateInfo',
  'POST /user/rsvp': 'UserController.rsvpToEvent',
  'POST /user/cancel-rsvp': 'UserController.cancelRsvp',

  //Event Routes
  'GET /events/zip': 'EventController.showEventsPage',

  'GET /event/add': 'EventController.showAddForm',
  'POST /events/local/add': 'EventController.handleAddForm',

  'GET /event/delete': 'EventController.showDeleteForm',
  'POST /events/local/delete': 'EventController.handleDeleteForm',

  // API Routes
  // 0223981 (Updated event API server)
  '/events': { view: 'events/index' },
  'GET /api/events': 'EventController.fetchEvents'
};
