const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => res.status(500).send({ message: err }));
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(400).send({ message: 'Переданы некорректный _id при удалении карточки.' }))
    .catch(() => res.status(404).send({ message: 'Карточка с указанным _id не найдена.' }))
    .catch((err) => res.status(500).send({ message: err }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.send({ data: card });
    })
    .catch(() => res.status(400).send({ message: 'Переданы некорректные данные при создании карточки.' }))
    .catch((err) => res.status(500).send({ message: err }));
};

const putLike = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      res.send({ data: card });
    })
    .catch(() => res.status(400).send({ message: 'Переданы некорректные данные для постановки лайка.' }))
    .catch(() => res.status(404).send({ message: 'Передан несуществующий _id карточки.' }))
    .catch((err) => res.status(500).send({ message: err }));
};

const deleteLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      res.send({ data: card });
    })
    .catch(() => res.status(400).send({ message: 'Переданы некорректные данные при снятии лайка.' }))
    .catch(() => res.status(404).send({ message: 'Передан несуществующий _id карточки.' }))
    .catch((err) => res.status(500).send({ message: err }));
};

module.exports = {
  getCards,
  deleteCard,
  createCard,
  putLike,
  deleteLike,
};
