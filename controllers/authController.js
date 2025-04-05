import User from "../models/user.js";
import {securityUtils} from "../utils/security.js";
import bcrypt from "bcrypt";

const checkEmailExists = async (email) => {
    const user = await User.findOne({ email });
    return !!user;
};
export const authController = {
    register :  async (req, res) => {
        const {name, email, password, role} = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({message: 'All fields are required'});
        }

        if (await checkEmailExists(email)) {
            return res.status(400).json({message: 'Email already exists'});
        }

        try {
            const {salt, hashedPassword} = await securityUtils.generateSaltAndHashPassword(password);
            const newUser = new User({name, email, password: hashedPassword,salt, role});
            await newUser.save();

            return res.status(201).json({"message":"User registered successfully."});
        } catch (error) {
            console.error('Error registering user:', error);
            return res.status(500).json({message: 'Internal server error'});
        }
    },

    login: async (req, res) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: 'Invalid email or password' });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(400).json({ message: 'Invalid email or password' });
            }

            const token = securityUtils.generateToken(user);
            return res.status(200).json({ message: "Login successful", token });
        } catch (error) {
            console.error('Error logging in user:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}