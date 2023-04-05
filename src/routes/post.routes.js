module.exports = (app) => {
  const posts = require('../controller/post.controller.js');

  app.post('/post', posts.create);
  app.get('/post', posts.findAll);
  app.delete('/post', posts.delete);
  app.put('/post', posts.update);
};
