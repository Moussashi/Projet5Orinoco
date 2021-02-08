class Controller {
    async showListProduct() {
        let listProduct = await Model.get('http://localhost:3000/api/cameras');
        console.log(listProduct);
        let view = new View();
        view.showListProduct(listProduct);
    }

    async showDetailProduct() {
        let searchParams = new URLSearchParams(window.location.search);
        let id = searchParams.get('id');
        console.log(id)
        let url = 'http://localhost:3000/api/cameras/' + id;
        console.log(url)
        let detailProduct = await Model.get(url)
        console.log(detailProduct);
        let view = new View();
        view.showDetailProduct(detailProduct);
    }

    async showPanier() {
        let productBought = await Model.get('http://localhost:3000/api/cameras');
        let view = new View();
        view.buyProduct(productBought);
    }

    async postOrder() {
        let postOrder = await Model.post('http://localhost:3000/api/cameras/order');
        let view = new View();
        view.cameraOrder(postOrder);
        localStorage.clear();
    }
}