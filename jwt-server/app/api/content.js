const Auth = require("../../middlewares/auth");

// const Router = require("koa-router");

// // const router = new Router();
// const contentRouter = new Router({
//   prefix: "content",
// });

// contentRouter.get("/", async (ctx) => {
//   ctx.body = "获取文章内容成功";
// });

// module.exports = contentRouter;

const Router = require("@koa/router");
const router = new Router();

router.get("/content", (ctx) => {
  ctx.body = {
    result: "获取内容成功",
    msg: "操作成功",
    status: true,
  };
});

router.post("/content", new Auth(5).middleware, (ctx) => {
  ctx.body = {
    result: "新增内容成功",
    msg: "操作成功",
    status: true,
  };
});

module.exports = router;
