import express from "express";
import { ProductManager } from "../FileManager.js";
import path from "path";

const viewRouter = express.Router();
const productFileManager = new ProductManager(path.resolve(process.cwd(), "src/public", "productos.json"));

viewRouter.get("/products", async (req, res) => {

    try {
        const productos = await productFileManager.getAll();
        let productsArray = [];
        for(let p of productos){
            productsArray.push(p);
        }
        let productosReversed = productsArray.reverse();

        let user = {
            role: "admin",
            name: "Jose",
            last_name: "Munoz"
        }
        res.render('home', {
            user: user, 
            style: 'home.css',
            title: 'Products list', 
            isAdmin: user.role==="admin", 
            productosReversed});
    } catch (err) {
        res.status(500).send(err.message);
    }

});

viewRouter.get("/realtimeproducts", async (req, res) => {

    try {
        const productos = await productFileManager.getAll();
        let productsArray = [];
        for(let p of productos){
            productsArray.push(p);
        }
        let productosReversed = productsArray.reverse();

        let user = {
            role: "admin",
            name: "Jose",
            last_name: "Munoz"
        }
        res.render('realtimeproducts', {
            user: user, 
            style: 'products.css',
            title: 'Realtime Products list', 
            isAdmin: user.role==="admin", 
            productosReversed});
    } catch (err) {
        res.status(500).send(err.message);
    }

});

export default viewRouter;