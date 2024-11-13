var express = require('express');
var router = express.Router();
const products = require('../module/products');

// display the create page
router.get('/', function(req, res, next) {
    res.render('product-create');
});

// user create product
router.post('/', function(req, res, next){
    const { title, seller, imageURL, description, price, condition, location, contact } = req.body;
    // create a new product in Database
    products.create({
        title,
        seller,
        imageURL,
        description,
        price,
        condition,
        location,
        contact
    })
    // after user submit the new product information successfully
    .then(() =>{
        res.render('create-success');
    })
    // error to submit
    .catch(err => {
        console.error("Error creating product:", err);
        res.status(500).send("Failed to create product.");
    });
});

module.exports = router;