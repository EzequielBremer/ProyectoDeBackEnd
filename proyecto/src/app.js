const ProductManager = require("../ProdManager.js");
let prodManager = new ProductManager();
console.log(prodManager);

let verProd = async () => {
    let productos = await prodManager.consultarProd();
    console.log(`Productos encontrados: ${productos.length}`);
    console.log(productos);
}
const express = require('express');

const app = express() ; 

const prod = require("../files/Products.json");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));  
 
app.get("/productos", (request, response) => {
    response.end(JSON.stringify(prod));
});

app.get("/productos/:code", (request, response) => {
    const prod = prod.find(prod => prod.code === request.params.code);
    if(prod){
        response.send(prod); 
    }
    response.send({message: "code no encontrado!"})
});

const server_port = 8080;

app.listen(server_port, () => {
    console.log(`Servidor mostrando en el puerto ${server_port}`)
});