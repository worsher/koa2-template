const request = require('sync-request')
const fs = require("fs")

//封装url get返回值
module.exports.get = function(url) {
	let data = request('GET', url),
		body = "";
	if (data.statusCode == 200) {
		body = data.getBody('utf8')
	} else {
		body = JSON.stringify({
			status: data.statusCode
		})
	}
	return body;
}

module.exports.transfer = function(url , ctx){
	let data = request('GET', url),
		body = "";
	if (data.statusCode == 200) {
		body = data.getBody('utf8')
	} else {
		body = JSON.stringify({
			status: data.statusCode
		})
	}
	this.send(body, ctx);
}

module.exports.send = function(str, ctx) {
	//str = JSON.stringify(str); //强转为字符串
	let callback = ctx.query.callback;
	if (callback) {
		ctx.body = callback + "(" + str + ")";
	} else {
		ctx.body = str;
	}
}

//封装同步读取文件的promise
module.exports.readFilePromise = (name) => {
	return new Promise((resolve, reject) => {
		fs.readFile(name, (err, data) => {
			if (err) {
				resolve(""); //读取错误返回空值，但是仍然表示成功
			} else {
				resolve(data.toString());
			}
		})
	})
}
//异步请求多文件
module.exports.readFiles = (name) => {
	const tasks = [];
	if (Array.isArray(name)) {
		name.forEach(file => {
			tasks.push(this.readFilePromise(file))
		})
		return Promise.all(tasks).then(datas => {
			return datas;
		})
	} else {
		return this.readFilePromise(name).then((datas) => {
			return datas
		});
	}
}