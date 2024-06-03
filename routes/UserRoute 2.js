import express from "express";
import{
    getUsers,
    getUsersByID,
    getUsersByMail,
    createUsers,
    updateUsers,
    deleteUsers
} from "../controllers/users.js";

import { verifyUser,adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/users',verifyUser, adminOnly, getUsers);
router.get('/users/:id',verifyUser, adminOnly, getUsersByID);
router.get('/usersMail/:email',verifyUser, adminOnly, getUsersByMail);
router.post('/users',verifyUser, adminOnly, createUsers);
router.patch('/users/:id', verifyUser, adminOnly, updateUsers);
router.delete('/users/:id',verifyUser, adminOnly, deleteUsers);


export default router;
