import express from "express";
import {
    getFletes,
    getFleteId,
    createFleteWithDocuments,
    updateFlete,
    deleteFlete
} from "../controllers/flete.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.post('/crear-flete', verifyUser, createFleteWithDocuments);

export default router;