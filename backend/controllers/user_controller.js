
import userModel from "../models/user.js"; // Adjust the path as needed


export const updateUser = async (req, res) => {
  const userId = req.userId;

  try {
    const { username, email, bio, avatar } = req.body;

    // Validate user existence
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update fields dynamically
    if (username) user.username = username;
    if (email) user.email = email;
    if (bio) user.bio = bio;
    if (avatar) user.avatar = avatar;

    // Save the updated user
    const updatedUser = await user.save();
    const { password, ...safeUser } = updatedUser._doc;

    res.status(200).json({
      message: "User updated successfully",
      user: safeUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error: error.message });
  }
};


export const followUser= async (req, res) => {
  const targetUserId  = req.params; // ID of the user to be followed/unfollowed
  const  userId  = req.userId ; // ID of the user performing the action

  if (!userId || !targetUserId) {
    return res.status(400).json({ message: "User ID and Target User ID are required" });
  }

  try {
    const user = await userModel.findById(userId); // User performing the action
    const targetUser = await userModel.findById(targetUserId); // User being followed/unfollowed

    if (!user || !targetUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user is already following the target user
    const isFollowing = user.following.includes(targetUserId);

    if (isFollowing) {
      // Unfollow logic
      user.following = user.following.filter((id) => id.toString() !== targetUserId);
      targetUser.followers = targetUser.followers.filter((id) => id.toString() !== userId);

      await user.save();
      await targetUser.save();

      return res.status(200).json({ message: "Unfollowed successfully" });
    } else {
      // Follow logic
      user.following.push(targetUserId);
      targetUser.followers.push(userId);

      await user.save();
      await targetUser.save();

      return res.status(200).json({ message: "Followed successfully" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error processing follow/unfollow", error: error.message });
  }
};


export const getUser=async(req,res)=>{
    const userId = req.params;

    try {
        // Find the user by ID and exclude the password field
        const user = await userModel.findById(userId).select("-password");
    
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
    
        res.status(200).json({
          message: "User retrieved successfully",
          user,
        });
      } catch (error) {
        res.status(500).json({ message: "Error retrieving user", error: error.message });
    }
}


export const getFollowingUsers= async (req,res)=>{
    const userId  = req.userId;

    try {
        // Find the user and populate the 'following' field with user details
        const user = await userModel
          .findById(userId)
          .select("following") // Retrieve only the 'following' field
          .populate({
            path: "following",
            select: "username email avatar bio", // Specify fields to return
          });
    
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
    
        res.status(200).json({
          message: "Following members retrieved successfully",
          following: user.following,
        });
      } catch (error) {
        res.status(500).json({ message: "Error retrieving following members", error: error.message });
      }

}
export const getFollowers= async (req,res)=>{
    const userId  = req.userId;

    try {
        // Find the user and populate the 'followers' field with user details
        const user = await userModel
          .findById(userId)
          .select("followers") // Retrieve only the 'followers' field
          .populate({
            path: "followers",
            select: "username email avatar bio", // Specify fields to return
          });
    
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
    
        res.status(200).json({
          message: "Followers retrieved successfully",
          followers: user.followers,
        });
      } catch (error) {
        res.status(500).json({ message: "Error retrieving followers", error: error.message });
      }

}

export const getNoOfLikedRecipes=async(req,res)=>{
  const userId = req.userId;

  try {
      // Find the user by ID and exclude the password field
      const user = await userModel.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const liked=user.likedRecipes.length;
  
      res.status(200).json({
        message: "User retrieved successfully",
        liked,
      });
    } catch (error) {
      res.status(500).json({ message: "Error retrieving user", error: error.message });
  }
}


