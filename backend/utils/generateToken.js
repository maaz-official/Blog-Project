import jwt from 'jsonwebtoken';

const generateToken = (userId, res) => {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET || 'maaz1234', {
        expiresIn: '30d', // Token expiration time (30 days)
    });

    // Set the token in a cookie
    res.cookie('jwt', token, {
        httpOnly: true, // Prevent client-side JS from accessing the cookie
        secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
        sameSite: 'strict', // Ensure the cookie is sent with requests only from the same domain
        maxAge: 30 * 24 * 60 * 60 * 1000, // Cookie expiration (30 days)
    });

    return token;
};

export default generateToken;
