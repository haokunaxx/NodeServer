const { body } = require('express-validator');
const { User } = require('../db');
const validator = require('../middleware/validator');

module.exports = {
	registerValidator:validator([
		body('username').notEmpty().isString()
			.bail()	//如果之前的验证失败则没有必要验证之后的。 bail可以停止，并且返回验证实例。
			.custom(async username=>{
				let existUser = await User.find({username});
				console.log(existUser);
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
				console.log('---',existUser);
				if(existUser.length > 0){
					return Promise.reject('邮箱已存在');
				} 
			}).withMessage('邮箱已存在'),

		body('password').notEmpty().withMessage('密码不能为空')
			.bail().isString().withMessage('密码格式不正确')
			.bail().isLength({min:6}).withMessage('密码过短')
	])
}
