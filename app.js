const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routerUsers = require('./routes/users');
const routerCards = require('./routes/cards');

const app = express();

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
});

app.use((req, res, next) => {
  req.user = {
    _id: '631d814832dbdea3b57f6afe',
  };

  next();
});

app.use('/users', routerUsers);
app.use('/cards', routerCards);

app.listen(3000, () => {
  console.log('Сервер запущен');
});
