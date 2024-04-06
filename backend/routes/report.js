import express from "express";
import ReportController from "../controllers/Report.js";

const router = express.Router();

router.get("/report", ReportController.getReportData);

export default router;