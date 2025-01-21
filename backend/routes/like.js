import express from 'express'
import { getMyLikedRecipes, likeRecipe } from '../controllers/like_controller.js';
import verifyToken from '../middleware/verifyToken.js';

const router=express.Router();

router.get('/getMyLikedRecipes',verifyToken,getMyLikedRecipes);
router.post('/like',verifyToken,likeRecipe);


export default router;