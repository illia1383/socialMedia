// controllers/friends.js

import User from "../models/User.js";

// Add or Remove a Friend
export const addRemoveFriend = async (req, res) => {
  const { id, friendId } = req.params; // Extract user IDs from URL parameters

  try {
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      return res.status(404).json({ msg: "User or friend not found." });
    }

    // Check if friend is already in the user's friends list
    const isFriend = user.friends.includes(friendId);

    if (isFriend) {
      // If already friends, remove from friends list
      user.friends.pull(friendId);
      await user.save();
      res.status(200).json({ msg: "Friend removed successfully." });
    } else {
      // If not friends, add to friends list
      user.friends.push(friendId);
      await user.save();
      res.status(200).json({ msg: "Friend added successfully." });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
