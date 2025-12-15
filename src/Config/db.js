const mongoose = require('mongoose');
require('dotenv').config();

const DB_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/gig_tracker_db';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1);
    } 
};

module.exports = connectDB;
