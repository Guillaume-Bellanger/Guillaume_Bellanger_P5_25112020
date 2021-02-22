/* Requêtes GET et POST(API fetch)*/


//Fonction pour récupérer la liste des produits depuis le serveur 

function promiseXhr( url, verbe='GET', body=null ) { 
    return new Promise((resolve, reject) => {
        let recoverHttp = new XMLHttpRequest(); 
        recoverHttp.open(verbe, url );
        if (body) {
            recoverHttp.setRequestHeader("Content-Type","application/json");
            recoverHttp.send((body));
        }else{
            recoverHttp.send();
        }
       
        recoverHttp.onreadystatechange = function() {
            if(this.readyState === XMLHttpRequest.DONE) {
                if(this.status === 200) {
                    console.log(JSON.parse(this.responseText));
                    resolve(JSON.parse(this.responseText));
                    
                }else {
                    reject(XMLHttpRequest);
                }
            }
        }
    })
}



function getProducts() {  //fonction nommé getProducts sans arguments
    //Récupération des données via une API fetch 
    promiseXhr("http://localhost:3000/api/furniture")
        
        .then(data => {
            //Affiche la liste des produits une fois que les données sont chargées
            showProducts(data);  
                console.log(data);
        })
        //Affiche l'erreur si requête ne fonctionne pas
        .catch(error => alert("Erreur : " + error));  // changer le message + perso
}


//Fonction pour récupérer un produit précis depuis le serveur - via son id intégré aux paramètres de l'URL 

function getProduct(id) {      
        promiseXhr('http://localhost:3000/api/furniture/' + id, 'GET' )
        .then(data => {
            console.log(data)
            showItem(data); //initialisation de la fonction showItem qu'on retrouve dans la page produit.js 

            //Création d'un objet représentant le produit sélectionné 
            let pdtSelected = {  //objet pdtSelected
                _id : data._id,  //les attributs et leurs valeurs
                name: data.name,
                price: data.price,
                description: data.description,
                imageUrl: data.imageUrl,
                quantity: 1
            }; 

            //Conservation du produit mis à jour dans le localStorage
            let storedPdt = JSON.stringify(pdtSelected); //transforme le doc "pdtSelected" en JSON
            localStorage.setItem("storedPdt", storedPdt);  
         })
        //Affiche l'erreur si requête ne fonctionne pas
        .catch(error => {
            console.log(error);
            document.querySelector(".alert").style.display = "block" ;
            document.querySelector(".product").style.display = "none";   
        });
        
        
}
     

