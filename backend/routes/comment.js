import express from 'express'
import {  } from '../controllers/auth_controller.js';

const router=express.Router();

router.post('/addComment/:id',addComment);
router.get('/getComments/:id',getComments);



export default router;