import express from 'express'
import verifyToken from '../middleware/verifyToken.js';
import { addRating, getAverageRating, getRatings } from '../controllers/comment_controller.js';

const router=express.Router();

router.post('/addRating/:id',verifyToken, addRating);
router.get('/getRatings/:id',verifyToken,getRatings);
router.get("/averageRating/:id", getAverageRating);


export default router;