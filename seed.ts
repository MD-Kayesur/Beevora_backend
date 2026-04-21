import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { seedProducts } from './src/utils/seedProducts';
import config from './src/config/env';

dotenv.config();

const MONGO_URI = config.database_url || "mongodb://localhost:27017/beevora";

const runSeed = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Connected to MongoDB");

        await seedProducts();

        console.log("Seeding complete");
        process.exit(0);
    } catch (error) {
        console.error("Seeding failed", error);
        process.exit(1);
    }
};

runSeed();
