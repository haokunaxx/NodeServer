const { Router } = require('express');
const auth = require('../../middleware/auth');
const validators = require('../../validator/article');
const handlers = require('../../controller/article');
const router = Router();

router.get('/:id', validators.getArticle, handlers.getArticle);

router.post('/', auth, validators.createArticle, handlers.createArticle);

/**
 * @intro 删除文章
 * @description 用户鉴权 => id格式判断 => 比较用户id和文章的作者的id是否一致 => 执行对应操作
 * */
router.delete('/:id', auth, validators.deleteArticle, handlers.deleteArticle);

/**
 * @intro 更新文章
 * @description 用户鉴权 => id格式判断 => 比较用户id和文章的作者的id是否一致 => 执行对应操作
 * */
router.put('/:id', auth, validators.updateArticle, handlers.updateArticle);

module.exports = router;