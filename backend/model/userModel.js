import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,  // Full name is now required
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensure emails are unique
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false, // Default is not an admin
    },
    profileImage: {
        type: String,  // URL to the profile image (cloud storage service)
        default: 'https://www.example.com/default-profile.jpg', // Default profile image
    },
    resetPasswordToken: {
        type: String, // Token for resetting password, if needed
    },
    resetPasswordExpire: {
        type: Date, // Expiration time for password reset token
    }
}, {
    timestamps: true,
});

// Method to compare plain password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Pre-save hook to hash the password before saving the user
userSchema.pre('save', async function (next) {
    // Only hash the password if it has been modified or is new
    if (!this.isModified('password')) {
        return next(); // If password is not modified, skip this hook
    }

    // Generate salt and hash the password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next(); // Proceed to save the user
});

const User = mongoose.model("User", userSchema);

export default User;
