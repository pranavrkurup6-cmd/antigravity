import express from 'express';
import { getAdminDashboard, getAllUsers, deleteUser } from '../controllers/admin.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';
import roleMiddleware from '../middleware/role.middleware.js';

const router = express.Router();

// All routes are protected and require 'admin' role
router.use(authMiddleware);
router.use(roleMiddleware('admin'));

// @route   GET /api/admin/dashboard
// @desc    Get admin dashboard statistics
// @access  Private (Admin only)
router.get('/dashboard', getAdminDashboard);

// @route   GET /api/admin/users
// @desc    Get all users and providers
// @access  Private (Admin only)
router.get('/users', getAllUsers);

// @route   DELETE /api/admin/users/:id
// @desc    Delete a user or provider
// @access  Private (Admin only)
router.delete('/users/:id', deleteUser);

export default router;
