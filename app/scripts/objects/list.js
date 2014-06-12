'use strict';
function List(op){
	_.defaults(op, {
		items: [],
		id: uuid()
	});
	_.defaults(this, op);
	this.name = this.name.titleize();
	return this;
}
function uuid(){
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
	});
}