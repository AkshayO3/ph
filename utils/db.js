import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log("Connected to the database.");
    } catch (err) {
        console.error("Database connection error: ", err);
    }
};

