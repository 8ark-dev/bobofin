const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 8000;

app.use(bodyParser.json()); //undefined 데이터 처리를 위한 미들웨어

// res : 사전에 정의된 응답 객체
// req : 정의되지 않은 데이터 처리를 위한 요청 객체

//조회
app.get('/', (req, res) => {
  // res.send('Hello World!');
  res.json({ message: 'Hello World!' });
});

// //생성 -> 요청이 온 데이터 처리
// app.post('/post', (req, res) => {
//   res.send(req.body);
// });

// //서버실행 (포트)
// require('./routes/user.routes.js')(app);
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});