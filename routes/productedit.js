var express = require('express');
var router = express.Router();
const products = require('../module/products');

router.get('/:productID/verify', (req, res) => {
  res.render('product-verify', { productID: req.params.productID });
});

// password verify
router.post('/:productID/verify', async (req, res, next) => {
  try {
    const productID = req.params.productID;
    const { password } = req.body;

    // find product and verify password
    const product = await products.findById(productID);

    if (product && product.password === password) {
      // password match, jump to edit page
      res.redirect(`/edit/${productID}`);
    } else {
      // Password doesn't match, redirect back to verify page with error query
      res.redirect(`/edit/${productID}/verify?error=1`);
    }
  } catch (error) {
    next(error);
  }
});


// display the edit page
router.get('/:productID', async (req, res, next) => {
  try {
    const productID = req.params.productID;
    const product = await products.findById(productID); // Fetch product by ID

    if (product) {
      // Render edit page with product data
      res.render('product-edit', { product });
    } else {
      // Product not found, send 404 response
      res.status(404).send("Product does not exist");
    }
  } catch (error) {
    next(error); // Pass error to error-handling middleware
  }
});

// Route to handle updating the product
router.post('/:productID', async (req, res, next) => {
  try {
    const productID = req.params.productID;
    // if any delete action
    if (req.body.delete) {
      await products.findByIdAndDelete(productID);
      //back to the homw page, once the post is deleted
      return res.render('delete-success'); 
    }
    const { title, seller, contact, imageURL, description, condition, price, location, status } = req.body;
    const updatedStatus = status === 'Sold' ? 'Unavailable' : 'Available';

    // Update the product in the database with new data
    await products.findByIdAndUpdate(productID, {
      title,
      seller,
      contact,
      imageURL,
      description,
      condition,
      price,
      location,
      status: updatedStatus
    });

    // Redirect back to the product details page after update
    res.redirect(`/product/${productID}`);
  } catch (error) {
    next(error); // Pass any errors to the error-handling middleware
  }
});



module.exports = router;