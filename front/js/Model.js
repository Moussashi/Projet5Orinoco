/**
 * Le but de cette classe est d'encapsuler les méhtodes pour pouvoir faire
 * les appels Ajax. 
 */
class Model {

    /**
     * Cette méthode appelle une url et retourne son contenu après un parseJSON. 
     * Pour s'en servir : 
     * let content = await Model.get("url");
     * @param {string} url 
     */
    static get(url) {
        
        return new Promise(function(resolve, reject) {
            let xhr = new XMLHttpRequest();

            // Définition de l'appel ajax. 
            xhr.onreadystatechange = function() {
                // Si on est à l'état "DONE" https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState
                console.log(xhr.readyState);
                if (xhr.readyState === xhr.DONE) {
                    if (xhr.status === 200) { 
                        //console.log("Dans get : success");
                        //console.log(content);
                        let content = JSON.parse(xhr.responseText)
                        //console.log(content);
                        resolve(content);
                    } else {
                        //console.log("Dans get : error");
                        //console.log(xhr.readyState);
                        reject(xhr);
                    } 
                }
            }
    
            xhr.open('GET', url, true);
            xhr.send();
        });
    }

    static post(url) {
        
        return new Promise(function(resolve, reject) {
            let xhr = new XMLHttpRequest();

            // Définition de l'appel ajax. 
            xhr.onreadystatechange = function() {
                // Si on est à l'état "DONE" https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState
                console.log(xhr.readyState);
                if (xhr.readyState === xhr.DONE) {
                    if (xhr.status === 201) { 
                        //console.log("Dans get : success");
                        //console.log(content);
                        let content = JSON.parse(xhr.responseText)
                        console.log(content);
                        resolve(content);
                    } else {
                        //console.log("Dans get : error");
                        //console.log(xhr.readyState);
                        reject(xhr);
                    } 
                }
            }

            let articlesOrdered = JSON.parse(localStorage.getItem('panier'));
            let userInfo = JSON.parse(localStorage.getItem('userInfo'));

            const contact = {
            "firstName": userInfo.fname,
            "lastName": userInfo.lname,
            "address": userInfo.adress,
            "city": userInfo.ville,
            "email": userInfo.mail
            };

            let products = [];
            for (let i = 0; i < articlesOrdered.length; i++) {
            products[i] = articlesOrdered[i]._id;
            }
    
            xhr.open('POST', url, true);
            xhr.setRequestHeader("Content-type", "application/json")
            xhr.send(JSON.stringify({products, contact}));
        });
    }
}