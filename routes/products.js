var express = require('express');
var router = express.Router();
const products = require('../module/products');

/* GET home page. */
router.get('/', function(req, res, next) {
  products.find({})
    .then( productList =>{
      //const imageUrls = productList.map(product => product.imageURL); 
      res.render('products',
      {
        productList
      });
    })
    .catch( err =>{
      console.log(err);
      res.status(500).send("Error retrieving products");
    });
});

module.exports = router;
