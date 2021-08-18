const { User } = require('../db');

module.exports = {
	// 查询所有用户数据
	queryAllUserInfo: (req,res) => {
		User.find().then(data => {
	        res.json(data);
	    });
	},
	
	// 根据用户名查询用户信息
	queryUserInfoByUsername: (req,res)=>{
		let { username } = req.params;
	    User.find({username}).then(user=>{
	        res.json(user);
	    })
	},

	// 注册逻辑处理
	registerHandler:(req,res)=>{
		// User.create(req.body).then(data=>{
		//        data.save();
		//        res.send('保存成功')
		//    })

		new User(req.body).save().then(data=>{
			res.send('保存成功');
		})
	}
}
