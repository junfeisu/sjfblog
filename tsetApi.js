var xhr=new XMLHttpRequest() || new ActiveXObject('Microsoft.XMLHTTP');

xhr.onreadystatechange=function(){
	// if(this.state=='4' && this.status== '200'){
	// 	console.log(xhr.responseText)
	// }
	console.log(JSON.parse(xhr.responseText))
}

xhr.open('POST','/api/register');
xhr.send(JSON.stringify({
	username: 'songchengcheng',
	password: '123456'
}));