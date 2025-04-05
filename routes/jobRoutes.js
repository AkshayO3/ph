import express from "express";
import { jobController } from "../controllers/jobController.js";
import {securityUtils} from "../utils/security.js";

const router = express.Router();

router.post("/create",securityUtils.verifyUser,securityUtils.verifyEmployer,jobController.createJob);
router.get("/", jobController.getJobs);
router.get("/:jobId", jobController.getJobById);

export default router;