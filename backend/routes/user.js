import express from 'express'
import { followUser, getFollowers, getFollowingUsers, getUser, login, updateUser } from '../controllers/user_controller.js';

const router=express.Router();

router.post('/update',updateUser);
router.post('/follow/:id',followUser);
router.get('/getUser/:id',getUser);
router.post('/getFollowing',getFollowingUsers);
router.post('/getFollowers',getFollowers);


export default router;