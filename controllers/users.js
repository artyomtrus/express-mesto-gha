const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => res.status(500).send({ message: err }));
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user === null) {
        return res.status(404).send({ message: 'Пользователь по указанному _id не найден.' });
      }
      return res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (res.status(400)) {
        res.send({ message: 'Не корректно введен _id пользователя' });
      } else {
        res.status(500).send({ message: err });
      }
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (res.status(400)) {
        res.send({ message: 'Переданы не корректные данные при создании пользователя' });
      } else {
        res.status(500).send({ message: err });
      }
    });
};

const refreshUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true,
    runValidators: true,
  })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (res.status(400)) {
        res.send({ message: 'Переданы некорректные данные при обновлении профиля' });
      }
      if (res.status(404)) {
        res.send({ message: 'Пользователь с указанным _id не найден.' });
      } else {
        res.status(500).send({ message: err });
      }
    });
};

const refreshAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
  })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (res.status(400)) {
        res.send({ message: 'Переданы некорректные данные при обновлении аватара' });
      }
      if (res.status(404)) {
        res.send({ message: 'Пользователь с указанным _id не найден.' });
      } else {
        res.status(500).send({ message: err });
      }
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  refreshUser,
  refreshAvatar,
};
