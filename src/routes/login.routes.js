import express from 'express';
import { getUsers, login } from '../controllers/login.controller.js';

const router = express.Router();

router.get("/", getUsers);  
router.post("/", login); 

export default router;
