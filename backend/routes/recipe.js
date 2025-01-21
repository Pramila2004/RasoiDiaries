import express from 'express'
import { createRecipe, getAllRecipes, getMyRecipes, getSingleRecipe } from '../controllers/recipe_controller.js';
import verifyToken from '../middleware/verifyToken.js';

const router=express.Router();

router.post('/createRecipe',verifyToken, createRecipe);
router.get('/getAllRecipes',getAllRecipes);
router.get('/getSingleRecipe/:id',getSingleRecipe);
router.get('/getMyRecipes',verifyToken,getMyRecipes);
// router.get('/getMySavedRecipes',getFollowers);


export default router;