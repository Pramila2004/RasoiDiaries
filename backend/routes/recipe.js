import express from 'express'
import { followUser, getFollowers, getFollowingUsers, getUser, login, updateUser } from '../controllers/user_controller.js';

const router=express.Router();

router.post('/createRecipe',followUser);
router.get('/getAllRecipes',getUser);
router.get('/getSingleRecipe/:id',followUser);
router.get('/getMyRecipes',getFollowingUsers);
router.get('/getMySavedRecipes',getFollowers);


export default router;