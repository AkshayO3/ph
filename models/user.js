import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    salt: String,
    role: { type: String, enum: ["freelancer", "employer"] },
});

export default mongoose.model('User', UserSchema);