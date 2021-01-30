/*Ensemble des fonctions et événements relatifs à la page confirmation.html, qui affiche le message de confirmation de commande personnalité avec prénom du user, numéro de commande et prix total */


//Capture des éléments du DOM
let confirmedPrice = document.getElementById("sent-price");
let confirmedRef = document.getElementById("sent-ref");
let confirmedName = document.getElementById("sent-name");


// Lance la récupération et l'affichage du prix et de la référence de commande 
document.addEventListener("DOMContentLoaded", () => {
    

    //Récupération de la référence dans le localStorage
    confirmedRef.innerHTML = "Référence de commande : <br/>" + localStorage.getItem("orderId"); // on récup dans le local storage la clé "orderId" et on l'affiche dans le html 

    //Récupération du prénom du user dans le localStorage
    confirmedName.textContent = localStorage.getItem("orderName"); // on récup dans le local storage la clé "orderName" et on l'affiche dans le html

    //recupere le prix total et l'affiche
    confirmedPrice.innerHTML = "prix total de votre commande : <br/>" + new Intl.NumberFormat("fr-fR", {style: "currency", currency: "EUR"}).format(localStorage.getItem("orderPrice")/100);
    
    
});


