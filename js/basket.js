 
//variable prix affiché
      let basketTotalPrice = 0;
//
      let basket = JSON.parse(localStorage.getItem("basket"));
      if (basket === null) basket = [];
      const basketContainer = document.getElementById("basket-container");
      const basketAmount = document.getElementById('basket-amount');
     
//Lance la mise à jour avec le localStorage et l'affichage du panier, ainsi que le calcul du prix total
document.addEventListener("DOMContentLoaded", () => {
    
  
                if (basket.length > 0){
                  updateBasketTotalPrice();
                  showBasket();                
                }else{
                  basketContainer.innerHTML = '<h2 id="empty-Basket">Votre panier est vide.</h2>';
                }
    
     
});



function showBasket () {
    let items = JSON.parse(localStorage.getItem("basket"));    
    basketContainer.innerHTML = "" ;
    if (basket.length > 0 ) {

        //Boucle qui affiche les informations chacun des éléments du tableau basket
        basket.forEach(item => {

            //Génère la "case" pour chaque produit du panier
            let basketItem = document.createElement("div");
            basketItem.className = "basketItem";
            basketContainer.appendChild(basketItem);

            //Génère l'image pour chaque case
            let basketImg = document.createElement("img");
            basketImg.className = "basketItem__img";
            basketImg.alt = item.name;
            basketImg.src = item.imageUrl;
            basketItem.appendChild(basketImg);

            //Génère une div pour le nom du produit et le choix du vernis
            let basketDetails = document.createElement("div");
            basketDetails.className = "basketItem__details";
            basketItem.appendChild(basketDetails);

            //Génère le titre de produit pour chaque case
            let basketTitle = document.createElement("h3");
            basketTitle.textContent = item.name;
            basketTitle.className = "basketItem__title";
            basketDetails.appendChild(basketTitle);

            //Génère le vernis choisi
            let basketVarnish = document.createElement("h4");
                basketVarnish.className = "basketItem__varnish";
                basketDetails.appendChild(basketVarnish);
            if (item.varnish !== null) {
                basketVarnish.textContent = "Finition " + item.varnish;
            } else {
                //Dans le cas où l'utilisateur ne coche aucune option de personnalisation
                basketVarnish.textContent = "Finition Standard";
                item.varnish = "Standard";
            }
            //Génère la quantité de produits achetés pour chaque case
            let basketQty = document.createElement("span");
            basketQty.textContent = item.quantity;
            basketQty.className = "basketItem__qty";
            basketItem.appendChild(basketQty);
            

            //Génère le prix total pour chaque case
            let basketPrice = document.createElement("p");
            basketPrice.className = "basketItem__price";
            


            //Formatage du prix en devise et division pour le transformer en euros 
            let totalPrice = new Intl.NumberFormat("fr-fR", {style: "currency", currency: "EUR"}).format(item.price/100 * item.quantity);
            basketPrice.textContent = totalPrice;
            basketItem.appendChild(basketPrice);
            
            console.log(basketTotalPrice);
            //prix affiché pour le panier Total
            
            basketAmount.textContent = new Intl.NumberFormat("fr-fR", {style: "currency", currency: "EUR"}).format(basketTotalPrice/100);
            
            
                

            // Génère le bouton supprimer
            let basketButton = document.createElement("button");
            basketButton.className = "btn btn-light basketItem__button btn__remove";
            basketButton.setAttribute("role", "button");
            basketButton.innerHTML = 'Supprimer';

            // Stocke via le bouton l'id du produit et l'option vernis choisie
            basketButton.setAttribute("data-id", item._id);
            
            // Au clic du bouton, lance la fonction de suppression de l'article
            basketButton.addEventListener("click", suppressItem); 
            basketItem.appendChild(basketButton);             
            
        });
    } else {
      console.log("panier vide");
        //Affiche un message si le panier est vide
        basketContainer.innerHTML = '<h2 id="empty-Basket">Votre panier est vide.</h2>';
        basketAmount.textContent = "0 €";

    } 
}

function suppressItem(event) {
                
                //recuperer l'id de l'objet a supp
                let objetId = event.target.getAttribute("data-id");

                
                let isObjet = basket.map(function(objet) { return (objet._id == objetId)}); // map = on parcour
                
                let indexObjet = isObjet.indexOf(true);            
               
              
                //sup l'objet dans le tableau
                basket.splice(indexObjet, 1);
               

                //mettre a jour le localstorage
                
                 localStorage.setItem('basket', JSON.stringify(basket));
                 
                //actualiser
               
                  updateBasketTotalPrice();
                  showBasket();     
             
}

function updateBasketTotalPrice() {
              
              
               let isPrice = basket.map(function(objet) { return (objet.price * objet.quantity )});
               console.log(isPrice);
              //addit de toutes les valeurs 
              basketTotalPrice = 0 ; //remise a 0
              for (let i of isPrice) {

                 basketTotalPrice += i ; 

             }          
                                 
            }


/*FORMULAIRE */


//Capture des éléments nécessaires du DOM
let buttonConfirm = document.getElementById("confirm");
let buttonClose = document.getElementById("close-form");
let formSection = document.getElementById("form-container");
let formElt = document.getElementById("formtosubmit");
let formPreventElt = document.getElementById("prevent-msg");
let name = document.getElementById("lastName");
let firstname = document.getElementById("firstName");
let email = document.getElementById("email");
let address = document.getElementById("address");
let city = document.getElementById("city");


/*Animation pour faire apparaître le formulaire quand on clique sur "termminer la commande"*/

if (basket.length === 0){
  
  buttonConfirm.addEventListener("click", () => {
    console.log("panier vide");
    formSection.style.display ="none";
  });
  
}else{
  buttonConfirm.addEventListener("click", () => {
    formSection.classList.toggle("active");
  });
  
}


// Animation pour fermer le formulaire 
buttonClose.addEventListener('click', () => {
    formSection.classList.remove('active')
})
            

/*Validation des données du formulaire en utilisant l'API de contraintes HTML 5*/

name.addEventListener("keyup", function (event) {
  if(name.validity.patternMismatch) {
    name.setCustomValidity("Ceci ne ressemble pas à un nom de famille...");
  } else {
    name.setCustomValidity("");
  }
});
firstname.addEventListener("keyup", function (event) {
  if(firstname.validity.patternMismatch) {
    firstname.setCustomValidity("Ceci ne ressemble pas à un prénom...");
  } else {
    firstname.setCustomValidity("");
  }
});
email.addEventListener("keyup", function (event) {
  if(email.validity.typeMismatch) {
    email.setCustomValidity("Merci d'entrer une adresse email valide utilisant le symbole @");
  } else {
    email.setCustomValidity("");
  }
});
address.addEventListener("keyup", function (event) {
  if(address.validity.patternMismatch) {
    address.setCustomValidity("Merci d'entrer un numéro et le nom de la rue ou avenue");
  } else {
    address.setCustomValidity("");
  }
});
city.addEventListener("keyup", function (event) {
  if(city.validity.patternMismatch) {
    city.setCustomValidity("Ceci ne ressemble pas à un nom de ville...");
  } else {
    city.setCustomValidity("");
  }
});

//Fonction pour envoyer les données du formulaire ainsi que la liste des id des produits commandés via une API fetch POST

function sendFormData(data) {   
 fetch("http://localhost:3000/api/furniture/order", {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify(order)
        })
        .then(response => response.json())
        .then(response => {
            console.log(response);
            finishBasket(response); 
            
           
      
        })
        .catch(error => alert("Erreur : " + error));
}

/* Envoi des données du formulaire avec une fetch POST */

formElt.addEventListener("submit", function(e) { 
    // Pour empêcher le formulaire d'envoyer les données par défaut sans validation préalable
    e.preventDefault();

    //Récupération des valeurs entrées par l'utilisateur
    let contact = { 
        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        city: city.value,
        email: email.value
    };

    //Récupération des données du panier - id des produits commandés - sous forme de tableau de strings
    let products = basket.map(item => item._id);
    
    
    order = {contact, products};

    //S'il n'y a aucun article dans le panier, message apparaît
    if (products.length == 0) {

       
    } else {

    //Fonction pour envoyer les données du formulaire ainsi que la liste des id des produits commandés via une API fetch POST 
    sendFormData(order);
    }
}); 

//Fonction pour stocker l'order_id et le firstname du user dans le local storage

async function finishBasket(data) {
    await localStorage.setItem("orderId", data.orderId); // on stock une paire clé "orderId" et valeur data.orderId dans le local storage
    await localStorage.setItem("orderName", data.contact.firstName); // on stock une paire clé "orderName" et sa valeur data.contact.firstName
    await localStorage.setItem("orderPrice", basketTotalPrice);
    
    localStorage.setItem("basket","[]" ); //pour "sup" le panier apres validation en chang la valeur de la clé "basket " en tableau vide 
    // Renvoie vers la page de confirmation de commande
    window.location.href = "confirmation.html";
}
