import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Users, Wrench, DollarSign, Download, Search, Activity, ArrowUpRight, ArrowDownRight, MoreVertical } from 'lucide-react';
import { motion } from 'framer-motion';

export const AdminHome = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const stats = [
        {
            label: 'Total Users',
            value: '12,400',
            sub: 'GOAL: 20K ACTIVE',
            trend: '+12.5%',
            trendUp: true,
            icon: Users,
            color: 'text-indigo-600',
            bg: 'bg-indigo-50 dark:bg-indigo-500/10',
            border: 'border-indigo-200 dark:border-indigo-500/20'
        },
        {
            label: 'Total Providers',
            value: '1,200',
            sub: '94% VETTED',
            trend: '+5.2%',
            trendUp: true,
            icon: Wrench,
            color: 'text-orange-600',
            bg: 'bg-orange-50 dark:bg-orange-500/10',
            border: 'border-orange-200 dark:border-orange-500/20'
        },
        {
            label: 'Total Revenue',
            value: '$142,500',
            sub: 'Q4 2023',
            trend: '+18.4%',
            trendUp: true,
            icon: DollarSign,
            color: 'text-emerald-600',
            bg: 'bg-emerald-50 dark:bg-emerald-500/10',
            border: 'border-emerald-200 dark:border-emerald-500/20'
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
            date: '2 min ago'
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
            date: '15 min ago'
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
            date: '1 hour ago'
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
        >
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-display font-bold text-slate-900 dark:text-white">Dashboard Overview</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">
                        Welcome back, Administrator. Here's what's happening today.
                    </p>
                </div>

                <div className="flex gap-3">
                    <Button variant="outline" className="hidden sm:flex bg-white dark:bg-dark-card border-slate-200 dark:border-white/10">
                        <Download className="w-4 h-4 mr-2" />
                        Export Report
                    </Button>
                    <Button className="shadow-lg shadow-primary/25">
                        <Activity className="w-4 h-4 mr-2" />
                        View Live Analytics
                    </Button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="glass dark:glass-dark rounded-[2.5rem] p-8 border border-white/20 shadow-xl shadow-slate-200/50 dark:shadow-none relative overflow-hidden group"
                    >
                        <div className={`absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500`}>
                            <stat.icon className={`w-32 h-32 ${stat.color}`} />
                        </div>

                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-6">
                                <div className={`p-4 rounded-2xl ${stat.bg} ${stat.border} border`}>
                                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                                </div>
                                <div className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold ${stat.trendUp ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400' : 'bg-red-50 text-red-600'}`}>
                                    {stat.trendUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                    {stat.trend}
                                </div>
                            </div>

                            <div>
                                <p className="text-slate-500 dark:text-slate-400 font-medium mb-2">{stat.label}</p>
                                <h3 className="text-4xl font-display font-bold text-slate-900 dark:text-white mb-4 tracking-tight">{stat.value}</h3>
                                <div className="flex items-center gap-2">
                                    <div className="h-1.5 flex-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                        <div className={`h-full rounded-full ${stat.color.replace('text-', 'bg-')}`} style={{ width: '70%' }}></div>
                                    </div>
                                    <span className="text-xs font-bold text-slate-400">{stat.sub}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Recent Activity Table */}
            <div className="glass dark:glass-dark rounded-[2.5rem] p-8 border border-slate-200/50 dark:border-white/5 shadow-xl shadow-slate-200/50 dark:shadow-none">
                <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                        <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white">Recent Activity</h2>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Latest transactions and movements.</p>
                    </div>
                    <div className="relative w-full sm:w-auto">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search activity..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full sm:w-64 pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900/50 border-none rounded-xl focus:ring-2 focus:ring-primary/20 text-slate-900 dark:text-white placeholder-slate-400 transition-all font-medium text-sm"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-200 dark:border-white/5 text-left">
                                <th className="pb-4 pl-4 font-display font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">Client</th>
                                <th className="pb-4 font-display font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">Service</th>
                                <th className="pb-4 font-display font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">Provider</th>
                                <th className="pb-4 font-display font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">Amount</th>
                                <th className="pb-4 font-display font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">Status</th>
                                <th className="pb-4 pr-4 text-right font-display font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                            {activities.map((item, idx) => (
                                <tr key={idx} className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                                    <td className="py-4 pl-4">
                                        <div className="flex items-center gap-3">
                                            <img src={item.avatar} alt={item.client} className="w-10 h-10 rounded-xl object-cover ring-2 ring-white dark:ring-white/10 shadow-sm" />
                                            <div>
                                                <p className="font-bold text-slate-900 dark:text-white text-sm">{item.client}</p>
                                                <p className="text-xs text-slate-500 font-medium">{item.clientId}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4">
                                        <p className="font-medium text-slate-900 dark:text-white text-sm">{item.service}</p>
                                        <p className="text-xs text-slate-500">{item.type}</p>
                                    </td>
                                    <td className="py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                                <Wrench className="w-3 h-3 text-slate-500" />
                                            </div>
                                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">{item.provider}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 font-bold text-slate-900 dark:text-white">
                                        {item.amount}
                                    </td>
                                    <td className="py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-lg border ${item.status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20' :
                                                item.status === 'PENDING' ? 'bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20' :
                                                    'bg-rose-50 text-rose-600 border-rose-100 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20'
                                            }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${item.status === 'COMPLETED' ? 'bg-emerald-500' :
                                                    item.status === 'PENDING' ? 'bg-amber-500' :
                                                        'bg-rose-500'
                                                }`}></span>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="py-4 pr-4 text-right">
                                        <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-primary transition-colors">
                                            <MoreVertical className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </motion.div>
    );
};
