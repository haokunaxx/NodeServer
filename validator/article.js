const mongoose = require('mongoose');

const { body, param } = require('express-validator');

const validator = require('../middleware/validator');

exports.createArticle = validator([
	body('article.title').notEmpty().withMessage('文章标题不能为空')
		.isString().withMessage('文章标题格式不正确'),
	body('article.description').notEmpty().withMessage('文章描述不能为空')
		.isString().withMessage('文章描述格式不正确'),
	body('article.body').notEmpty().withMessage('文章正文不能为空')
		.isString().withMessage('文章正文格式不正确'),
])

exports.getArticle = validator([
	param('id').custom(async value => {
		console.log(value);
		if(!mongoose.isValidObjectId(value)){
			return Promise.reject('id 不是一个有效的ObjectId');
		}
	})
])