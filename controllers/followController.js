const User = require("../models/User");
const { CustomError } = require("../middlewares/error");

const followUser = async (req, res, next) => {
  const { userId } = req.params;
  const currentUserId = req.user._id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new CustomError("User not found!", 404);
    }

    if (user._id.toString() === currentUserId.toString()) {
      throw new CustomError("You cannot follow yourself!", 400);
    }

    if (user.followers.includes(currentUserId)) {
      throw new CustomError("You are already following this user!", 400);
    }

    user.followers.push(currentUserId);
    await user.save();

    const currentUser = await User.findById(currentUserId);
    if (!currentUser) {
      throw new CustomError("User not found!", 404);
    }

    currentUser.following.push(userId);
    await currentUser.save();

    res.status(200).json({ message: "User followed successfully!" });
  } catch (error) {
    next(error);
  }
};

const unfollowUser = async (req, res, next) => {
  const { userId } = req.params;
  const currentUserId = req.user._id;

  try {
    const user = await User.findById(userId);
    if (!user) {throw new CustomError("User not found!", 404);
    }

    if (!user.followers.includes(currentUserId)) {
      throw new CustomError("You are not following this user!", 400);
    }

    user.followers = user.followers.filter((id) => id.toString() !== currentUserId.toString());
    await user.save();

    const currentUser = await User.findById(currentUserId);
    if (!currentUser) {
      throw new CustomError("User not found!", 404);
    }

    currentUser.following = currentUser.following.filter((id) => id.toString() !== userId.toString());
    await currentUser.save();

    res.status(200).json({ message: "User unfollowed successfully!" });
  } catch (error) {
    next(error);
  }
};

module.exports = { followUser, unfollowUser };