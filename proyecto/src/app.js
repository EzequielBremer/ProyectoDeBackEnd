const ProductManager = require("../ProdManager.js");
let prodManager = new ProductManager();
console.log(prodManager);

const express = require('express');

const app = express();

const prod = require("../files/Products.json");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/productos", async (request, response) => {
    const prod = await prodManager.getProducts();
    const limit = request.query.limit;

    if(!limit){
        return response.send(JSON.stringify(prod));
    }
    if (limit)response.send(JSON.parse(prod).filter((product,index)=> index < limit)); 
});

app.get("/productos/:id", (request, response) => {
    let idProd = request.params.id;
    let product = prod.find(p => p.id == idProd);
    if (!product) return response.send("El producto no se encontro");

    response.send(product);
});




const server_port = 8080;

app.listen(server_port, () => {
    console.log(`Servidor funcionando en el puerto:${server_port}`)
});