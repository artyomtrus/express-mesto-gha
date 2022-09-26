const router = require('express').Router();
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
router.patch('/me', refreshUser);
router.patch('/me/avatar', refreshAvatar);

module.exports = router;
