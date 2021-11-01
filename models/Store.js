const mongoose = require('mongoose')
const Product = require('./Product')
// const ProductSchema = new mongoose.Schema({
//         productBrand: String, 
//         productName: String,
//         quantity: Number,
//         price: String, 
//         size: String, 
//         imageUrl: String,
//         productDetails:{
//             type:[String]
//         },
//         // _id: {
//         //     type: mongoose.Schema.Types.ObjectId
//         // }
    
// })

// const OrderSchema = require('./order')

const StoreSchema = new mongoose.Schema({
     
    name: {
        type: String,
        required: [true, 'must provide name'],
        trim: true,
        maxlength:[20, 'name must be less than 20 character']
    },
    category:{
        type: String,
        required: [true, 'must provide category'],
        trim: true,
        maxlength:[20, 'name must be less than 20 character']
    },
    address:{
        type: String,
        required: [true, 'must provide address'],
        trim: true,
    },
    products:[Product],
    orders:[],
    imageUrl: String,
    registered: {
        type: Boolean,
        default: false
    },
    userId:{
        type: String,
        default: ''
    },
    storeEmail:{
        type: String,
        default: ''
    },
    storePhone:{
        type: String,
        default:''
    }
})
   


module.exports = mongoose.model('Store', StoreSchema)
// module.exports = mongoose.model('Product', Product)