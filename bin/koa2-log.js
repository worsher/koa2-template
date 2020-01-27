/**
  koa-log4 分天记录log日志 (本地/mongo待定)
*/
const log4js = require('koa-log4');

// logo 初始化日志配置
//具体字段解释见log4js包里的log4js.d.ts
log4js.configure({
  appenders: {
    online : {
      type: 'dateFile',
      filename: './log/access.log',
      pattern: "-yyyy-MM-dd",
      alwaysIncludePattern: false,
      usefsync: true,
      maxLogSize: 1024,
      daysToKeep : 15,
      backups: 4
    }
  },
  categories: {
    default: { appenders: ['online'], level: 'debug' },
    online : {appenders : ['online'] , level : 'info'}
  }
});

module.exports.start = (app, name) => {
	name = name || 'online'
	const logger = log4js.getLogger(name)
	app.use(log4js.koaLogger(logger, {
		level: 'auto'
	})) // 日志中间件
}

module.exports.get = (name) => {
	return log4js.getLogger(name);
}