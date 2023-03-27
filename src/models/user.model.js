const sql = require('./db.js');

// constructor
const User = function (user) {
  this.id = user.id;
  this.title = user.title;
  this.content = user.content;
};

User.create = (newUser, result) => {
  sql.query('INSERT INTO user SET ?', newUser, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    console.log('created user: ', { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};

User.findall = (result) => {
  sql.query('SELECT * FROM user', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    console.log('user: ', res);
    result(null, res);
  });
};
