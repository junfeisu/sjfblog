// var model = require('./model/schema').models

// model.Blog.find({create_date: {$lt: '2016-7-26'}}, function(err, res) {
// 	err ? console.log('err is ' + err) : console.log('res is ' + res)
// }).sort({_id: 1}).count()

var sortMes =  function(property, objArr) {
	return objArr.sort(function(obj1, obj2) {
		var val1 = obj1[property]
		var val2 = obj2[property]
		return val1 - val2
	})
}

var test = [
	{create_date: '2016-07-29:32:33'},
	{create_date: '2016-07-26'},
	{create_date: '2016-07-30:32:34'}
]

// console.log(JSON.stringify(sortMes('create_date', test)))
console.log(test[0].create_date)
console.log(test.sort(function(obj1,obj2){
	var val1 = obj1['create_date']
	var val2 = obj2['create_date']
	console.log('val1 is ' + val1)
	console.log('val2 is ' + val2)
	if(val1 > val2) {
		console.log('>')
		return 1
	} else if(val1 === val2) {
		console.log('=')
		return 0
	} else {
		console.log('<')
		return -1
	}
}))

// function SortByProps(item1, item2) {
//     "use strict";
//     var props = [];
//     for (var _i = 2; _i < arguments.length; _i++) {
//         props[_i - 2] = arguments[_i];
//     }
        
//     var cps = []; // 存储排序属性比较结果。
//     // 如果未指定排序属性，则按照全属性升序排序。    
//     var asc = true;
//     if (props.length < 1) {
//         for (var p in item1) {
//             if (item1[p] > item2[p]) {
//                 cps.push(1);
//                 break; // 大于时跳出循环。
//             } else if (item1[p] === item2[p]) {
//                 cps.push(0);
//             } else {
//                 cps.push(-1);
//                 break; // 小于时跳出循环。
//             }
//         }
//     } else {
//         for (var i = 0; i < props.length; i++) {
//             var prop = props[i];
//             for (var o in prop) {
//                 asc = prop[o] === "asc";
//                 if (item1[o] > item2[o]) {
//                     cps.push(asc ? 1 : -1);
//                     break; // 大于时跳出循环。
//                 } else if (item1[o] === item2[o]) {
//                     cps.push(0);
//                 } else {
//                     cps.push(asc ? -1 : 1);
//                     break; // 小于时跳出循环。
//                 }
//             }
//         }
//     }        
         
//     for (var j = 0; j < cps.length; j++) {
//         if (cps[j] === 1 || cps[j] === -1) {
//             return cps[j];
//         }
//     }
//     return 0;          
// }
