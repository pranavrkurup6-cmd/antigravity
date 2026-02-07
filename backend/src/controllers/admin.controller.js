import User from '../models/User.js';
import Provider from '../models/Provider.js';
import Booking from '../models/Booking.js';

// @desc    Get admin dashboard data
// @route   GET /api/admin/dashboard
// @access  Private (Admin only)
export const getAdminDashboard = async (req, res, next) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalProviders = await Provider.countDocuments();
        const totalBookings = await Booking.countDocuments();

        const pendingBookings = await Booking.countDocuments({ status: 'pending' });
        const completedBookings = await Booking.countDocuments({ status: 'completed' });

        res.status(200).json({
            success: true,
            stats: {
                totalUsers,
                totalProviders,
                totalBookings,
                pendingBookings,
                completedBookings,
            },
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private (Admin only)
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find().select('-password').sort({ createdAt: -1 });
        const providers = await Provider.find().select('-password').sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            users,
            providers,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete a user
// @route   DELETE /api/admin/users/:id
// @access  Private (Admin only)
export const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { userType } = req.query; // 'user' or 'provider'

        let Model = userType === 'provider' ? Provider : User;

        const user = await Model.findById(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found.',
            });
        }

        await Model.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: 'User deleted successfully.',
        });
    } catch (error) {
        next(error);
    }
};
