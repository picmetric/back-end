const router = require('express').Router();

const authRouter = require('../routers/auth/auth-router.js');
const usersRouter = require('../routers/auth/users-router.js');

router.use('/auth', authRouter);
router.use('/users', usersRouter);

router.get('/', (req, res) => {
  res.json({
    api: 'It running'
  });
});

module.exports = router;
