const { body } = require('express-validator');
const { User } = require('../db');
const validator = require('../middleware/validator');

const md5 =  require('../utils/md5');


//validator为中间件函数。
exports.registerValidator = validator([
	body('username').notEmpty().isString()
		.bail()	//如果之前的验证失败则没有必要验证之后的。 bail可以停止，并且返回验证实例。
		.custom(async username=>{
			let existUser = await User.find({username});
			// console.log(existUser);
			if(existUser.length > 0){
				return Promise.reject('当前用户名已经被使用');
			} 
		}).withMessage('当前用户名已经被使用'),
		// 方式二：
		// .custom(username => {
		// 	return User.find({username}).then(data=>{
		// 		if(data.length !== 0){
		// 			return Promise.reject('当前用户名已经被使用');
		// 		}
		// 	})
		// }).withMessage('当前用户名已经被使用'),
		
	body('email').notEmpty().withMessage('邮箱不能为空')
		.bail().isString().withMessage('邮箱格式不正确')
		.bail().isEmail().withMessage('邮箱格式不正确')
		.bail().custom(async email=>{
			let existUser = await User.find({email});
			// console.log('---',existUser);
			if(existUser.length > 0){
				return Promise.reject('邮箱已存在');
			} 
		}).withMessage('邮箱已存在'),

	body('password').notEmpty().withMessage('密码不能为空')
		.bail().isString().withMessage('密码格式不正确')
		.bail().isLength({min:6}).withMessage('密码过短')
])


// 可以使用数组将其包裹起来。
exports.loginValidator = [
	validator([
		body('email').notEmpty().withMessage('登录邮箱不能为空')
			.isEmail().withMessage('邮箱格式不正确'),
		body('password').notEmpty().withMessage('登陆密码不能为空')
			.isLength({min:6}).withMessage('密码大于等于6位')
	]),
	validator([
		body('email').custom(async (email, { req  })=>{
			// console.log(req.body);
			let user = await User.findOne({email}).select(['password','email','bio','image','username']);
			if(!user){
				return Promise.reject('当前邮箱未注册');
			}
			req.user = user;
		})
	]),
	validator([
		body('password').custom(async (password,{ req })=>{
			if(md5(password) !==  req.user.password){
				return Promise.reject('密码错误');
			}
		})
	])
]