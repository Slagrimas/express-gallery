const express = require('express');
const PORT = process.env.EXPRESS_HOST_PORT;
const bodyParser = require('body-parser');

const app = express();

// const userRouter = require('./routes/users');
// const postRouter = require('./routes/post');

app.use(bodyParser.urlencoded({extended: true}));

// app.use('/users', userRouter);
// app.use('/posts', postRouter)

app.get('/', (req, res) => {
  res.send('smoke test');
}); 
 
app.listen(PORT, () => {
  process.stdout.write(`Server listening on port: ${PORT}`);
});