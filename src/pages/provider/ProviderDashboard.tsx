import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../stores/useAuthStore';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { mockStats, mockBookingRequests, mockAgenda } from '../../data/mockData';
import { DollarSign, Star, CheckCircle, ChevronRight, MapPin, Clock, X, Check } from 'lucide-react';
import { clsx } from 'clsx';

export const ProviderDashboard = () => {
    const { user } = useAuthStore();
    const [stats] = useState(mockStats);
    const [bookings, setBookings] = useState(mockBookingRequests);

    const handleAction = (id: string, action: 'accept' | 'reject') => {
        setBookings(prev => prev.filter(b => b.id !== id));
        // In a real app, API call here
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
        >
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Good morning, {user?.name?.split(' ')[0] || 'Provider'}
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                        You have <span className="font-semibold text-primary">{bookings.length} new booking requests</span> for today.
                    </p>
                </div>
                <Button className="bg-primary hover:bg-primary-hover text-white shadow-lg shadow-primary/20">
                    Promote Profile
                </Button>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card hover className="p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-primary/10 text-primary rounded-xl">
                            <DollarSign className="w-6 h-6" />
                        </div>
                        <span className="px-2 py-1 bg-primary/5 text-primary text-xs font-bold rounded-lg">
                            {stats.revenueGrowth}
                        </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Earnings</p>
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{stats.revenue}</h3>
                </Card>

                <Card hover className="p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-accent/10 text-accent rounded-xl">
                            <Star className="w-6 h-6" />
                        </div>
                        <span className="px-2 py-1 bg-accent/5 text-accent text-xs font-bold rounded-lg">
                            {stats.ratingGrowth}
                        </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Avg Rating</p>
                    <div className="flex items-baseline gap-2">
                        <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{stats.avgRating}</h3>
                        <span className="text-gray-400 text-sm">/ 5.0</span>
                    </div>
                </Card>

                <Card hover className="p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-secondary/20 text-nature-800 dark:text-nature-100 rounded-xl">
                            <CheckCircle className="w-6 h-6" />
                        </div>
                        <span className="px-2 py-1 bg-secondary/10 text-nature-800 dark:text-nature-100 text-xs font-bold rounded-lg">
                            {stats.jobsGrowth}
                        </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Completed Jobs</p>
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{stats.completedJobs}</h3>
                </Card>
            </div>

            {/* Main Content Info */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Chart Area */}
                <div className="lg:col-span-2 space-y-8">
                    <Card className="p-6 min-h-[350px]">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Weekly Revenue</h3>
                            <select className="bg-gray-50 dark:bg-gray-800 border-none text-sm rounded-lg px-3 py-1 text-gray-500">
                                <option>This Week</option>
                                <option>Last Week</option>
                            </select>
                        </div>
                        <div className="relative h-64 w-full flex items-end justify-between gap-2">
                            {/* Simple CSS Chart Visualization */}
                            <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible">
                                <defs>
                                    <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                                        <stop offset="0%" stopColor="#10B981" stopOpacity="0.2" />
                                        <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                                    </linearGradient>
                                </defs>
                                <path
                                    d="M0,40 C10,35 20,20 30,25 C40,28 50,15 60,18 C70,22 80,10 90,12 C95,13 100,40 100,40 L0,40 Z"
                                    fill="url(#gradient)"
                                />
                                <path
                                    d="M0,40 C10,35 20,20 30,25 C40,28 50,15 60,18 C70,22 80,10 90,12"
                                    fill="none"
                                    stroke="#727D71"
                                    strokeWidth="1"
                                    strokeLinecap="round"
                                />
                            </svg>
                            <div className="absolute bottom-0 w-full flex justify-between text-xs text-gray-400 pb-2">
                                <span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span><span>SUN</span>
                            </div>
                        </div>
                    </Card>

                    {/* Booking Requests */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">New Booking Requests</h3>
                            <button className="text-sm text-primary font-medium hover:underline">View All</button>
                        </div>
                        <div className="space-y-4">
                            {bookings.map((booking) => (
                                <Card key={booking.id} className="p-4 flex flex-col sm:flex-row items-center gap-4">
                                    <img src={booking.clientAvatar} alt={booking.clientName} className="w-12 h-12 rounded-full object-cover" />
                                    <div className="flex-1 text-center sm:text-left">
                                        <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                                            <h4 className="font-bold text-gray-900 dark:text-white">{booking.clientName}</h4>
                                            {booking.isNew && (
                                                <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full">NEW</span>
                                            )}
                                        </div>
                                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{booking.service}</p>
                                        <div className="flex items-center justify-center sm:justify-start gap-4 text-xs text-gray-500">
                                            <div className="flex items-center gap-1">
                                                <MapPin className="w-3 h-3" />
                                                {booking.location}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                {booking.time}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-center sm:text-right">
                                        <p className="text-xl font-bold text-gray-900 dark:text-white mb-3">${booking.price}</p>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleAction(booking.id, 'reject')}
                                                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-red-50 hover:text-red-500 transition-colors"
                                            >
                                                <X className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => handleAction(booking.id, 'accept')}
                                                className="px-4 py-2 rounded-lg bg-primary text-white font-medium hover:bg-primary-hover transition-colors flex items-center gap-2"
                                            >
                                                <Check className="w-4 h-4" />
                                                Accept
                                            </button>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Sidebar - Agenda */}
                <div className="space-y-6">
                    <Card className="p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Today's Agenda</h3>
                            <div className="flex gap-1">
                                <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"><ChevronRight className="w-4 h-4 rotate-180" /></button>
                                <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"><ChevronRight className="w-4 h-4" /></button>
                            </div>
                        </div>

                        {/* Calendar Strip */}
                        <div className="flex justify-between mb-8 border-b border-gray-100 dark:border-gray-800 pb-4">
                            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                                <div key={i} className="flex flex-col items-center gap-2">
                                    <span className="text-xs text-gray-400">{day}</span>
                                    <span
                                        className={clsx(
                                            "w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium",
                                            day === 'T' && i === 3 // Mock active day
                                                ? "bg-primary text-white shadow-lg shadow-primary/30"
                                                : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                                        )}
                                    >
                                        {26 + i > 30 ? (26 + i) - 30 : 26 + i}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-4">
                            {mockAgenda.map((item) => (
                                <div key={item.id} className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-transparent hover:border-gray-200 dark:hover:border-gray-700 transition-all cursor-pointer">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-md">
                                            {item.time}
                                        </span>
                                        <span className="text-xs text-gray-400">#{item.id}</span>
                                    </div>
                                    <h4 className="font-bold text-gray-900 dark:text-white mb-1">{item.title}</h4>
                                    <p className="text-xs text-gray-500 flex items-center gap-1">
                                        <MapPin className="w-3 h-3" />
                                        {item.address}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <Button variant="outline" className="w-full mt-6 border-dashed border-2">
                            + Add Task
                        </Button>
                    </Card>
                </div>
            </div>
        </motion.div>
    );
};
