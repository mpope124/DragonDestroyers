module.exports.routes = {


  '/': { view: 'pages/homepage' },
  '/events': { view: 'events/index' },
  'GET /': 'HomeController.homepage',


  // Route to user
  'GET /userpage': 'UserController.showUserPage',

  // Route to edit user details
  'GET /user/edit': 'UserController.editForm',
  'POST /user/update': 'UserController.updateInfo',

  // API Routes
  // 0223981 (Updated event API server)
  'GET /api/events': 'EventController.fetchEvents',
  'POST /api/events': 'EventController.addEvent',
  'DELETE /api/events/:id': 'EventController.deleteEvent'
};
