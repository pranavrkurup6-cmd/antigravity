import React, { useState } from 'react';
import { useAppStore } from '../../stores/useAppStore';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Shield, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

export const Roles = () => {
    const { roles } = useAppStore();

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Roles & Permissions</h1>
                <Button>
                    <Plus className="w-5 h-5 mr-2" />
                    Add Role
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {roles.map((role) => (
                    <Card key={role.id} hover>
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-xl">
                                <Shield className="w-6 h-6" />
                            </div>
                            <span className="text-sm text-gray-500">{role.permissions.length} Permissions</span>
                        </div>
                        <h3 className="text-xl font-bold mb-2">{role.name}</h3>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {role.permissions.map(p => (
                                <span key={p} className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded text-gray-600 dark:text-gray-300 uppercase">{p}</span>
                            ))}
                        </div>
                        <Button variant="outline" size="sm" className="w-full">Edit Role</Button>
                    </Card>
                ))}
            </div>
        </motion.div>
    );
};
