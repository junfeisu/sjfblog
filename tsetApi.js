var xhr=new XMLHttpRequest() || new ActiveXObject('Microsoft.XMLHTTP');

xhr.onreadystatechange=function(){
	// if(this.state=='4' && this.status== '200'){
	// 	console.log(xhr.responseText)
	// }
	console.log(JSON.parse(xhr.responseText))
}

xhr.open('GET','/api/getuserinfo?username=sujunfei');
xhr.send();