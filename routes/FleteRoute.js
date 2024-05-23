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

router.get('/pedir-flete',verifyUser, getFletes);
router.get('/pedir-flete/:idFletero',verifyUser, getFleteId);
router.post('/crear-flete', verifyUser, createFleteWithDocuments);
router.patch('/modificar-flete/:idFletero', verifyUser, updateFlete);
router.delete('/elimianr-flete/:idFletero',verifyUser, deleteFlete);

export default router;