import express from 'express'
import { getMyLikedRecipes } from '../controllers/like_controller.js';

const router=express.Router();

router.get('/getMyLikedRecipes',getMyLikedRecipes);
router.post('/like/:id',);


export default router;