import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema({
    title: String,
    description: String,
    budget: Number,
    duration: Number,
    skillsRequired: [String],
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export default mongoose.model('Job', JobSchema);