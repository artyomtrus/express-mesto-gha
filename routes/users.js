const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers,
  getUserById,
  getUserByMe,
  refreshUser,
  refreshAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getUserByMe);
router.get('/:userId', getUserById);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), refreshUser);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().min(2).pattern(/^https?:\/\/(www\.)?[a-zA-Z\d-]+\.[\w\d\-.~:/?#[\]@!$&'()*+,;=]{2,}#?$/),
  }),
}), refreshAvatar);

module.exports = router;
