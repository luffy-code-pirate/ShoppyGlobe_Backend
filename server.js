// server.js - The main entry point of the application
// This file creates the Express server, connects to MongoDB
// and registers all the routes

import express  from 'express'
import dotenv   from 'dotenv'
import connectDB from './config/db.js'

// Import all route files
import authRoutes    from './routes/authRoutes.js'
import productRoutes from './routes/productRoutes.js'
import cartRoutes    from './routes/cartRoutes.js'

// Load environment variables from .env file
// This must be called before using any process.env variables
dotenv.config()

// Connect to MongoDB Atlas
// This calls our connectDB function from config/db.js
connectDB()

// Create the Express application
const app = express()

// ── Middleware ─────────────────────────────────────────────

// express.json() parses incoming requests with JSON bodies
// Without this req.body will be undefined
app.use(express.json())

// ── Routes ────────────────────────────────────────────────

// Auth routes — POST /register and POST /login
app.use('/api', authRoutes)

// Product routes — GET /products and GET /products/:id
app.use('/api/products', productRoutes)

// Cart routes — POST PUT DELETE /cart
// These are protected by auth middleware inside cartRoutes.js
app.use('/api/cart', cartRoutes)

// ── Default route ─────────────────────────────────────────
// This runs when someone visits the root URL
// Useful to check if the server is running
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'ShoppyGlobe API is running',
  })
})

// ── 404 handler ───────────────────────────────────────────
// This runs when no route matches the request
// Must be placed after all other routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  })
})

// ── Global error handler ──────────────────────────────────
// This catches any errors thrown in route handlers
// Must have 4 parameters — err, req, res, next
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    success: false,
    message: 'Something went wrong',
    error:   err.message,
  })
})

// ── Start the server ──────────────────────────────────────
// Use PORT from .env or default to 3000
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})