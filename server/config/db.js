import mongoose from 'mongoose';
import { dataStore } from '../services/dataStore.js';

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/chitram';
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2500, // Quick timeout so server doesn't hang if Mongo isn't up
    });
    console.log(`🎬 MongoDB Connected: ${conn.connection.host}`);
    dataStore.setMongoConnected(true);
  } catch (error) {
    console.log(`ℹ️  Local MongoDB not detected (${error.message}).`);
    console.log(`🍿 Chitram running smoothly in High-Performance Embedded Data Mode.`);
    dataStore.setMongoConnected(false);
  }
};
