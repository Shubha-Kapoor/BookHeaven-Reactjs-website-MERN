import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // We pass { dbName: 'bookheaven' } explicitly as the second argument
    // This forces Mongoose to use your bookheaven database no matter what!
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      dbName: 'bookheaven',
    });
    
    console.log(`MongoDB Atlas Connected: ${conn.connection.host}`);
    console.log(`Active Database Name: ${conn.connection.name}`); // Will print "bookheaven" in your terminal
  } catch (error) {
    console.error(`Database Connection Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;