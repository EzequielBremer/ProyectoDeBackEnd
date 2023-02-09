const fs = require('fs');
const dirName = "./prod";
const fileName = dirName + "prod.js";


class Products {
    constructor(titulo, descripcion, precio, img, stock) {
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.precio = precio;
        this.img = img;
        this.stock = stock;
        this.code = code
        this.id = id
    }

    static getId = () => {
        if (this.id) {
            this.id++;
        } else {
            this.id = 1;
        }
        return this.id;
    }

};


class ProductManager {

	#productDirPath;
    #productFilePath;
    #fileSystem;

	constructor(){
		this.products = new Array();
		this.#productDirPath = "./proyecto/files";
        this.#productFilePath = this.#productDirPath+"/Products.json";
		this.#fileSystem = require("fs");
	}

    prepareDirProducts = async () => {
        await this.#fileSystem.promises.mkdir(this.#productDirPath, { recursive: true });

        if(!this.#fileSystem.existsSync(this.#productFilePath)) {
            await this.#fileSystem.promises.writeFile(this.#productFilePath, "[]");
        }
    }

	getProducts = async () => {
        await this.prepareDirProducts();
        await this.consultProduct();
		return this.products;
	}

	addProduct = async (title, description, price, thumbnail, stock, code, newId ) => {
		let newProduct = new Products (title, description, price, thumbnail, stock, code, newId );
		console.log(newProduct);

		try{
			await this.prepareDirProducts()
            await this.consultProduct()
            const newId = products.length ? products[ products.length - 1 ].id + 1 : 0

			if(this.products.some(prod => prod.code === newProduct.code)){
				console.error("Este codigo ya se creo")
			}else{
                let newProduct = new Products (title, description, price, thumbnail, stock, code, newId );
                this.products.push(newProduct);
				console.log("Se actualizo la lista de productos: ");
				console.log(this.products)
                await this.#fileSystem.promises.writeFile(this.#productFilePath, JSON.stringify(this.products));
			}	
		}catch(error) {
			console.error(`Error al agregar el producto: ${JSON.stringify(newProduct)}, Error: ${error}`);
			throw Error(`Error al agregar el producto: ${JSON.stringify(newProduct)}, Error: ${error}`);
		}
    }

    consultProduct = async () =>{
        try{
            await this.prepareDirProducts();

            let productFile = await this.#fileSystem.promises.readFile(this.#productFilePath, "utf-8");
            
            console.info("Archivo JSON obtenido desde el archivo: ");
            console.log(productFile);

            this.products = JSON.parse(productFile)
    
            console.log("Productos: ");
            console.log(this.products);
            return this.products;

        } catch (error){
            console.error("Error al consultar productos");
        }

    }

	getProductById = async (id) =>{
        try{
            await this.prepareDirProducts();
            await this.consultProduct();

            let productId = this.products.find((prod) => prod.id === id)
            if(productId){
                console.log("El producto esta disponible")
                console.log(productId)
            }else{
                console.log("El producto no esta disponible")
            }
        }catch (error){
            console.log("Error al consultar el ID")
            throw Error (`Error al consultar el ID, Error:${error}`)
        }
	}

    deleteProduct = async (id) =>{
        try{
            await this.prepareDirProducts();
            await this.consultProduct();

            let deletProd = this.products.find((prod) => prod.id === id)
            if (deletProd){
                const index = this.products.indexOf(deletProd);
                this.products.splice(index, 1);
                console.log("El producto se elimino")
                console.log(this.products)
                await this.#fileSystem.promises.writeFile(this.#productFilePath, JSON.stringify(this.products));
            }
        }catch{
            console.log("Error al eliminar producto")
            throw Error (`Error al eliminar el producto, Error:${error}`)
        }
    }

    updateProduct = async (id, newProd) =>{
        await this.getProducts();
        const updateProd = this.products.map((prod) => {
            if(prod.id === id){
                return {...prod, ...newProd,id};
            }else{
                return prod;
            }
        });
        this.products = updateProd;
        await this.#fileSystem.promises.writeFile(this.#productFilePath, JSON.stringify(this.products));
        console.log(this.products);
    }

    deleteAllJson = async () =>{
        await this.prepareDirProducts();
        await this.consultProduct();
        await this.#fileSystem.promises.unlink(this.#productFilePath);
        console.log("El archivo se borro correctamente");
    }
}

module.exports = ProductManager;