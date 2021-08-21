const express = require('express');

const { registerHandler, 
		queryAllUserInfo, 
		queryUserInfoByUsername,
		loginHandler,
		getCurrentUser } = require('../../controller/user');

const { registerValidator,
		loginValidator } = require('../../validator/user');

const auth = require('../../middleware/auth');


const router = express.Router();




router.post('/register', registerValidator ,registerHandler);

router.post('/login',loginValidator, loginHandler )

router.get('/all', queryAllUserInfo);

router.get('/info', auth, getCurrentUser);

router.get('/:username', queryUserInfoByUsername);

module.exports = router;
// exports.userRouter = router;