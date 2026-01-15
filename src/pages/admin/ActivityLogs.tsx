import React from 'react';
import { useAppStore } from '../../stores/useAppStore';
import { Card } from '../../components/ui/Card';
import { Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export const ActivityLogs = () => {
    const { logs } = useAppStore();

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">System Activity</h1>

            <Card>
                <div className="space-y-6">
                    {logs.map((log) => (
                        <div key={log.id} className="flex items-start gap-4 pb-6 border-b border-gray-100 dark:border-gray-800 last:border-0 last:pb-0">
                            <div className="mt-1 p-2 bg-gray-100 dark:bg-gray-800 rounded-full">
                                <Clock className="w-4 h-4 text-gray-500" />
                            </div>
                            <div>
                                <p className="font-medium text-gray-900 dark:text-white">
                                    <span className="font-bold">{log.user}</span> performed <span className="text-primary">{log.action}</span>
                                </p>
                                <p className="text-sm text-gray-500">{log.timestamp}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </motion.div>
    );
};
