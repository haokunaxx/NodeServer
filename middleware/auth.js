const jwt = require('../utils/jwt');
const { jwtSecretKey } = require('../config'); 
const { User } = require('../db');
// 中间件参数固定
module.exports = async (req,res,next) => {
	//从请求头获取token
	// 验证token
	// 	无效 => 201响应码
	// 	有效 => 把用户信息挂载载req上 向后继续执行
	console.log(req.headers);
	let token = req.headers.authorization;
	if(!token){
		return res.status(401).send('用户未授权');
	}
	try{
		let decodedToken = await jwt.verify(token.split('Bearer ')[1],jwtSecretKey);
		// req.userId = ret.userId;
		// console.log(decodedToken);
		req.user = await User.findById(decodedToken.userId);
		next();
	}catch(err){
		// console.log(err);
		return res.status(401).send('用户未授权');
	}

	// console.log('--',ret
}