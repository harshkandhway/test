const mongoose = require('mongoose')

const SingleCartItemSchema = mongoose.Schema({
    productName: {type: String, required: true},
    imageUrl: {type: String, required: true},
    price: {type: String, required: true},
    // amount: {type: String, required: true},
    productId: {type: mongoose.Schema.ObjectId,ref:'Product', required: true},
})

const OrderSchema = mongoose.Schema({
    // tax: {
    //     type: Number,
    //     required: true,
    //     default: 50
    // },
    // shippingFee:{
    //     type: Number,
    //     required: true,
    //     default: 50
    // },
    // subtotal:{
    //     type: Number,
    //     required: true,
    //     default: 5000
    // },
    // total:{
    //     type: Number,
    //     required: true,
    //     default: 5000
    // },
    cartItems:[SingleCartItemSchema],
    status:{
        type:String,
        enum:['pending','failed','paid','delivered','cancelled'],
        default: 'pending'
    },
    userId:{
        type:mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    // clientSecret:{
    //     type:String,
    //     required: true
    // },
},
{timestamps: true}
);

module.exports =  mongoose.model('Order',OrderSchema), OrderSchema