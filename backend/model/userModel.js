import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Define an enum for user roles
const UserRole = {
    USER: 'user',
    ADMIN: 'admin',
    MODERATOR: 'moderator',
};

// Create a user schema
const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        unique: true,
        sparse: true,
    },
    password: {
        type: String,
        required: true,
    },
    profileImage: {
        type: String,
        default: 'https://www.example.com/default-profile.jpg',
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    isBanned: {
        type: Boolean,
        default: false,
    },
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    roles: {
        type: [{
            type: String,
            enum: Object.values(UserRole),
        }],
        default: [UserRole.USER],
    },
}, {
    timestamps: true,
});

// Password match method
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Pre-save middleware to hash the password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Follow user method
userSchema.methods.follow = async function (userIdToFollow) {
    if (!this.following.includes(userIdToFollow)) {
        this.following.push(userIdToFollow);
        await this.save();
    }
};

// Unfollow user method
userSchema.methods.unfollow = async function (userIdToUnfollow) {
    this.following = this.following.filter(userId => userId.toString() !== userIdToUnfollow.toString());
    await this.save();
};

// Add follower method
userSchema.methods.addFollower = async function (userIdToAdd) {
    if (!this.followers.includes(userIdToAdd)) {
        this.followers.push(userIdToAdd);
        await this.save();
    }
};

// Remove follower method
userSchema.methods.removeFollower = async function (userIdToRemove) {
    this.followers = this.followers.filter(userId => userId.toString() !== userIdToRemove.toString());
    await this.save();
};

// Ban user method
userSchema.methods.ban = async function () {
    this.isBanned = true;
    await this.save();
};

// Unban user method
userSchema.methods.unban = async function () {
    this.isBanned = false;
    await this.save();
};

// Check if the user has a specific role
userSchema.methods.hasRole = function (role) {
    return this.roles.includes(role);
};

// Static method to find users by role
userSchema.statics.findByRole = async function (role) {
    return await this.find({ roles: role });
};

// Static method to create a new user with hashed password
userSchema.statics.createUser = async function (userData) {
    const salt = await bcrypt.genSalt(10);
    userData.password = await bcrypt.hash(userData.password, salt);
    const user = new this(userData);
    return await user.save();
};

// Export User model and UserRole enum
const User = mongoose.model('User', userSchema);

export { User, UserRole };
