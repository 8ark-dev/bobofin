const Post = require('../models/post.model.js');
//만들어진 메소드를 사용하기 위해 모델을 가져옴
//데이터 생성
exports.create = (req, res) => {
  // 요청 유효성 검사
  if (!req.body) {
    res.status(400).send({
      message: 'content는 비어있을 수 없습니다.',
    });
  }

  // 포스트 생성
  const post = new Post({
    id: req.body.id,
    title: req.body.title,
    content: req.body.content,
  });

  // 포스트 저장
  Post.create(post, (err, data) => {
    if (err)
      // 500: 프론트가 아닌 서버측 에러
      res.status(500).send({
        message: err.message || '글 생성 중 오류가 발생했습니다.',
      });
    else res.send(data);
  });
};

// 모든 Post를 데이터베이스에서 검색
exports.findAll = (req, res) => {
  Post.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || '글 목록을 불러오는 중 오류가 발생했습니다.',
      });
    else res.send(data);
  });
};

// Delete specific Post from the database.
exports.delete = (req, res) => {
  Post.remove(req.body.id, (err, data) => {
    if (err) {
      //err.kind: 에러의 종류
      if (err.kind === 'not_found') {
        //not_found: 찾을 수 없는 에러
        res.status(404).send({
          message: `${req.params.id}로 돼있는 post를 찾을 수 없습니다.`,
        });
      } else {
        res.status(500).send({
          message: '글을 삭제할 수 없습니다.' + req.params.id,
        });
      }
    } else res.send({ message: `삭제 성공!` });
  });
}

// Update a Post identified by the id in the request
exports.update = (req, res) => {
  Post.updateById(req.body.id, new Post(req.body), (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `post를 찾을 수 없습니다. ${req.params.id}`
        });
      } else {
        res.status(500).send({
          message: '글을 수정할 수 없습니다. ' + req.params.id
        });
      }
    } else res.send(data);
  });
};