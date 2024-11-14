var express = require('express');
var router = express.Router();
const products = require('../module/products');

// display the edit page
router.get('/', (req, res, next) => {
    res.render('product-edit');
  });

// find the product 
router.post('/', (req, res, next) => {
    
});

module.exports = router;