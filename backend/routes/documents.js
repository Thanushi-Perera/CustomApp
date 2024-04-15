import express from "express";
import {
    createDocument,
    getSingleDocument,
    getDocumentsOfJob,
    getAllDocuments,
} from "../controllers/documentController.js";

const router = express.Router();

router.post("/", createDocument);
router.get("/:id", getSingleDocument);
router.get("/job/:id", getDocumentsOfJob);
router.get("/", getAllDocuments);

export default router;
