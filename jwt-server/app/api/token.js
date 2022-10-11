const Router = require("@koa/router");
//用户信息逻辑
const users = require("../../data/users");
//生成token信息
const { generatorToken } = require("../../core/utils");

//验证token信息得类
const Auth = require("../../middlewares/auth");
const router = new Router();
// const tokenRouter = new Router({ prefix: "/token" });

router.post("/token", async (ctx, next) => {
  const { username, password } = ctx.request.body;
  const token = verifyUsernamePassword({ username, password });

  if (!token) {
    ctx.body = {
      errCode: 10001,
      msg: "用户名或密码不正确",
      request: `${ctx.method} ${ctx.path}`,
      status: false,
    };

    return;
  }
  ctx.body = {
    token,
    status: true,
  };
});

//验证token有效性
router.post("/verify", async (ctx) => {
  const token = ctx.request.body.token;
  const isValid = verifyToken(token);
  ctx.body = {
    isValid,
  };
});

function verifyUsernamePassword(user) {
  //在此可以定义后端返回得数据格式
  const index = users.findIndex((item) => {
    return item.username === user.username && item.password == user.password;
  });

  const userInfo = users[index];
  if (!userInfo) {
    return undefined;
  }

  //2：user权限数字
  const token = generatorToken(user.id, Auth.USER);
  return token;
}

//验证token
function verifyToken(token) {
  return Auth.verifyToken(token);
}
module.exports = router;
