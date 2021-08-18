const mongoose = require('mongoose');

const { dbPath } = require('../config');

const userSchema = require('../model/user');

exports.MongooseConnect = (callback) => {
	// 云数据库
    // mongoose.connect('mongodb+srv://test:123321@cluster0.dd5e4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
    // 项目数据库
    // mongoose.connect('mongodb://localhost:27017/realWorld')
    // 测试数据库
    mongoose.connect(dbPath,{   //配置项，不设置powershell有警告信息
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(client=>{
        console.log('连接数据库成功!',client);
        callback();           //提供数据库访问的对象
    })
    .catch(err=>{
        console.log(err);
    })
}

exports.User = mongoose.model('User', userSchema);;