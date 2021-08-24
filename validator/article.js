const mongoose = require('mongoose');

const { body, param } = require('express-validator');

const { Article } = require('../db');

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
// console.log(validator);
exports.deleteArticle = [
	validator([
		validator.isValidObjectId(['params'],'id')
	]),
	async (req,res,next)=>{
		let article = await Article.findById(req.params.id);
		if(!article){
			return res.status(404).send('文章不存在');
		}
		req.article = article;
		next();
	},
	async (req,res,next) => {
		let authorId = req.article.author.toString();	//转换成字符串比较ObjectID
		if(authorId != req.user._id.toString()){
			return res.status(403).send('当前用户没有权限');
		}
		next();
	}
];

exports.updateArticle = [validator([
	body('article').custom(async value => {
		if(!value){
			return Promise.reject('更新数据为空');
		}
	})
]),...exports.deleteArticle];