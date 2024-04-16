import express from "express";
import {
    createDocument,
    getSingleDocument,
    getDocumentsOfJob,
    getAllDocuments,
    analyzeDocs,
    getAllJobs
} from "../controllers/documentController.js";

const router = express.Router();

router.post("/", createDocument);
router.get("/jobs", getAllJobs);
router.get("/:id", getSingleDocument);
router.get("/job/:id", getDocumentsOfJob);
router.get("/analyze/:id", analyzeDocs);
router.get("/", getAllDocuments);

export default router;
