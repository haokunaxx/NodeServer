const express = require('express');
const mongoose = require("mongoose");

const morgan = require('morgan');   //控制台输出中间件
const cors = require('cors');       //请求跨域中间件

const { MongooseConnect } = require('./db');    //引入数据库

const router = require('./router'); //引入路由

const app = express();

//解析请求头，json解析json格式的post请求，urlencoded解析x-www-form-urlencoded格式的post请求
app.use(express.json());
// app.use(express.urlencoded());

app.use(morgan('dev')); //控制信息

app.use(cors());    //跨域

app.use('/api',router);

app.get('/',(req,res)=>{
    res.send('hello');
})

// 错误捕获
app.use((err,req,res,next)=>{
    if(err){
        res.send('出错了');
    }
})

// 连接数据库，连接数据库成功后启动服务。
MongooseConnect(()=>{
    app.listen(8080,()=>console.log('server is running at localhost:8080'))
});