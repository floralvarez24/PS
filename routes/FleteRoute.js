import express from "express";
import {
    getFletesAdmin,
    getFletesByUser,
    getFleteRazonSocial,
    getFleteObra,
    createFleteWithDocuments,
    updateFlete,
    deleteFlete,
    getFleteById,
    deleteVehiculo,
    addVehicleToFlete
} from "../controllers/flete.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/pedir-flete',verifyUser, getFletesAdmin);
router.get('/pedir-flete-user',verifyUser, getFletesByUser);
router.get('/pedir-flete/:razonSocial',verifyUser, getFleteRazonSocial);
router.get('/pedir-flete1/:obra',verifyUser, getFleteObra);
router.get('/pedir-flete2/:idFletero',verifyUser, getFleteById);
router.post('/crear-flete', verifyUser, createFleteWithDocuments);
router.patch('/modificar-flete/:idFletero', verifyUser, updateFlete);
router.delete('/eliminar-flete/:idFletero',verifyUser, deleteFlete);
router.delete('/eliminar-vehiculo/:idVehiculoFlete',verifyUser, deleteVehiculo);
router.post('/flete/:idFletero/vehiculo', verifyUser, addVehicleToFlete);


export default router;