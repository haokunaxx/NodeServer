const crypto = require('crypto');

const { md5SecretKey } = require('../config');
// console.log(crypto.getHashes());	//获取所有的编码方式

module.exports =  str => {
	return crypto.createHash('md5')
		.update(md5SecretKey + str)
		.digest('hex');			//设置编码的格式，hex:十六进制输出	
}				