const { validationResult, buildCheckFunction } = require('express-validator');
const isValidObjectId = require('mongoose').isValidObjectId;

// 抽取验证中间件,mongoose官网。
exports = module.exports = validations => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(400).json({ errors: errors.array() });
  };
};


exports.isValidObjectId = (location,field) => {
  return buildCheckFunction(location)(field).custom(async value => {
    console.log('value',value);
    if(!isValidObjectId(value)){
      return Promise.reject('ID 不是一个有效的ObjectID');
    }
  })
}