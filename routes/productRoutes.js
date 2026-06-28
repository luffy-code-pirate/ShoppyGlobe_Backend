// productRoutes.js - Routes for fetching products from MongoDB
// GET /products      - fetch all products
// GET /products/:id  - fetch a single product by its id
// These routes are public — no authentication required

import express from 'express'
import Product from '../models/Product.js'

const router = express.Router()

// ── GET /products ─────────────────────────────────────────
// Fetches all products from the MongoDB products collection
// Returns an array of all product documents
router.get('/', async (req, res) => {
  try {

    // Find all products in the database
    // If no products exist it returns an empty array
    const products = await Product.find()

    res.status(200).json({
      success:  true,
      count:    products.length,
      products,
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while fetching products',
      error:   error.message,
    })
  }
})

// ── GET /products/:id ─────────────────────────────────────
// Fetches a single product by its MongoDB id
// :id is a dynamic parameter from the URL
// For example GET /products/64abc123 will fetch product with that id
router.get('/:id', async (req, res) => {
  try {

    // req.params.id is the id from the URL
    const product = await Product.findById(req.params.id)

    // If no product found with this id return 404
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      })
    }

    res.status(200).json({
      success: true,
      product,
    })

  } catch (error) {

    // If the id format is invalid mongoose throws a CastError
    // We handle this separately to give a better error message
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid product id format',
      })
    }

    res.status(500).json({
      success: false,
      message: 'Server error while fetching product',
      error:   error.message,
    })
  }
})

export default router