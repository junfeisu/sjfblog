var xhr=new XMLHttpRequest() || new ActiveXObject('Microsoft.XMLHTTP');

xhr.onreadystatechange=function(){
	console.log('32342');
	// if(this.state=='4' && this.status== '200'){
	// 	console.log(xhr.responseText)
	// }
	console.log(JSON.parse(xhr.responseText))
}

xhr.open('POST','/api/login');
xhr.send(JSON.stringify({
	username: 'sujunfei',
	password: '123456'
}));