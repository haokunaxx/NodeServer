const express = require('express');

const userRouter = require('./user');
const articleRouter = require('./article');

const router = express.Router();

router.use('/user',userRouter);
router.use('/articles',articleRouter);

module.exports = router;
