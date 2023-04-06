const sql = require('./db.js');
//실질적으로 데이터베이스와 연결되는 부분
//모든 메소드를 정의하는 부분

// 생성자
const Post = function (post) {
  this.id = post.id;
  this.title = post.title;
  this.content = post.content;
};

Post.create = (post, result) => {
  sql.query('INSERT INTO post (id, title, content) VALUES (?, ?, ?)', [post.id, post.title, post.content], (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }
    console.log('글 생성 : ', { id: res.insertId, ...post });
    //result는 콜백함수이다. (에러, 결과)
    //콜백함수란 다른 함수의 인자로 넘겨주는 함수를 말한다.
    result(null, { id: res.insertId, ...post });
  });
};

Post.findById = (postId, result) => {
  sql.query(`SELECT * FROM post WHERE id = ${postId}`, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log('글 목록 : ', res[0]);
      result(null, res[0]);
      return;
    }
    // not found Post with the id
    result({ kind: 'not_found' }, null);
  });
};

Post.getAll = (result) => {
  sql.query('SELECT * FROM post', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }
    console.log('글 : ', res);
    result(null, res);
  });
};

Post.updateById = (id, post, result) => {
  sql.query(
    'UPDATE post SET title = ?, content = ? WHERE id = ?',
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
      console.log('글 갱신 : ', { id: id, ...post });
      result(null, { id: id, ...post });
    }
  );
};

Post.remove = (id, result) => {
  sql.query('DELETE FROM post WHERE id = ?', id, (err, res) => {
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
    console.log('글 삭제 : ', id);
    result(null, res);
  });
};

module.exports = Post;
