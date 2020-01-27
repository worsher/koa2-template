const Koa = require("koa");
const app = new Koa();
const json = require('koa-json')
const userAgent = require("koa2-useragent").default
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const favicon = require('koa-favicon');
const www = require("./bin/www")
const log = require("./bin/koa2-log")
const api = require("./router/api")
const path = require("path")
const fs = require("fs");
const static = require('koa-static');
const doT = require("koa2-dot");

//log
log.start(app);

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
	enableTypes: ['json', 'form', 'text']
}))
app.use(json())

app.use(userAgent());

if (app.env != "development") {
	app.use(static(__dirname + '/public', {
		maxAge: 10 * 60 * 1000
	}))
} else {
	app.use(static(__dirname + '/public'))
}

//favicon
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


app.use(doT.views({
	root: __dirname + '/views',
	extension: 'html',
	cacheable: false
}));

//给模板默认传入当前进程信息
app.use(async (ctx, next) => {
	const render = ctx.render;
	ctx.render = function(file, model = {} , app) {
		app = app || ctx.app;
		return render.apply(ctx, [file, model, app]);
	};
	await next();
})

//routes
app.use(api.routes(), api.allowedMethods())

//404出默认页面
app.use(async (ctx, next) => {
	if (ctx.status == 404) {
		//await ctx.render("test");
	}
	next();
})

//header头（必须最后加，否则对response有影响）
app.use(function(ctx, next) {
	ctx.set('Access-Control-Allow-Origin', '*');
	//非测试环境加缓存
	if (app.env != "development") {
		var expires = new Date();
		expires.setTime(expires.getTime() + 600 * 1000);
		ctx.set("Expires", expires.toUTCString());
		ctx.set("Cache-Control", "max-age=" + 600)
	}
	next();
})

//启动http
www(app);