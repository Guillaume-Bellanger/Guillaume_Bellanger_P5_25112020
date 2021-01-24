//JS de tout ce qui est en rapport avec la page index ( la page d'acceuil)
//déclaration variables products en tant que tableau "vide" dans un premier temps
let products =[]; 
// on commence par récuperer la liste des produits depuis le serveur grâce a une API fetch GET





document.addEventListener("DOMContentLoaded", () => {  //on écoute un evenement pour savoir si la page est bien chargé ou non 
    //Fonction pour récupérer la liste des produits depuis le serveur grâce à une API fetch GET 
    getProducts(); //on appelle la fonction getProducts
    
});
//
function showProducts(products) { // la fonction showProducts à comme arguments products
    //Capture l'élément du DOM "products" qui va afficher toutes les informations
    const productSection = document.getElementById("products");
    // productSection.innerHTML = ""; //sup

    //Boucle qui opère pour chaque produit contenu dans le tableau "product"
    products.forEach(product => {

        // Génère la "case" pour chaque produit
        const card  = document.createElement("div");
        card.className = "card"; 

        // Génère une div pour les éléments, photo et détails nommé carElements
        const cardElements = document.createElement("div");
        cardElements.className = "card-element";
        card.appendChild(cardElements);

        // Génère l'image au produit
        const img = document.createElement("img");
        img.alt = product.name; //va chercher dans le tableau product le name et l"inserer dans le alt de img
        img.src = product.imageUrl; 
        img.className = "card-img-top";
        cardElements.appendChild(img);

        // Génère une div pour les détails
        const details = document.createElement("div");
        details.className = "card-body";
        cardElements.appendChild(details);

        // Génère le titre du produit
        const name = document.createElement("h3");
        name.className = "card-title";
        name.textContent = product.name; //va chercher dans le tableau product le name et va la rajouter en html comme texte
        details.appendChild(name);

        // Génère la description du produit
        const description = document.createElement("p");
        description.className = "card-text";
        description.textContent = product.description; //va chercher la description dans le tableau product pour la rajouter en html en text
        details.appendChild(description); 

         // Génère le prix du produit
        const price = document.createElement("p");
        price.className = "card-price";
        //permet de formater un nombre et de le transformer en euro en le divisant / 100 en allant le chercher dans le tableau product
        const cost = new Intl.NumberFormat("fr-FR", {style: "currency", currency: "EUR"}).format(product.price / 100); 
        price.textContent = cost; // on rajoute au text le prix récupere dans la ligne du dessus
        details.appendChild(price); 

        //Génère une div pour le bouton
        const cardBtns = document.createElement("div");
        cardBtns.className = "card-btns";
        card.appendChild(cardBtns);

        // Génère le bouton pour afficher détails du produit
        const btnDetails = document.createElement("a");
        btnDetails.className = "btn btn-light card__btnDetails btn__details";
        btnDetails.setAttribute("role", "button"); //permet de rajouter un attibut button 
        btnDetails.innerHTML = '<i class="fas fa-info-circle"></i> En savoir plus'; // permet de rajouter une  icone et du text au button

        //Envoie l'info du id du produit sélectionné à la page produit.html via les paramètres de l'url
        btnDetails.setAttribute("href", "produit.html?id=" + product._id); //permet de rajouter en href "produit.html?id="son id"
        cardBtns.appendChild(btnDetails); 
        productSection.appendChild(card);
    });
}



