import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const securityUtils = {
    verifyUser : async (req, res, next) => {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(403).json({ message: "A token is required for authentication" });
        }
        try {
            req.user = jwt.verify(token, process.env.JWT_SECRET);
            if (!req.user) {
                return res.status(404).json({ message: 'User not found' });
            }
            next();
        } catch (error) {
            console.error('Error verifying token:', error);
            return res.status(400).json({ message: `Invalid token --> ${error.message}` });
        }
    },

    verifyFreelancer : (req, res, next) => {
        if (req.user.role !== "freelancer") {
            return res.status(403).json({ message: "Access denied" });
        }
        next();
    },

    verifyEmployer : (req, res, next) => {
        if (req.user.role !== "employer") {
            return res.status(403).json({ message: "Access denied" });
        }
        next();
    },

    generateToken : (user) => {
        return jwt.sign(
            { id: user._id, role:user.role},
            process.env.JWT_SECRET,
        );
    },


    generateSaltAndHashPassword : async (password) => {
        const saltRounds = parseInt(process.env.SALT_ROUNDS);
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        return { salt, hashedPassword };
    }
}