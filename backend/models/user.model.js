const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 30
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
    },
    profilePictureUrl: {
      type: String
    },
    eventsCreated:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Event"
    }],
    bookedTickets:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Ticket"
    }]
  },
  { timestamps: true }
)

const User = mongoose.model('User', userSchema)
module.exports = User