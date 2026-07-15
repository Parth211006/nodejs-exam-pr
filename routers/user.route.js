import { Router } from "express";
import { create, deleteUser, getAll, getOne, login, signup, updateUser } from "../controllers/user.controller.js";
import userAuth from "../middlewares/auth.js";

const router=Router()

router.post('/',create);

router.post('/signup',signup);

router.post('/login',login);

router.get('/',userAuth,getAll);

router.get('/:id',userAuth,getOne);

router.delete('/:id',userAuth,deleteUser);

router.patch('/:id',userAuth,updateUser);

export default router;
