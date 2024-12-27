const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('../models/user.model')
const { generateHashedPassword } = require('../utils/utils')

async function register (userData) {
  try {
    const {
      name,
      email,
      password,
      profilePictureUrl,
      eventsCreated
    } = userData
    const isUserExist = await User.findOne({ email })

    if (isUserExist) {
      throw new Error('User already exist')
    }

    const hashedPassword = await generateHashedPassword(password)
    const newUser = new User({
        name,
        email,
        password:hashedPassword,
        profilePictureUrl,
        eventsCreated
    })

    return await newUser.save()
  } catch (error) {
    throw error
  }
}
async function login (email, password) {
  try {
    const user = await User.findOne({ email })
    if (!user) {
      throw new Error('User not found')
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password)

    if (!isPasswordMatched) {
      throw new Error('Invalid credentials')
    }

    return user
  } catch (error) {
    throw error
  }
}


module.exports = { register, login}