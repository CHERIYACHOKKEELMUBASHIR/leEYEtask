import mongoose from "mongoose";

const model = mongoose.model;
const schema = mongoose.Schema;

const productSchema = new schema({
    productname:String,
    description: {
        type: String
    },
    mrp: Number,
    imgToUrl:Array,
    productprice:Number,
    discount:Number,
    totalprice:Number
    
});

export default model('Product', productSchema);