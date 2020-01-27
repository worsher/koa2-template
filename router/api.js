const router = require('koa-router')()
const request = require('sync-request')
const base = require("../bin/base");
const url = require("url")
//增加接口前缀
router.prefix('/api')

router.get("/test" , async (ctx , next) => {
	ctx.body = "test";
	next();
})

module.exports = router