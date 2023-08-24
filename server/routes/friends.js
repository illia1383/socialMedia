// routes/friends.js

import express from "express";
import { addRemoveFriend } from "../controllers/friends.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Add or Remove a Friend
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;
