import React from 'react';
import { useAppStore } from '../../stores/useAppStore';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Moon, Sun, Monitor, Bell, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

export const AdminSettings = () => {
    const { theme, toggleTheme } = useAppStore();

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Settings</h1>

            <Card>
                <h2 className="text-lg font-bold mb-4">System Preferences</h2>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                        <div className="flex items-center gap-3">
                            {theme === 'dark' ? <Moon className="w-5 h-5 text-purple-500" /> : <Sun className="w-5 h-5 text-yellow-500" />}
                            <div>
                                <p className="font-medium">Dark Mode</p>
                                <p className="text-sm text-gray-500">Toggle system-wide dark theme</p>
                            </div>
                        </div>
                        <button onClick={toggleTheme} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${theme === 'dark' ? 'bg-primary' : 'bg-gray-300'}`}>
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${theme === 'dark' ? 'translate-x-6' : 'translate-x-1'}`} />
                        </button>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                        <div className="flex items-center gap-3">
                            <Monitor className="w-5 h-5 text-blue-500" />
                            <div>
                                <p className="font-medium">Maintenance Mode</p>
                                <p className="text-sm text-gray-500">Disable access for non-admin users</p>
                            </div>
                        </div>
                        <input type="checkbox" className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary" />
                    </div>
                </div>
            </Card>

            <Card>
                <h2 className="text-lg font-bold mb-4">Security</h2>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                        <div className="flex items-center gap-3">
                            <Lock className="w-5 h-5 text-red-500" />
                            <div>
                                <p className="font-medium">Force Password Reset</p>
                                <p className="text-sm text-gray-500">Require all users to reset password on next login</p>
                            </div>
                        </div>
                        <Button variant="outline" size="sm">Trigger Reset</Button>
                    </div>
                </div>
            </Card>

            <div className="flex justify-end">
                <Button onClick={() => alert('Settings Saved!')}>Save Changes</Button>
            </div>
        </motion.div>
    );
};
