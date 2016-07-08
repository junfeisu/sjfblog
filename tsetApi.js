var xhr=new XMLHttpRequest() || new ActiveXObject('Microsoft.XMLHTTP');

xhr.onreadystatechange=function(){
	console.log(JSON.parse(xhr.responseText))
}

xhr.open('POST','/api/delblog');
xhr.send(JSON.stringify({
	title: 'test'
}));