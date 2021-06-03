// const path = require('path');
const { Router } = require('express');

const asyncHandler = require('express-async-handler');
const  Product  = require("../models/product")



const adminRouter = Router();



// GET /admin/products
adminRouter.get('/products', asyncHandler(async (req,res) => {
    const products = await Product.find({})
    console.log("Product list found")
    res.json(products);
}));


//GET /admin/product/:id for a particular product
adminRouter.get('/products/:id',async(req,res) => {
    const product =await Product.findById(req.params.id)
    if(product){
        console.log("Found your product")
        res.json(product)
    } else {
        res.status(404).json({message: "Product not found"})
    }
});

//POST /admin/createProduct
adminRouter.post('/createProduct',asyncHandler(async (req,res) => {
    
    console.log(req.body)
    const product = req.body
    const createProduct = await Product.create(product);
    res.status(201).send(createProduct)

}));


//PUT /admin/product/:id for a particular product update
adminRouter.put('/products/:id', async(req,res) => {
    const id = req.params.id;
    const title = req.body.title;
    const price = req.body.price;
    const product = await Product.findById(id)
    if(product){
        product.title = title;
        product.price = price;
        product.save();
        console.log("Product updated successfully")
        res.status(200).json(product);
    }
});

//DELETE /admin/product/:id for a particular product deletion
adminRouter.delete('/products/:id',async(req,res) => {
    const id = req.params.id;
    const product = await Product.findById(id);
    if(product){
        product.remove(id);
        console.log("Product deleted successfully")
        res.status(200).json({message:'Deleted product'})
    }
});

//DELETE /admin/resetProduct for reseting the machine
adminRouter.delete('/reset',async(req,res) => {
    const product= await Product.deleteMany({});
    if(product)
    {
        console.log("Machine has been reset");
        res.status(200).json({message:'Machine reset'})
    }
    
})


module.exports= adminRouter;