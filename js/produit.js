
//Capture des éléments du DOM
const pdtCase = document.getElementById("product-case");
const pdtImg = document.getElementById("pdt-img");
const pdtStock = document.getElementById("pdt-stock");
const pdtTitle = document.getElementById("pdt-title");
const pdtDescription = document.getElementById("pdt-description");
const pdtPrice = document.getElementById("pdt-price");
const pdtButtons = document.getElementById("pdt-buttons");
const pdtButton = document.getElementById("pdt-button");
const pdtVarnsihSelect = document.querySelector(".pdtcase__varnish-select");


// Lance la récupération et l'affichage du produit sélectionné quand la page se charge
document.addEventListener("DOMContentLoaded", () => {
    //Fonction pour récupérer le produit sélectionné depuis le serveur, via son id intégré aux paramètres de l'URL, grâce à une API fetch GET - dans fichier fetch.js-
    const id = getIdFromUrl(); 
    console.log(id); //affiche l'id de notre produit séléectionné dans la console log
    if (id) {
        getProduct(id);
    }else{
        console.error("pas d'id dans l'url"); 
        document.querySelector(".alert").style.display = "block" ; //fait apparaitre le message html qui a la classe alert
        document.querySelector(".product").style.display = "none"; //fait disparaitre la div product
        
        
    }
    
    
});

//fonction pour recuperer l'id de l'objet de la page en cour 
function getIdFromUrl() {
        let params = new URLSearchParams(window.location.search); //renvoie le Href(url) de la page actuel
        console.log(params.get("id"));
        return params.get("id"); 
         
}


//Fonction pour afficher le produit sélectionné dans la page produit.html

function showItem(item) {  //item comme argument
    //Actualise l'image du produit
    pdtImg.alt = item.name;
    pdtImg.src = item.imageUrl;

    //Actualise le titre du produit 
    pdtTitle.textContent = item.name;

    //Actualise la description du produit 
    pdtDescription.textContent = item.description;

    //Actualise le prix unitaire du produit
    const totalPrice = new Intl.NumberFormat("fr-FR", {style: "currency", currency: "EUR"}).format(item.price/100);
    pdtPrice.style.fontWeight = "bold";
    pdtPrice.textContent = "Prix unitaire : " + totalPrice;

     //Actualise la liste des options de vernis
    const varnishList = item.varnish;
    const defaultOption = document.createElement("option");
    defaultOption.textContent = "Choisissez vôtre vernis";
    defaultOption.value = "";
    pdtVarnsihSelect.appendChild(defaultOption);

    

     //Boucle pour créer une ligne du menu déroulant pour chaque vernis, différente selon les produits
    for (let i = 0; i < varnishList.length; i++) {
        const varnish = document.createElement("option");
        varnish.textContent = varnishList[i];
        varnish.value = varnishList[i];
        pdtVarnsihSelect.appendChild(varnish);

    }


    pdtButton.addEventListener('click', function(){ //
        addToBasket(item);

    } )
}
//fonction qui permet d'enregistrer dans le local storage la selection d'article
//permet aussi de gerer la QT des articles.
function addToBasket(item) {
    item.quantity = 1; //valeur de base 
    let basket = JSON.parse(localStorage.getItem("basket"));
    console.log(basket);
    if (basket === null) {
        basket = [];
    }
    const found = basket.findIndex( element => element._id === item._id );
    console.log(found);
    if (found === -1 ){ //findIndex commence a -1
        basket.push(item);
    }else{
        basket[found].quantity++;
        
    }
    localStorage.setItem("basket", JSON.stringify(basket));
}  









