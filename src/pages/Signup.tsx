import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { User, Mail, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import { api } from '../services/api';

export const Signup = () => {
    const navigate = useNavigate();
    const { signup } = useAuthStore();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const [error, setError] = useState('');

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Attempt API Register
            const response = await api.register({
                name,
                email,
                password,
                role: 'user' // Default to user
            });

            if (response.success && response.token) {
                const apiUser = response.user;
                const mappedRole = apiUser.role === 'admin' ? 'Admin' :
                    (apiUser.role === 'provider' ? 'ServiceProvider' : 'User');
                const userToStore = { ...apiUser, id: apiUser._id || apiUser.id, role: mappedRole };

                signup(userToStore, response.token);

                // Redirect to dashboard (or provider dashboard if we support signing up as provider from start, 
                // but registration logic defaults to user currently)
                navigate('/dashboard');
                setLoading(false);
                return;
            }
        } catch (err: any) {
            console.log('API Signup failed, trying mock fallback...', err);
            // If API fails, check if it's a duplicate email error or network error
            if (err.message && err.message.includes('already exists')) {
                setError(err.message);
                setLoading(false);
                return;
            }
        }

        // Mock Fallback
        setTimeout(() => {
            // Mock signup success
            const newUser = {
                id: Math.random().toString(),
                name,
                email,
                role: 'User' as const,
                avatar: `https://ui-avatars.com/api/?name=${name}&background=random`
            };

            signup(newUser, 'mock-signup-token-' + Math.random());
            navigate('/dashboard');
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-bg transition-colors duration-300 px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <div className="bg-white dark:bg-dark-card rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-800">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">Create Account</h1>
                        <p className="text-gray-500">Create your account to get started</p>
                    </div>

                    <form onSubmit={handleSignup} className="space-y-6">
                        <Input
                            label="Full Name"
                            placeholder="John Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            icon={<User className="w-5 h-5" />}
                            required
                        />

                        <Input
                            label="Email Address"
                            type="email"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            icon={<Mail className="w-5 h-5" />}
                            required
                        />

                        <Input
                            label="Password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            icon={<Lock className="w-5 h-5" />}
                            required
                        />

                        {error && <p className="text-sm text-red-500 text-center">{error}</p>}

                        <Button type="submit" className="w-full" isLoading={loading} size="lg">
                            Sign Up
                        </Button>
                    </form>

                    <div className="mt-6 text-center text-sm text-gray-500">
                        Already have an account?{' '}
                        <Link to="/login" className="text-primary hover:underline font-medium">
                            Sign in
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
