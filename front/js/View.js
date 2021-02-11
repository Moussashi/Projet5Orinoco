class View {


/*******************************PAGE D'ACCEUIL ********************************/


    showListProduct(listProduct) {

        let container = document.getElementById('container')
        //Boucle for pour réaliser un container en fonction du nombre de produits

        for (let i = 0; i < listProduct.length; i++) {
            let price = Number(listProduct[i].price) / 100;
            let ficheProduit = document.createElement('div');
            ficheProduit.setAttribute('class', 'product')
            ficheProduit.innerHTML =
            `
                <img src="${listProduct[i].imageUrl}" alt="" class="img">
                <p class="name">${listProduct[i].name}</p>
                <p class="description">${listProduct[i].description}</p>
                <p class="prix">${price} €</p>
                <a href="ficheProduit.html?id=${listProduct[i]._id}"><button class="buttonDetail">Détail du Produit</button></a>
            `;
            
            container.appendChild(ficheProduit);

            //liste d'objectifs photo
            

        }
    }

    /***********************PAGE ARTICLE INDIVIDUEL **************************/

    // On affiche le produit récuperé avec l'Id + l'URL via notre controller
    showDetailProduct(detailProduct) {
        let price = Number(detailProduct.price) / 100;
        let ficheProduit = document.createElement('div');
        ficheProduit.setAttribute('class', 'productSolo')
        ficheProduit.innerHTML = 
            `
                <a href="ficheProduit.html?id=${detailProduct._id}"><img src="${detailProduct.imageUrl}" alt="" class="imgSolo"></a>
                <p class="nameSolo">${detailProduct.name}</p>
                <p class="descriptionSolo">${detailProduct.description}</p>
                <p class="prixSolo">${price} €</p>
                <select name="lenses" id="selectLenses_"></select>
                <button class="achatSolo">Acheter</button>
            `;
        container.appendChild(ficheProduit);
        let select = document.getElementById('selectLenses_');
            for ( let j = 0; j < detailProduct.lenses.length; j++) {
                let lenses = detailProduct.lenses;
                var option = document.createElement("option");
                option.value = `${lenses[j]}`;
                option.innerText = `${lenses[j]}`
                select.appendChild(option);
            }

        /******Quand le boutton "acheter" est préssé, nous stockons les données du produit
        et nous envoyons une alerte au client pour confirmer son achat******************/

        var pressedButton = document.getElementsByTagName("button")[0];
        pressedButton.addEventListener("click", function (event) {
            alert("Merci pour votre achat !");
            let panier = JSON.parse(localStorage.getItem('panier')) ;
            if (panier == null) {
                panier = [];
            }
            panier.push(detailProduct);
            localStorage.setItem('panier', JSON.stringify(panier))
        })
        
    }
 
    /*******************************PAGE PANIER ********************************/

    // Nous recupérons les données des produits achetés pour les afficher dans la page panier
    buyProduct(productBought) {
        
        let lePanier = JSON.parse(localStorage.getItem('panier'));
        let total = 0;
        for (let i = 0; i < lePanier.length; i++) {
            let price = Number(lePanier[i].price) / 100;
            total += price;
            let panier = document.createElement('div');
            panier.setAttribute('class', 'achat');
            panier.innerHTML =
                `
                    <img src="${lePanier[i].imageUrl}" alt="" class="imgPanier">
                    <p class="namePanier">${lePanier[i].name}</p>
                    <p class="pricePanier">${price} €</p>
                `;
            container.appendChild(panier);
        }

        // Ligne pour créer la div corréspondant au total
        let ligneTotal = document.createElement('div');
        ligneTotal.setAttribute('class', 'achat');
        ligneTotal.innerHTML = 
        `
            <p id="total">Total panier : ${total} €</p>
        `;
        container.appendChild(ligneTotal);
        localStorage.setItem('total', JSON.stringify(total));
        
        // Recupération des données du formulaire et on est envoyé à la page de confirmation
        let form = document.getElementById('formulaire');
        form.onsubmit = function submit(event) {
            event.preventDefault();
            let formInput = Array.from(document.querySelectorAll('#formulaire input')).reduce((acc, input) => ({...acc, [input.id]: input.value}), {});
            localStorage.setItem('userInfo', JSON.stringify(formInput));
            window.location = "/front/commande.html"
        }
        
    }


    /***************************PAGE DE CONFIRMATION ***************************/

    // Page finale avec les données que nous prenons du POST ainsi que le total de la commande
    cameraOrder(postOrder) {
        let total = JSON.parse(localStorage.getItem('total'));
        let command = document.getElementById('command');
        let orderPage = document.createElement('div');
        orderPage.setAttribute('class', 'orderPage');
        orderPage.innerHTML = 
        `
        <p class="orderText">Merci de votre commande ${postOrder.contact.firstName} ${postOrder.contact.lastName}</p>
        <p class="orderText"> votre total : ${total} €</p>
        <p class="orderText"> votre commande : ${postOrder.orderId}</p>
        <p class="orderText"> Sera livrée au : ${postOrder.contact.address} ${postOrder.contact.city}</p>
        <p class="orderText"> Vous recevrez une facture sur cet adresse email : ${postOrder.contact.email}</p>
        <p class="orderText"> A bientot</p>
        `;
        command.appendChild(orderPage);
    }
}