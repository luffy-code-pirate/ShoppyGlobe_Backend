// db.js - MongoDB connection setup
// This file connects our app to MongoDB Atlas using Mongoose
// We call this function once in server.js when the app starts

import mongoose from 'mongoose'

// connectDB - async function that connects to MongoDB
// We use the MONGO_URI from the .env file
const connectDB = async () => {
  try {

    // mongoose.connect takes the connection string from .env
    // and returns a connection object
    const conn = await mongoose.connect(process.env.MONGO_URI)

    // If connection is successful log the host name
    console.log(`MongoDB Connected: ${conn.connection.host}`)

  } catch (error) {

    // If connection fails log the error and exit the process
    // process.exit(1) means exit with failure
    console.error(`MongoDB Connection Error: ${error.message}`)
    process.exit(1)

  }
}

export default connectDB