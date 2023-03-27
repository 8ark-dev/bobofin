const User = require('../models/user.model.js');

//ROUTES에서 넘어온 get에 대한 처리
exports.create = (req, res) => {
  if (!req.body) {
    //만약 요청이 들어온 데이터가 없다면
    res.status(400).send({
      message: 'title can not be empty!',
    });
  }

  //데이터가 정상적으로 들어왔다면
  const user = new User({
    title: req.body.title,
    content: req.body.content,
  });

  //해당 데이터를 이용해서 DB에 저장
  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the User.',
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  User.findall((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving user.',
      });
    else res.send(data);
  });
};
