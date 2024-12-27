const jwt = require('jsonwebtoken')
const User = require('../models/user.model')


const requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const token = authHeader.split(' ')[1]
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    if (!decoded || !decoded.userId) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const user = await User.findById(decoded.userId)
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    req.user = { id: user._id }
    next()
  } catch (error) {
    return res
      .status(401)
      .json({ message: 'Unauthorized', error: error.message })
  }
}

module.exports = requireAuth
