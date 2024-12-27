const express = require('express')
const authRouter = express.Router()
const { register, login } = require('../controller/auth.controller')
const { generateWebToken } = require('../utils/utils')


authRouter.post('/register', async (req, res, next) => {
  try {
    const newUser = await register(req.body)
    const token = generateWebToken(newUser._id)
    res.status(201).json({
      success: true,
      message: 'User created successfully!',
      token,
      user: newUser
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create user account',
      error: error.message
    })
    next(error)
  }
})
authRouter.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await login(email, password)
    const token = generateWebToken(user._id)
    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to login',
      error: error.message
    })
    next(error)
  }
})

module.exports = authRouter
