const router = require('express').Router();
const {
  getUsers, getUserById, createUser, refreshUser, refreshAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUserById);
router.post('/', createUser);
router.patch('/me', refreshUser);
router.patch('/me/avatar', refreshAvatar);

module.exports = router;
