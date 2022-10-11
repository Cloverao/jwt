const Koa = require("koa");
const bodyParser = require("koa-bodyparser");

const tokenRouter = require("./app/api/token");

const contentRouter = require("./app/api/content");
//数据库连接
// let mysql = require("mysql");
// let connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "root",
//   database: "jwt_user",
// });

const app = new Koa();
//获取Body内容需要使用Bodyparser
app
  .use(bodyParser())
  .use(tokenRouter.routes())
  .use(contentRouter.routes())
  .listen(5000);
