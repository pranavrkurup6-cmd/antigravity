import React from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '../components/layout/Navbar';
import { Button } from '../components/ui/Button';
import { ArrowRight, Star, Shield, Clock, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';

// Icons for services
import { Wrench, Zap, Droplets, Hammer } from 'lucide-react';

export const Landing = () => {
    const { isAuthenticated } = useAuthStore();

    return (
        <div className="min-h-screen bg-nature-50 text-gray-900 font-sans selection:bg-primary/20">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 border border-stone-200 text-xs font-bold tracking-wide text-stone-600 uppercase">
                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                            Trusted network in your city
                        </div>

                        <h1 className="text-5xl md:text-7xl font-serif font-bold leading-[1.1] text-nature-900">
                            Find <span className="text-primary italic">trusted</span> professionals near you
                        </h1>

                        <p className="text-xl text-stone-600 max-w-lg leading-relaxed">
                            The premium platform for mindful home maintenance, specialized repairs, and boutique cleaning services.
                        </p>

                        <div className="relative max-w-md">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="What service do you need?"
                                className="w-full pl-12 pr-32 py-4 rounded-2xl bg-white shadow-soft border-none focus:ring-2 focus:ring-primary/20 text-lg placeholder:text-gray-400"
                            />
                            <button className="absolute right-2 top-2 bottom-2 px-6 bg-nature-800 text-white rounded-xl font-medium hover:bg-nature-900 transition-colors">
                                Search
                            </button>
                        </div>

                        <div className="flex items-center gap-4 pt-4">
                            <div className="flex -space-x-3">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-nature-50 bg-stone-200 overflow-hidden">
                                        <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>
                            <div className="text-sm font-medium text-stone-600">
                                Joined by <span className="font-bold text-nature-900">50,000+</span> happy homeowners
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="relative rounded-[3rem] overflow-hidden shadow-2xl aspectRatio-[4/5] h-[600px]">
                            <img
                                src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                alt="Modern Interior"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

                            {/* Floating Card */}
                            <div className="absolute bottom-8 left-8 p-4 bg-white/90 backdrop-blur-md rounded-2xl border border-white/50 shadow-lg max-w-xs">
                                <p className="text-xs font-bold text-stone-500 mb-2 uppercase tracking-wider">Featured Pro</p>
                                <div className="flex items-center gap-3">
                                    <img
                                        src="https://images.unsplash.com/photo-1540569014015-19a7be504e3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                                        alt="Pro"
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                    <div>
                                        <h4 className="font-bold text-nature-900">Alex Johnson</h4>
                                        <p className="text-xs text-stone-600">Master Plumber • 12 years exp.</p>
                                        <div className="flex gap-0.5 mt-1">
                                            {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Popular Services */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-4xl font-serif font-bold text-nature-900 mb-4">Popular Services</h2>
                            <p className="text-stone-600 max-w-md">Exceptional care for your sanctuary. Book our most requested professionals.</p>
                        </div>
                        <Link to="/services" className="text-primary font-medium hover:tracking-wide transition-all flex items-center gap-2">
                            Explore all services <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[
                            { name: 'Plumbing', icon: Droplets, desc: 'Leak repair, fixtures', bg: 'bg-emerald-50' },
                            { name: 'Electrical', icon: Zap, desc: 'Smart home, lighting', bg: 'bg-amber-50' },
                            { name: 'Cleaning', icon: Star, desc: 'Deep clean, boutique', bg: 'bg-blue-50' }, // Reusing Star as generic clean icon or similar
                            { name: 'Gardening', icon: Hammer, desc: 'Landscape design', bg: 'bg-stone-100' }, // Hammer as placeholder for tools
                        ].map((s, idx) => (
                            <div key={idx} className={`p-8 rounded-[2rem] ${s.bg} hover:shadow-lg transition-all cursor-pointer group`}>
                                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                                    <s.icon className="w-6 h-6 text-nature-800" />
                                </div>
                                <h3 className="text-xl font-bold text-nature-900 mb-2">{s.name}</h3>
                                <p className="text-stone-600 text-sm">{s.desc}</p>
                                <p className="mt-6 text-xs font-bold text-stone-400 uppercase tracking-wider">120+ Specialists</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Standard Section */}
            <section className="py-24 bg-nature-50">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h2 className="text-4xl font-serif font-bold text-nature-900 mb-6">The LocalFix Standard</h2>
                    <p className="text-stone-600 max-w-md mx-auto mb-16">A curated experience for the modern homeowner who values peace of mind and quality craftsmanship.</p>

                    <div className="grid md:grid-cols-3 gap-12">
                        {[
                            { title: 'Elite Verified Pros', desc: 'Rigorous background checks and artisanal skill assessments for every partner.', icon: Shield },
                            { title: 'Mindful Booking', desc: 'Respectful scheduling that works around your lifestyle.', icon: Clock },
                            { title: 'Guaranteed Serenity', desc: 'Full insurance and satisfaction pledge. If it\'s not perfect, we\'ll restore the balance.', icon: Star }
                        ].map((item, idx) => (
                            <div key={idx} className="flex flex-col items-center">
                                <div className="w-16 h-16 bg-stone-200 rounded-2xl flex items-center justify-center mb-6 text-nature-800">
                                    <item.icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold text-nature-900 mb-3">{item.title}</h3>
                                <p className="text-stone-600 text-sm leading-relaxed max-w-xs">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto rounded-[3rem] bg-nature-800 text-nature-50 px-8 py-20 text-center relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
                            A calm home is just <span className="text-emerald-300 italic">one click</span> away
                        </h2>
                        <p className="text-nature-200 mb-10 max-w-xl mx-auto">
                            Join 50,000+ homeowners who have found a simpler, more beautiful way to maintain their property.
                        </p>
                        <div className="flex justify-center gap-4">
                            <Link to="/signup">
                                <button className="px-8 py-4 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-500 transition-colors shadow-lg">
                                    Find Your Professional
                                </button>
                            </Link>
                            <button className="px-8 py-4 bg-transparent border border-nature-600 text-nature-100 rounded-xl font-bold hover:bg-nature-700 transition-colors">
                                Partner With Us
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Simple Footer */}
            <footer className="bg-nature-900 text-nature-200 py-12">
                <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-sm opacity-60">
                    <p>© 2024 LocalFix Inc. All rights reserved.</p>
                    <p>Designed for better living.</p>
                </div>
            </footer>
        </div>
    );
};
