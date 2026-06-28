// auth.js - JWT authentication middleware
// This function runs before protected route handlers
// It checks if the request has a valid JWT token
// If token is valid it allows the request to continue
// If token is missing or invalid it blocks the request with an error

import jwt from 'jsonwebtoken'

const auth = (req, res, next) => {

  try {

    // Get the token from the request headers
    // The client sends the token in the Authorization header
    // Format is: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    const authHeader = req.headers.authorization

    // If no Authorization header is present, block the request
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.',
      })
    }

    // Extract the token by removing the "Bearer " prefix
    // Split by space and take the second part
    const token = authHeader.split(' ')[1]

    // Verify the token using the JWT_SECRET from .env
    // If token is invalid or expired this will throw an error
    // If token is valid it returns the decoded payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Attach the decoded user data to the request object
    // This makes the user id available in all protected routes
    // We can access it as req.user.id in route handlers
    req.user = decoded

    // Call next() to pass control to the next middleware or route handler
    next()

  } catch (error) {

    // If jwt.verify throws, the token is invalid or expired
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token. Please log in again.',
    })

  }
}

export default auth