const sql = require('./db.js');

// 생성자
const Post = function (post) {
  this.id = post.id;
  this.title = post.title;
  this.content = post.content;
};

Post.create = (post, result) => {
  sql.query('INSERT INTO user SET ?', post, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }
    console.log('created post: ', { id: res.insertId, ...newPost });
    result(null, { id: res.insertId, ...newPost });
  });
};

Post.findById = (postId, result) => {
  sql.query(`SELECT * FROM user WHERE id = ${postId}`, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log('found post: ', res[0]);
      result(null, res[0]);
      return;
    }
    // not found Post with the id
    result({ kind: 'not_found' }, null);
  });
};

Post.getAll = (result) => {
  sql.query('SELECT * FROM user', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }
    console.log('posts: ', res);
    result(null, res);
  });
};

Post.updateById = (id, post, result) => {
  sql.query(
    'UPDATE user SET title = ?, content = ? WHERE id = ?',
    [post.title, post.content, id],
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found Post with the id
        result({ kind: 'not_found' }, null);
        return;
      }
      console.log('updated post: ', { id: id, ...post });
      result(null, { id: id, ...post });
    }
  );
};

Post.remove = (id, result) => {
  sql.query('DELETE FROM user WHERE id = ?', id, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      // not found Post with the id
      result({ kind: 'not_found' }, null);
      return;
    }
    console.log('deleted post with id: ', id);
    result(null, res);
  });
};

module.exports = Post;
