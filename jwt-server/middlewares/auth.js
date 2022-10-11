const jwt = require("jsonwebtoken");
const { secretKey } = require("../config/config");
var auth = require("basic-auth");

class Auth {
  constructor(level) {
    Auth.USER = 2;
    Auth.ADMIN = 8;
    this.level = level;
  }
  get middleware() {
    return async (ctx, next) => {
      var token = auth(ctx.request);
      let errMsg = "token不合法";
      if (!token || token.name === "null") {
        ctx.body = {
          errCode: 10005,
          msg: errMsg,
          request: `${ctx.body} ${ctx.path}`,
          status: false,
        };

        return;
      }

      try {
        var decoded = jwt.verify(token.name, secretKey);
      } catch (e) {
        if (e.name === "tokenExpiredError") {
          errMsg = "token已过期";
        }
        ctx.body = {
          errCode: 10005,
          msg: errMsg,
          request: `${ctx.body} ${ctx.path}`,
        };

        return;
      }
      if (decoded.scope < this.level) {
        errMsg = "没有权限";
        ctx.body = {
          errCode: 10005,
          msg: errMsg,
          request: `${ctx.body} ${ctx.path}`,
        };
        return;
      }
      await next();
    };
  }
  static verifyToken(token) {
    try {
      jwt.verify(token, secretKey);
      return true;
    } catch (error) {
      return false;
    }
  }
}

module.exports = Auth;
