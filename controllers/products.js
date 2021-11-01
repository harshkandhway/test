const Store = require("../models/Store")
const fs = require('fs');
const path = require('path')

const getAllProducts = async (req, res) => {
    try {
        const { id: storeID } = req.params
        const store = await Store.findOne({ _id: storeID })
        if (!store) {
            return res.status(404).json({ msg: `No store with id: ${storeID}` })
        }
        res.status(200).json(store.products)
    }
    catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

const createProducts = async (req, res) => {
    try {
        const { id: storeID } = req.params
        const store = await Store.findOne({ _id: storeID })
        if (!store) {
            return res.status(404).json({ msg: `No store with id: ${storeID}` })
        }
        let p = store.products;
        p.push(req.body)
        store.products = p
        const storeNew = await Store.findOneAndUpdate({ _id: storeID }, store, {
            new: true,
            runValidators: true,
        })
        const product = storeNew.products[storeNew.products.length-1]
        res.status(201).json( {product})
    }
    catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

const getProduct = async (req, res) => {
    try {
        const {productId} = req.params
        const { id: storeID } = req.params
        console.log(storeID)
        const store = await Store.findOne({ _id: storeID })
        if (!store) {
            return res.status(404).json({ msg: `No store with id: ${storeID}` })
        }
        store.products = store.products.filter(p=>p._id.toString()===productId.toString())
        res.status(200).json( store.products )
    }
    catch (error) {
        res.status(500).json({ msg: error })
    }
}


const updateProduct = async (req, res) => {
    try {
        const { id: storeID } = req.params
        const {productId} = req.params
        const store = await Store.findOne({_id:storeID})
        if (!store) {
            return res.status(404).json({ msg: `No store with id: ${storeID}` })
        }
        for(let i in store.products){
            if(store.products[i]._id.toString()===productId.toString()){
                store.products[i]=req.body;
            }
        }
        const storeNew = await Store.findOneAndUpdate({ _id: storeID }, store, {
            new: true,
            runValidators: true,
        })
        
        res.status(200).json({ storeNew })
    }
    catch (error) {
        res.status(500).json({ msg: error })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const {productId} = req.params
        const { id: storeID } = req.params
        const store = await Store.findOne({_id:storeID})
        if (!store) {
            return res.status(404).json({ msg: `No store with id: ${storeID}` })
        }
        store.products = store.products.filter(p=>p._id.toString()!==productId.toString())
        const storeNew = await Store.findOneAndUpdate({ _id: storeID }, store, {
            new: true,
            runValidators: true,
        })
        res.status(200).json( {storeNew})
    }
    catch (error) {
        res.status(500).json({ msg: error })
    }
}

const uploadImage = async(req,res)=>{
    if(!req.files){
        return res.status(400).json({msg:`No file uploaded`})
    }
    const productImage = req.files.image;
    if(!productImage.mimetype.startsWith('image')){
        return res.status(400).json({msg:`Please upload an image file`})
    }
    if(productImage.size>1024*1024){
        return res.status(400).json({msg:`Please upload an image file less than 1 MB`})
    }
    const {id:storeID} = req.params
    const {productId} = req.params
    const store = await Store.findOne({_id:storeID})
    if(!store){
        return res.status(404).json({msg:`No store with id: ${storeID}`})
    }
    fs.mkdir(path.join(__dirname, '../public/uploads/' + `${store._id}/` + `${productId}`),
    {recursive:true}, (err) => {
        if (err) {
            return res.status(400).json({msg:err})
        }
        console.log('Directory created successfully!');
    });

    const imagePath = path.join(__dirname,`../public/uploads/${store._id}/${productId}/` + `${productImage.name}`);
    await productImage.mv(imagePath);
    res.status(200).json({image: `/uploads/${store._id}/${productId}/${productImage.name}`});
    // console.log(req.files);
    // res.send('upload image')
}

module.exports = {
    getAllProducts, createProducts, getProduct, updateProduct, deleteProduct, uploadImage
}