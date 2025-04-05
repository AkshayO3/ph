import Job from "../models/job.js";

export const jobController = {
    createJob: async (req, res) => {
        const { title, description, budget, duration, skillsRequired } = req.body;

        if (!title || !description || !budget || !duration || !skillsRequired) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        try {
            const newJob = new Job({ title, description, budget, duration, skillsRequired,postedBy:req.user.id });
            await newJob.save();

            return res.status(201).json({ message: "Job posted successfully." });
        } catch (error) {
            console.error('Error posting job:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },

    getJobs: async (req, res) => {
        const { skills } = req.query;
        const skillsArray = skills ? skills.split(',') : [];
        try {
            let jobs;

            if (skillsArray.length > 0) {
                jobs = await Job.find({
                    $and: skillsArray.map(skill => ({
                        skillsRequired: {
                            $regex: new RegExp(`^${skill}$`, 'i')
                        }
                    }))
                });
            } else {
                jobs = await Job.find();
            }
            return res.status(200).json(jobs);
        } catch (error) {
            console.error('Error retrieving jobs:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },

    getJobById: async (req, res) => {
        const { jobId } = req.params;

        try {
            const job = await Job.findById(jobId);
            if (!job) {
                return res.status(404).json({ message: 'Job not found' });
            }
            return res.status(200).json(job);
        } catch (error) {
            console.error('Error retrieving job:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
};