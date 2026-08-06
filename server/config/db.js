const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // fail fast
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`⚠️  MongoDB connection failed: ${error.message}`);
    console.error('   → Make sure MongoDB is running or set a valid MONGO_URI in server/.env');
    console.error('   → Server will continue running — API routes that need DB will return 503.');
    // Do NOT call process.exit(1) so server keeps running
  }
};

module.exports = connectDB;
