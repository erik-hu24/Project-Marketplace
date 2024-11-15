var express = require('express');
var router = express.Router();
const products = require('../module/products');

/* GET home page. */
router.get('/', function(req, res, next) {
  const page = parseInt(req.query.page) || 1;
  const limit = 15;
  
  products.find({})
    .then(allProducts => {
      const totalProducts = allProducts.length;
      const totalPages = Math.ceil(totalProducts / limit);
      const startIndex = (page - 1) * limit;
      const productList = allProducts.slice(startIndex, startIndex + limit);
      
      res.render('products', {
        productList,
        currentPage: page,
        totalPages,
        isAvailableOnly: false
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).send("Error retrieving products");
    });
});

router.get('/available', function(req, res, next) {
  const page = parseInt(req.query.page) || 1;
  const limit = 15;
  
  products.find({status: "Available"})
    .then(allProducts => {
      const totalProducts = allProducts.length;
      const totalPages = Math.ceil(totalProducts / limit);
      const startIndex = (page - 1) * limit;
      const productList = allProducts.slice(startIndex, startIndex + limit);
      
      res.render('products', {
        productList,
        currentPage: page,
        totalPages,
        isAvailableOnly: true
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).send("Error retrieving products");
    });
});

// jump to the specific product details page
router.get('/product/:productID', function(req, res, next){
  products.find({})
    .then( productList =>{
       // find the object of productList that  _id equal to productID 
       const product = productList.find(product => product._id.toString() === req.params.productID);
       if (product) {
         // find the product send to pug
         res.render('product-detail', {
           product
         });
       } else {
         // did not find it, 404 error
         res.status(404).send("Product not found");
       }
    })
    .catch( err => {
      console.log(err);
      res.status(500).send("Error retrieving products");
    });
});

module.exports = router;
