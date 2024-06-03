import express from "express";
import {
    getSubContratoAdmin,
    getSubContratoByUser,
    getSubContratoRazonSocial,
    getSubContratoObra,
    createSubContratoWithDocuments,
    updateSubContrato,
    deleteSubContrato 
    
} from "../controllers/subContrato.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/pedir-subContrato',verifyUser, getSubContratoAdmin);
router.get('/pedir-subContrato-user',verifyUser, getSubContratoByUser);
router.get('/pedir-subContrato/:razonSocial',verifyUser, getSubContratoRazonSocial);
router.get('/pedir1-subContrato/:obra',verifyUser, getSubContratoObra);
router.post('/crear-subContrato', verifyUser, createSubContratoWithDocuments);
router.patch('/modificar-subContrato/:idSubContrato', verifyUser, updateSubContrato);
router.delete('/eliminar-subContrato/:idSubContratos',verifyUser, deleteSubContrato);

export default router;