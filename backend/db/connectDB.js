const mongoose=require('mongoose');
const mongoURI = process.env.MONGO_URI;

const initializeDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to mongoDB successfully");
  } catch (error) {
    console.error("Error in connecting database: ", error);
  }
};


module.exports={initializeDB};