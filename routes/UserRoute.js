import express from "express";
import{
    getUsers,
    getUsersByID,
    getUsersByMail,
    createUsers,
    updateUsers,
    deleteUsers
} from "../controllers/users.js";

const router = express.Router();

router.get('/users', getUsers);
router.get('/users/:id', getUsersByID);
router.get('/usersMail/:email', getUsersByMail);
router.post('/users', createUsers);
router.patch('/users/:id', updateUsers);
router.delete('/users/:id', deleteUsers);


export default router;
