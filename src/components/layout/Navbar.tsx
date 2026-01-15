import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../stores/useAuthStore';
import { useAppStore } from '../../stores/useAppStore';
import { Sun, Moon, Menu, Bell } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';

export const Navbar = ({ toggleSidebar }: { toggleSidebar?: () => void }) => {
    const { isAuthenticated, user, logout } = useAuthStore();
    const { theme, toggleTheme } = useAppStore();
    const location = useLocation();
    const isDashboard = location.pathname.includes('/dashboard') || location.pathname.includes('/admin');

    return (
        <nav className="fixed top-0 w-full bg-white/80 dark:bg-dark-card/80 backdrop-blur-md z-40 border-b border-gray-100 dark:border-gray-800 h-16 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
                <div className="flex items-center gap-4">
                    {isDashboard && (
                        <button onClick={toggleSidebar} className="p-2 -ml-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 md:hidden">
                            <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                        </button>
                    )}
                    <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        LocalFix
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all text-gray-600 dark:text-gray-400"
                    >
                        {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                    </button>

                    {isAuthenticated ? (
                        <div className="flex items-center gap-4">
                            <button className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400">
                                <Bell className="w-5 h-5" />
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-dark-card"></span>
                            </button>
                            <div className="flex items-center gap-3 pl-4 border-l border-gray-200 dark:border-gray-700">
                                <div className="text-right hidden sm:block">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.name}</p>
                                    <p className="text-xs text-gray-500">{user?.role}</p>
                                </div>
                                {user?.avatar && (
                                    <img src={user.avatar} alt="Profile" className="w-9 h-9 rounded-full ring-2 ring-primary/20" />
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link to="/login">
                                <Button variant="ghost" size="sm">Log In</Button>
                            </Link>
                            <Link to="/signup">
                                <Button size="sm">Get Started</Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};
