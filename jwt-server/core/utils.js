const jwt = require("jsonwebtoken");
const { secretKey, expiresIn } = require("../config/config");
//生成token令牌
const generatorToken = function (uuid, scope) {
  const token = jwt.sign({ uuid, scope }, secretKey, { expiresIn });

  return token;
};
module.exports = { generatorToken };
