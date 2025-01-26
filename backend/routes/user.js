import express from 'express'
import { followUser, getFollowers, getFollowingUsers, getNoOfLikedRecipes, getUser, updateUser } from '../controllers/user_controller.js';
import verifyToken from '../middleware/verifyToken.js'
const router=express.Router();

router.put('/update',verifyToken, updateUser);
router.post('/follow/:id',followUser);
router.get('/getUser/:id',getUser);
router.post('/getFollowing',getFollowingUsers);
router.post('/getFollowers',getFollowers);
router.get('/getNoOfLikedRecipes',verifyToken,getNoOfLikedRecipes);


export default router;