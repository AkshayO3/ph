import express from "express";
import { bidController } from "../controllers/bidController.js";
import { securityUtils } from "../utils/security.js";

const router = express.Router();

router.post("/:jobId", securityUtils.verifyUser, securityUtils.verifyFreelancer, bidController.placeBid);
router.get("/:jobId", bidController.getBidsByJobId);
router.patch("/:bidId/accept", securityUtils.verifyUser, securityUtils.verifyEmployer, bidController.acceptBid);
router.patch("/:bidId/reject", securityUtils.verifyUser, securityUtils.verifyEmployer, bidController.rejectBid);

export default router;