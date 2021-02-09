class View {


/*******************************PAGE D'ACCEUIL ********************************/


    showListProduct(listProduct) {
        console.log(listProduct)

        let container = document.getElementById('container')
        for (let i = 0; i < listProduct.length; i++) {
            let ficheProduit = document.createElement('div');

            ficheProduit.setAttribute('class', 'product')
            ficheProduit.innerHTML = 
            `
                <a href="ficheProduit.html?id=${listProduct[i]._id}"><img src="${listProduct[i].imageUrl}" alt="" class="img"></a>
                <p class="name">${listProduct[i].name}</p>
                <p class="description">${listProduct[i].description}</p>
                <p class="prix">${listProduct[i].price} €</p>
                <label for="lenses">Choose a lense:</label>
                <select name="lenses" id="selectLenses_${i}"></select>
            `;
            
            container.appendChild(ficheProduit);

            let select = document.getElementById('selectLenses_' + i);
            for ( let j = 0; j < listProduct[i].lenses.length; j++) {
                let lenses = listProduct[i].lenses;
                var option = document.createElement("option");
                option.value = `${lenses[j]}`;
                option.innerText = `${lenses[j]}`
                console.log(option)
                select.appendChild(option);
            }

        }
    }

    /***********************PAGE ARTICLE INDIVIDUEL **************************/

    showDetailProduct(detailProduct) {
        console.log(detailProduct);
        let ficheProduit = document.createElement('div');
        ficheProduit.setAttribute('class', 'productSolo')
        ficheProduit.innerHTML = 
            `
                <a href="ficheProduit.html?id=${detailProduct._id}"><img src="${detailProduct.imageUrl}" alt="" class="imgSolo"></a>
                <p class="nameSolo">${detailProduct.name}</p>
                <p class="descriptionSolo">${detailProduct.description}</p>
                <p class="prixSolo">${detailProduct.price} €</p>
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
                console.log(option)
                select.appendChild(option);
            }

        var pressedButton = document.getElementsByTagName("button")[0];
        pressedButton.addEventListener("click", function (event) {
            alert("Merci pour votre achat !");
            let panier = JSON.parse(localStorage.getItem('panier')) ;
            console.log(panier)
            if (panier == null) {
                panier = [];
            }
            panier.push(detailProduct);
            localStorage.setItem('panier', JSON.stringify(panier))
        })
        
    }

    /*******************************PAGE PANIER ********************************/

    buyProduct(productBought) {
        let lePanier = JSON.parse(localStorage.getItem('panier'));
        console.log(lePanier);
        let total = 0;
        for (let i = 0; i < lePanier.length; i++) {
            total += Number(lePanier[i].price);
            let panier = document.createElement('div');
            panier.setAttribute('class', 'achat');
            panier.innerHTML =
                `
                    <img src="${lePanier[i].imageUrl}" alt="" class="imgPanier">
                    <p class="namePanier">${lePanier[i].name}</p>
                    <p class="pricePanier">${lePanier[i].price} €</p>
                `;
            container.appendChild(panier);
        }
        let ligneTotal = document.createElement('div');
        ligneTotal.setAttribute('class', 'achat');
        ligneTotal.innerHTML = 
        `
            <p id="total">Total panier : ${total} €</p>
        `;
        container.appendChild(ligneTotal);
        localStorage.setItem('total', JSON.stringify(total));

        let form = document.getElementById('formulaire');
        form.onsubmit = function submit(event) {
            event.preventDefault();
            let formInput = Array.from(document.querySelectorAll('#formulaire input')).reduce((acc, input) => ({...acc, [input.id]: input.value}), {});
            localStorage.setItem('userInfo', JSON.stringify(formInput));
            window.location = "/front/commande.html"
        }
        
    }


    /***************************PAGE DE CONFIRMATION ***************************/

    cameraOrder(postOrder) {
        let total = JSON.parse(localStorage.getItem('total'));
        let command = document.getElementById('command');
        let orderPage = document.createElement('div');
        console.log(total);
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