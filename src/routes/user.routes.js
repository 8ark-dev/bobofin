module.exports = (app) => {
  const user = require('../controller/user.controller.js');
  // Create a new User
  //express 에서 생성한 APP을 POST로 받아서 user.create로 전달
  app.post('/', user.create);

  app.get('/', (req, res) => {
    res.json({ message: 'Hello World!' });
  });

  app.post('/post', (req, res) => {
    console.log(req.body);
  });

  // Retrieve all Users
  //app.get('/', user.findAll);

  // Retrieve a single User with id
  // app.get('/:id', user.findOne);

  // // Update a User with id
  // app.put('/:id', user.update);

  // // Delete a User with id
  // app.delete('/:id', user.delete);

  // // Delete all Users
  // app.delete('/', user.deleteAll);
};
