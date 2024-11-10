// Require Mongoose
const mongoose = require("mongoose");

// Define a schema
const Schema = mongoose.Schema;

//============================== Books Schema========================================
const productsSchema = new Schema({
    title: { type: String, required: true },                    
    seller: { type: String, required: true },
    description: { type: String, required: true },  
    price: { type: Number, required: true },
    condition: { type: String, required: true },
    location: { type: String, required: true },
    contact: { type: String, required: true },
    imageURL: { type: String, required: true, default: "https://picsum.photos/300"}
});

// Compile model from schema
const productsModel = mongoose.model("products", productsSchema);
module.exports = productsModel;