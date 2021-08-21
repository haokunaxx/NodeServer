const { User } = require('../db');

// 查询所有用户数据
exports.queryAllUserInfo = (req,res,next) => {
	try{
		User.find().then(data => {
	        res.json(data);
	    });
	}catch(err){
		next(err);
	}
},

// 根据用户名查询用户信息
exports.queryUserInfoByUsername = async (req,res,next)=>{
	try{
		let { username } = req.params;
	    let user = await User.find({username}).select(['username',"bio","image",'email']); //过滤，指定的键名可以返回。
	    res.json(user);
	}catch(err){
		next(err);
	}
},

// 注册逻辑处理
exports.registerHandler = async (req,res,next)=>{
	try{
		// User.create(req.body).then(data=>{
		//        data.save();
		//        res.send('保存成功')
		//    })

		// new User(req.body).save().then(data=>{
		// 	res.send('保存成功');
		// })

		let user = new User(req.body);
		await user.save();

		let temp = user.toJSON();
		delete temp.password;

		res.status(201).json(temp);

	}catch(err){
		next(err);
	}
}
