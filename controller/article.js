const { Article } = require('../db');

exports.createArticle = async (req,res,next) => {
	try{
		let article = new Article(req.body.article);
		article.author = req.user._id;
		await article.populate('author').execPopulate();
		await article.save();
		res.status(201).json(article);
	}catch(err){
		next(err);
	}
}

exports.getArticle = async (req,res,next) =>{
	try{
		let article = await Article.findById(req.params.id);
		if(!article){
			return res.status(404).send('文章不存在');
		}
		await article.populate('author').execPopulate();
		res.status(200).json(article);
	}catch(err){
		next(err);
	}
}

exports.deleteArticle = async (req,res,next) => {
	try{
		// 由于和更新文章接口有重复的、并且和验证有关（验证文章存不存在；验证操作的用户id和文章的作者id是否一致），所以抽取成验证中间件
		// let article = await Article.findById(req.params.id);
		// if(!article){
		// 	return res.status(404).send('文章不存在');
		// }
		// if(article.author.toString() != req.user._id.toString()){//转换成字符串比较ObjectID
		// 	return res.status(403).send('当前用户没有删除权限');
		// }

		let article = req.article;
		await article.remove();
		// res.status(204).send('删除成功');
		res.status(204).end();
	}catch(err){
		next(err);
	}
}

exports.updateArticle = async (req,res,next) => {
	let article = req.article,
		newArticle = req.body.article;

	article.title = newArticle.title || article.title;
	article.description = newArticle.description || article.description;
	article.body = newArticle.body || article.body;
	article.updateAt = Date.now();

	await article.save();
	await article.populate('author').execPopulate();
	res.status(200).json(article);
}