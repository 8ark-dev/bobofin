module.exports = (app) => {
  const posts = require('../controller/post.controller.js');

  app.post('/post', posts.create);
};
