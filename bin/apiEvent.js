/**
 * 
 * @authors Wangfeiran (wangfeiran@qiyi.com)
 * @date    2019-02-19 10:19:19
 * @version 1.0.0
 * @desc 利用缓存和事件降低CPU计算，加快返回速度
 */
var util = require("util"),
	events = rquire("events");

function apiEvent(){
	events.EventEmitter.call(this);
}

util.inherits(aipEvent, events.EventEmitter);
this.on("start",function(){
	console.log("event start");
})
apiEvent.start = (key , ctx , next){
	console.log(this._events);
	//this.on("get" + key , )
	next();
}

export default apiEvent
