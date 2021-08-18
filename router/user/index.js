const express = require('express');

const { registerHandler, 
		queryAllUserInfo, 
		queryUserInfoByUsername } = require('../../controller/user');

const { registerValidator } = require('../../validator/user');

const router = express.Router();

router.get('/all', queryAllUserInfo);

router.get('/:username', queryUserInfoByUsername);

router.post('/register', registerValidator ,registerHandler)

module.exports = router;
// exports.userRouter = router;