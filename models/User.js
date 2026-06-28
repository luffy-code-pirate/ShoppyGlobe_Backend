// User.js - Mongoose schema for the User collection
// This defines the structure of user documents in MongoDB
// Each user has a username, email and hashed password

import mongoose from 'mongoose'

// Define the shape of a user document in MongoDB
const userSchema = new mongoose.Schema(
  {
    // username - must be provided and must be unique
    username: {
      type:     String,
      required: [true, 'Username is required'],
      unique:   true,
      trim:     true, // removes extra spaces from both ends
    },

    // email - must be provided, unique, and stored in lowercase
    email: {
      type:      String,
      required:  [true, 'Email is required'],
      unique:    true,
      lowercase: true, // always store email in lowercase
      trim:      true,
    },

    // password - we never store plain text passwords
    // bcryptjs will hash it before saving
    password: {
      type:     String,
      required: [true, 'Password is required'],
    },
  },
  {
    // timestamps automatically adds createdAt and updatedAt fields
    timestamps: true,
  }
)

// Create the User model from the schema
// Mongoose will create a collection called 'users' in MongoDB
const User = mongoose.model('User', userSchema)

export default User