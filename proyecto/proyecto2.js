const ProductManager = require("./ProdManager.js");
let prodManager = new ProductManager();
console.log(prodManager);
console.log(prodManager.getProducts());
   prodManager.addProd("Blue Lock", "Tomo 11", 1200, "sin img", 1, 20);
   prodManager.addProd("Jujutsu Kaisen", "Tomo 0", 1350, "sin img", 2, 25);
   prodManager.addProd("Darling In The FranxX", "Tomo 4", 1000, "sin img", 3, 40);
   prodManager.addProd("Bunny Girl Senpai", "Tomo 1", 1500, "sin img", 2, 15);
   prodManager.addProd("Wotakoi", "Tomo 7", 1300, "sin img", 5, 35);
console.log(prodManager.getProducts());
/*prodManager.getProductById(3);
prodManager.deleteProduct(2);
prodManager.updateProduct(1, {precio: 4000})*/
console.log(prodManager.getProducts());