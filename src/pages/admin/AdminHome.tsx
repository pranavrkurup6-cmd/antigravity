import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Users, Wrench, DollarSign, Filter, Download, Search, Sun, Bell, MoreVertical } from 'lucide-react';
import { motion } from 'framer-motion';

export const AdminHome = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const stats = [
        {
            label: 'Total Users',
            value: '12,400',
            sub: 'GOAL: 20K ACTIVE',
            trend: '+12%',
            icon: Users,
            color: 'bg-emerald-600',
            progress: 62
        },
        {
            label: 'Total Providers',
            value: '1,200',
            sub: '94% VETTED',
            trend: '+5%',
            icon: Wrench,
            color: 'bg-orange-500', // Changed to orange/red tone based on image
            progress: 94
        },
        {
            label: 'Total Revenue',
            value: '$142,500',
            sub: 'Q4 2023 | Projection: $1.2M',
            trend: '+18.4%',
            icon: DollarSign,
            color: 'bg-gray-800', // Dark card style for Revenue
            isDark: true
        }
    ];

    const activities = [
        {
            client: 'Sarah Jenkins',
            clientId: '#LF-8842',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&q=80',
            service: 'Full Home Plumbing',
            type: 'Emergency Repair',
            provider: "Dave's Pro Repairs",
            amount: '$345.00',
            status: 'COMPLETED',
            statusColor: 'text-emerald-600'
        },
        {
            client: 'Marcus Thorne',
            clientId: '#LF-8910',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&q=80',
            service: 'HVAC Maintenance',
            type: 'Winter Prep',
            provider: 'Arctic Air Solutions',
            amount: '$120.00',
            status: 'PENDING',
            statusColor: 'text-gray-500'
        },
        {
            client: 'Elena Rodriguez',
            clientId: '#LF-8944',
            avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&q=80',
            service: 'Smart Lock Install',
            type: 'Tech Specialist',
            provider: 'SecuHome Systems',
            amount: '$85.00',
            status: 'CANCELLED',
            statusColor: 'text-red-500'
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
        >
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Control Center</h1>
                    <div className="flex items-center text-sm text-gray-500 gap-2">
                        <span>Admin</span>
                        <span>›</span>
                        <span>Dashboard Overview</span>
                    </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search operations..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm border-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700"
                        />
                    </div>
                    <button className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 transition-colors">
                        <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                    </button>
                    <button className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 transition-colors relative">
                        <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-gray-800"></span>
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, idx) => (
                    <Card
                        key={idx}
                        className={`p-6 relative overflow-hidden ${stat.isDark ? 'bg-dark-bg text-white border-none' : 'bg-white'}`}
                        noPadding
                    >
                        {/* Card Content */}
                        <div className="relative z-10 p-6">
                            <div className="flex justify-between items-start mb-6">
                                <div className={`p-3 rounded-xl ${stat.isDark ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                                    <stat.icon className={`w-6 h-6 ${stat.isDark ? 'text-white' : 'text-gray-900'}`} />
                                </div>
                                <span className={`px-2 py-1 text-xs font-bold rounded-full ${stat.isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-50 text-emerald-600'}`}>
                                    {stat.trend}
                                </span>
                            </div>

                            <div>
                                <p className={`text-sm mb-1 ${stat.isDark ? 'text-gray-400' : 'text-gray-500'}`}>{stat.label}</p>
                                <h3 className={`text-4xl font-bold mb-4 ${stat.isDark ? 'text-white' : 'text-gray-900'}`}>{stat.value}</h3>

                                <div className="flex items-center justify-between text-xs">
                                    <span className={`uppercase font-bold tracking-wider ${stat.isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                                        {stat.sub}
                                    </span>
                                </div>

                                {/* Progress Bar for non-dark cards */}
                                {!stat.isDark && stat.progress && (
                                    <div className="mt-3 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full ${stat.color}`}
                                            style={{ width: `${stat.progress}%` }}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Recent Activity Table */}
            <Card className="overflow-hidden">
                <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div>
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Recent Activity</h2>
                        <p className="text-sm text-gray-500">Live booking operations across the platform</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex items-center gap-2">
                            <Filter className="w-4 h-4" /> Filter
                        </Button>
                        <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2">
                            <Download className="w-4 h-4" /> Export CSV
                        </Button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-[#FAF9F6] dark:bg-gray-800/50 text-gray-500 uppercase font-medium tracking-wider">
                            <tr>
                                <th className="px-6 py-4">Client</th>
                                <th className="px-6 py-4">Service Details</th>
                                <th className="px-6 py-4">Provider</th>
                                <th className="px-6 py-4">Amount</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {activities.map((item, idx) => (
                                <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <img src={item.avatar} alt={item.client} className="w-10 h-10 rounded-full object-cover" />
                                            <div>
                                                <p className="font-bold text-gray-900 dark:text-white">{item.client}</p>
                                                <p className="text-xs text-gray-400">{item.clientId}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="font-medium text-gray-900 dark:text-white">{item.service}</p>
                                        <p className="text-xs text-gray-500">{item.type}</p>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                                        {item.provider}
                                    </td>
                                    <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">
                                        {item.amount}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <span className={`w-2 h-2 rounded-full ${item.status === 'COMPLETED' ? 'bg-emerald-500' :
                                                item.status === 'PENDING' ? 'bg-gray-300' : 'bg-red-400'
                                                }`} />
                                            <span className={`text-xs font-bold ${item.statusColor}`}>
                                                {item.status}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-gray-400">
                                            <MoreVertical className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-4 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center text-sm text-gray-500">
                    <p>Showing 1-3 of 1,240 entries</p>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50">‹</button>
                        <button className="px-3 py-1 bg-emerald-600 text-white rounded font-medium">1</button>
                        <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50">2</button>
                        <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50">3</button>
                        <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50">›</button>
                    </div>
                </div>
            </Card>
        </motion.div>
    );
};
