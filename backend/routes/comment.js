import express from 'express'
import {  } from '../controllers/auth_controller.js';
import verifyToken from '../middleware/verifyToken.js';
import { addRating, getRatings } from '../controllers/comment_controller.js';

const router=express.Router();

router.post('/addRating/:id',verifyToken, addRating);
router.get('/getRatings/:id',verifyToken,getRatings);



export default router;