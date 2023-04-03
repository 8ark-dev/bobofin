const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 8080;

app.use(bodyParser.json()); //undefined 데이터 처리를 위한 미들웨어
app.use(cors()); //cors 처리를 위한 미들웨어

require('./routes/post.routes.js')(app);
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
