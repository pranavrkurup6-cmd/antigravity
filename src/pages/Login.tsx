import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';
import { useAppStore } from '../stores/useAppStore';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Mail, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

export const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuthStore();
    const { users, addLog } = useAppStore();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        setTimeout(() => {
            const user = users.find((u) => u.email === email);

            if (user) {
                login(user as any);
                addLog({
                    id: Math.random().toString(),
                    user: user.name,
                    action: 'System Login',
                    timestamp: new Date().toLocaleString(),
                });

                if (user.role === 'Admin') {
                    navigate('/admin');
                } else {
                    navigate('/dashboard');
                }
            } else {
                // Mock fallback for demo if user not found (or standard failure)
                // For demo purposes, let's allow "admin@localfix.com" if not in list
                if (email === 'admin@localfix.com') {
                    const adminUser = { id: 'admin', name: 'Admin', email, role: 'Admin' as const, avatar: '' };
                    login(adminUser);
                    navigate('/admin');
                } else if (email === 'user@localfix.com' || email === 'john@example.com') { // fallback
                    const normalUser = { id: 'user', name: 'User', email, role: 'User' as const, avatar: '' };
                    login(normalUser);
                    navigate('/dashboard');
                } else {
                    setError('Invalid credentials. Try admin@localfix.com');
                }
            }
            setLoading(false);
        }, 1000); // Fake delay
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
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">Sign In</h1>
                        <p className="text-gray-500">Welcome back</p>
                    </div>

                    <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-sm text-blue-800 dark:text-blue-200">
                        <p className="font-semibold mb-1">Demo Credentials:</p>
                        <p>User: john@example.com</p>
                        <p>Admin: admin@localfix.com</p>
                        <p>Pass: any</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
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
                            Sign In
                        </Button>
                    </form>

                    <div className="mt-6 text-center text-sm text-gray-500">
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-primary hover:underline font-medium">
                            Sign up
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
