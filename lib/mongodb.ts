// lib/mongodb.ts
import mongoose from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URL as string;

export const connectDb = async function () {
  await mongoose.connect(MONGODB_URL);
  console.log("Db Connected");
  
}