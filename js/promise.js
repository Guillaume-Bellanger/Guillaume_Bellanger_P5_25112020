function promiseXhr( url, verb = 'GET', body = null ) { 
    return new Promise((resolve, reject) => {
        const recoverHttp = new XMLHttpRequest(); 
        recoverHttp.open(verb, url );
        if (body) {
            recoverHttp.setRequestHeader("Content-Type","application/json");
            recoverHttp.send(JSON.stringify(body));
            console.log(typeof(body));
        }else{
            recoverHttp.send();
        }
       
        recoverHttp.onreadystatechange = function() {
            if(this.readyState === XMLHttpRequest.DONE) {
                if(this.status === 200 || this.status === 201) {
                    console.log(JSON.parse(this.responseText));
                    resolve(JSON.parse(this.responseText));
                    
                }else {
                    reject(XMLHttpRequest);
                }
            }
        }
    })
}