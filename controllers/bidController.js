import Bid from "../models/bid.js";
import Job from "../models/job.js";

const updateBidStatus = async (bidId, userId, statusToSet, io) => {
    const bid = await Bid.findById(bidId);
    if (!bid) {
        return { error: 'Bid not found', statusCode: 404 };
    }

    const job = await Job.findById(bid.job);
    if (!job) {
        return { error: 'Job not found', statusCode: 404 };
    }

    if (job.postedBy.toString() !== userId) {
        return { error: 'Access denied', statusCode: 403 };
    }

    bid.status = statusToSet;
    await bid.save();

    io.emit('bidStatusUpdated', { bidId, status: statusToSet });

    return { success: true };
};

export const bidController = {
    placeBid: async (req, res) => {
        const { jobId } = req.params;
        const { bidAmount, timeline, message } = req.body;

        if (!bidAmount || !timeline || !message) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        try {
            const job = await Job.findById(jobId);
            if (!job) {
                return res.status(404).json({ message: 'Job not found' });
            }

            const newBid = new Bid({ job: jobId, bidAmount, timeline, message, freelancer: req.user.id });
            await newBid.save();

            return res.status(201).json({ message: "Bid placed successfully." });
        } catch (error) {
            console.error('Error placing bid:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },

    getBidsByJobId: async (req, res) => {
        const { jobId } = req.params;

        try {
            const bids = await Bid.find({ job: jobId });
            return res.status(200).json(bids);
        } catch (error) {
            console.error('Error retrieving bids:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },

    acceptBid: async (req, res) => {
        const { bidId } = req.params;
        const io = req.app.get('io');

        try {
            const result = await updateBidStatus(bidId, req.user.id, 'Accepted', io);

            if (result.error) {
                return res.status(result.statusCode).json({ message: result.error });
            }

            return res.status(200).json({ message: 'Bid accepted successfully.' });
        } catch (error) {
            console.error('Error accepting bid:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },

    rejectBid: async (req, res) => {
        const { bidId } = req.params;
        const io = req.app.get('io');

        try {
            const result = await updateBidStatus(bidId, req.user.id, 'Rejected', io);

            if (result.error) {
                return res.status(result.statusCode).json({ message: result.error });
            }

            return res.status(200).json({ message: 'Bid rejected successfully.' });
        } catch (error) {
            console.error('Error rejecting bid:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
};