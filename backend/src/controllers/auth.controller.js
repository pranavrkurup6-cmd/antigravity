import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Provider from '../models/Provider.js';
import Admin from '../models/Admin.js';

// Generate JWT Token
const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;

        // Validate required fields
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide name, email, and password.',
            });
        }

        // Determine which model to use based on role
        let Model;
        let userData;

        if (role === 'provider') {
            Model = Provider;
            const { serviceCategory } = req.body;

            if (!serviceCategory) {
                return res.status(400).json({
                    success: false,
                    message: 'Service category is required for providers.',
                });
            }

            userData = { name, email, password, serviceCategory };
        } else {
            // Default to user
            Model = User;
            userData = { name, email, password };
        }

        // Check if user already exists
        const existingUser = await Model.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists with this email.',
            });
        }

        // Create new user
        const newUser = await Model.create(userData);

        // Generate token
        const token = generateToken(newUser._id, newUser.role);

        res.status(201).json({
            success: true,
            message: 'Registration successful.',
            token,
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
            },
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Login user/provider/admin
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res, next) => {
    try {
        const { email, password, role } = req.body;

        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide email and password.',
            });
        }

        // Determine which model to use based on role
        let Model;
        if (role === 'admin') {
            Model = Admin;
        } else if (role === 'provider') {
            Model = Provider;
        } else {
            Model = User;
        }

        // Find user
        const user = await Model.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials.',
            });
        }

        // Check password
        const isPasswordValid = await user.comparePassword(password);

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials.',
            });
        }

        // Generate token
        const token = generateToken(user._id, user.role);

        res.status(200).json({
            success: true,
            message: 'Login successful.',
            token,
            user: {
                id: user._id,
                name: user.name || 'Admin',
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        next(error);
    }
};
