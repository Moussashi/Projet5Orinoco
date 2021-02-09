/**
 * Le but de cette classe est d'encapsuler les méhtodes pour pouvoir faire
 * les appels Ajax. 
 */
class Model {

    /**
     * Cette méthode appelle une url et retourne son contenu après un parseJSON. 
     * @param {string} url 
     */
    static get(url) {
        
        return new Promise(function(resolve, reject) {
            let xhr = new XMLHttpRequest();

            // appel ajax. 
            xhr.onreadystatechange = function() {
                console.log(xhr.readyState);
                if (xhr.readyState === xhr.DONE) {
                    if (xhr.status === 200) { 
                        let content = JSON.parse(xhr.responseText)
                        resolve(content);
                    } else {
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

            xhr.onreadystatechange = function() {
                console.log(xhr.readyState);
                if (xhr.readyState === xhr.DONE) {
                    if (xhr.status === 201) { 
                        let content = JSON.parse(xhr.responseText)
                        console.log(content);
                        resolve(content);
                    } else {
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