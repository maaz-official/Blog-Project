import { User } from '../model/userModel.js'; // Use named import

// Follow a user service
export const followUserService = async (followerId, followingId) => {
    const follower = await User.findById(followerId);
    const following = await User.findById(followingId);

    if (!follower || !following) {
        throw new Error('User not found');
    }

    await follower.follow(followingId);
    await following.addFollower(followerId);

    return { message: 'Followed successfully' };
};

// Unfollow a user service
export const unfollowUserService = async (followerId, followingId) => {
    const follower = await User.findById(followerId);
    const following = await User.findById(followingId);

    if (!follower || !following) {
        throw new Error('User not found');
    }

    await follower.unfollow(followingId);
    await following.removeFollower(followerId);

    return { message: 'Unfollowed successfully' };
};

// Ban a user service
export const banUserService = async (userId) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new Error('User not found');
    }

    await user.ban();
    return { message: 'User banned successfully' };
};

// Unban a user service
export const unbanUserService = async (userId) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new Error('User not found');
    }

    await user.unban();
    return { message: 'User unbanned successfully' };
};
