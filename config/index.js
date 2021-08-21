// 云数据库
// mongoose.connect('mongodb+srv://test:123321@cluster0.dd5e4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
// 项目数据库
// mongoose.connect('mongodb://localhost:27017/realWorld')
// 测试数据库
// mongoose.connect('mongodb://localhost/test')
module.exports = {
	dbPath:'mongodb://localhost/test',
	md5SecretKey:'xuxin',
	jwtSecretKey:'98afc774-9088-4a60-87ad-2ae19176e6e5'
}