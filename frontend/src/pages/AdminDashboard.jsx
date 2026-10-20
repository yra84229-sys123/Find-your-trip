import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    BarChart3, Users, CalendarDays, Mail, MapPin, 
    TrendingUp, Shield, Settings, Sliders, LogOut, 
    Check, X, Trash2, ArrowLeft, Download, Database
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AdminDashboard() {
    const { user, logout, bookings: authBookings } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');

    const [bookings, setBookings] = useState([
        { id: "mock-1", userName: "Sopheap Khorn", userEmail: "sopheap@gmail.com", service: "Angkor Wat Sunrise Guided Tour", date: "2026-08-15", status: "confirmed" },
        { id: "mock-2", userName: "Minea Chan", userEmail: "minea@gmail.com", service: "Song Saa Private Island Luxury Stay", date: "2026-09-02", status: "pending" },
        { id: "mock-3", userName: "Borey Seng", userEmail: "borey@gmail.com", service: "Phnom Penh Historical Walking Tour", date: "2026-08-20", status: "cancelled" },
        { id: "mock-4", userName: "Dara Ouk", userEmail: "dara.ouk@luxury.com", service: "Kep Sailing Club Dining & Sunset", date: "2026-08-25", status: "confirmed" }
    ]);

    const [messages, setMessages] = useState([
        { id: "mock-msg-1", senderName: "Sopheap Khorn", senderEmail: "sopheap@gmail.com", subject: "Airport pickup service request", text: "Hi, I have booked the Angkor Wat Sunrise Tour. Can you arrange an airport shuttle for us on arrival?", date: "2026-10-05 14:30" },
        { id: "mock-msg-2", senderName: "Minea Chan", senderEmail: "minea@gmail.com", subject: "Special dietary request details", text: "Hello! We are staying at Song Saa Private Island next month. One of us is vegan. Could you please confirm if vegan meals are covered?", date: "2026-10-04 11:15" },
        { id: "mock-msg-3", senderName: "Dara Ouk", senderEmail: "dara.ouk@luxury.com", subject: "Confirm booking status update", text: "Please confirm our table reservation at Kep Sailing Club. Thank you!", date: "2026-10-02 09:40" }
    ]);

    const [systemUsers, setSystemUsers] = useState([
        { id: "u-1", displayName: "Yu Ra (Admin)", email: "yra84229@gmail.com", role: "admin", status: "Active" },
        { id: "u-2", displayName: "Sopheap Khorn", email: "sopheap@gmail.com", role: "user", status: "Active" },
        { id: "u-3", displayName: "Minea Chan", email: "minea@gmail.com", role: "user", status: "Active" },
        { id: "u-4", displayName: "Borey Seng", email: "borey@gmail.com", role: "user", status: "Active" }
    ]);

    const handleUpdateBookingStatus = (id, newStatus) => {
        setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));
    };

    const handleDeleteBooking = (id) => {
        if (window.confirm("Are you sure you want to delete this booking record?")) {
            setBookings(prev => prev.filter(b => b.id !== id));
        }
    };

    const handleDeleteMessage = (id) => {
        if (window.confirm("Delete this message?")) {
            setMessages(prev => prev.filter(m => m.id !== id));
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const totalBookings = bookings.length;
    const pendingBookings = bookings.filter(b => b.status === 'pending').length;
    const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length;

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-slate-900 border-r border-slate-800 p-6 flex flex-col justify-between shrink-0">
                <div className="space-y-6">
                    <Link to="/" className="flex items-center gap-2.5 text-orange-500 font-extrabold text-xl tracking-wider">
                        <Shield className="w-6 h-6" />
                        <span>TOURLY ADMIN</span>
                    </Link>

                    <nav className="space-y-1">
                        <button
                            onClick={() => setActiveTab('overview')}
                            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                                activeTab === 'overview' ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                            }`}
                        >
                            <BarChart3 className="w-4 h-4" />
                            <span>Overview</span>
                        </button>

                        <button
                            onClick={() => setActiveTab('users')}
                            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                                activeTab === 'users' ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                            }`}
                        >
                            <Users className="w-4 h-4" />
                            <span>Manage Users</span>
                        </button>

                        <button
                            onClick={() => setActiveTab('bookings')}
                            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                                activeTab === 'bookings' ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                            }`}
                        >
                            <CalendarDays className="w-4 h-4" />
                            <span>Manage Bookings</span>
                        </button>

                        <button
                            onClick={() => setActiveTab('messages')}
                            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                                activeTab === 'messages' ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                            }`}
                        >
                            <Mail className="w-4 h-4" />
                            <span>Support Messages</span>
                        </button>

                        <button
                            onClick={() => setActiveTab('destinations')}
                            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                                activeTab === 'destinations' ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                            }`}
                        >
                            <MapPin className="w-4 h-4" />
                            <span>Destinations</span>
                        </button>

                        <button
                            onClick={() => setActiveTab('settings')}
                            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                                activeTab === 'settings' ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                            }`}
                        >
                            <Settings className="w-4 h-4" />
                            <span>Settings</span>
                        </button>
                    </nav>
                </div>

                <div className="pt-6 border-t border-slate-800 space-y-2">
                    <Link
                        to="/"
                        className="w-full flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:bg-slate-800 hover:text-white transition-all"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back to Website</span>
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-500/10 transition-all"
                    >
                        <LogOut className="w-4 h-4" />
                        <span>Log Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Panel */}
            <main className="flex-1 p-6 md:p-10 space-y-8 overflow-y-auto">
                <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
                    <div>
                        <h1 className="text-2xl font-black text-white">Operations Command Center</h1>
                        <p className="text-xs text-slate-400">Live analytics, bookings, and traveler account management</p>
                    </div>
                    <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 px-4 py-2 rounded-2xl">
                        <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center font-bold text-white text-xs">
                            {(user?.name || 'A').charAt(0)}
                        </div>
                        <div className="text-left">
                            <div className="text-xs font-bold text-white">{user?.name || 'Admin'}</div>
                            <div className="text-[10px] text-orange-400 uppercase font-semibold">Super Administrator</div>
                        </div>
                    </div>
                </header>

                {/* OVERVIEW TAB */}
                {activeTab === 'overview' && (
                    <div className="space-y-8">
                        {/* Metrics Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 relative overflow-hidden">
                                <div className="text-xs font-bold text-slate-400 uppercase">Total Reservations</div>
                                <div className="text-3xl font-black text-white mt-2">{totalBookings}</div>
                                <div className="text-xs text-emerald-400 font-semibold mt-3 flex items-center gap-1">
                                    <TrendingUp className="w-3.5 h-3.5" /> +15% this month
                                </div>
                            </div>
                            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 relative overflow-hidden">
                                <div className="text-xs font-bold text-slate-400 uppercase">Pending Review</div>
                                <div className="text-3xl font-black text-amber-400 mt-2">{pendingBookings}</div>
                                <div className="text-xs text-slate-400 font-semibold mt-3">Awaiting confirmation</div>
                            </div>
                            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 relative overflow-hidden">
                                <div className="text-xs font-bold text-slate-400 uppercase">Confirmed Trips</div>
                                <div className="text-3xl font-black text-teal-400 mt-2">{confirmedBookings}</div>
                                <div className="text-xs text-emerald-400 font-semibold mt-3 flex items-center gap-1">
                                    <TrendingUp className="w-3.5 h-3.5" /> High completion rate
                                </div>
                            </div>
                            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 relative overflow-hidden">
                                <div className="text-xs font-bold text-slate-400 uppercase">Inquiries Received</div>
                                <div className="text-3xl font-black text-purple-400 mt-2">{messages.length}</div>
                                <div className="text-xs text-purple-300 font-semibold mt-3">Support tickets open</div>
                            </div>
                        </div>

                        {/* Recent Bookings Snapshot */}
                        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
                            <h2 className="text-lg font-bold text-white mb-4">Latest Booking Requests</h2>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-xs">
                                    <thead className="text-slate-400 border-b border-slate-800 uppercase text-[10px]">
                                        <tr>
                                            <th className="py-3">Traveler</th>
                                            <th className="py-3">Tour / Package</th>
                                            <th className="py-3">Date</th>
                                            <th className="py-3">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-800/60">
                                        {bookings.slice(0, 3).map(b => (
                                            <tr key={b.id}>
                                                <td className="py-3 font-semibold text-white">{b.userName}</td>
                                                <td className="py-3 text-slate-300">{b.service}</td>
                                                <td className="py-3 text-slate-400">{b.date}</td>
                                                <td className="py-3">
                                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                                        b.status === 'confirmed' ? 'bg-emerald-500/20 text-emerald-300' :
                                                        b.status === 'cancelled' ? 'bg-rose-500/20 text-rose-300' :
                                                        'bg-amber-500/20 text-amber-300'
                                                    }`}>
                                                        {b.status.toUpperCase()}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* USERS TAB */}
                {activeTab === 'users' && (
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-bold text-white">Registered Users</h2>
                            <span className="text-xs text-slate-400">{systemUsers.length} accounts found</span>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs">
                                <thead className="text-slate-400 border-b border-slate-800 uppercase text-[10px]">
                                    <tr>
                                        <th className="py-3">Name</th>
                                        <th className="py-3">Email</th>
                                        <th className="py-3">Role</th>
                                        <th className="py-3">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800/60">
                                    {systemUsers.map(u => (
                                        <tr key={u.id}>
                                            <td className="py-3 font-semibold text-white">{u.displayName}</td>
                                            <td className="py-3 text-slate-300">{u.email}</td>
                                            <td className="py-3">
                                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${u.role === 'admin' ? 'bg-orange-500/20 text-orange-400' : 'bg-slate-700 text-slate-300'}`}>
                                                    {u.role.toUpperCase()}
                                                </span>
                                            </td>
                                            <td className="py-3 text-emerald-400 font-semibold">{u.status}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* BOOKINGS TAB */}
                {activeTab === 'bookings' && (
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-bold text-white">Manage All Bookings</h2>
                            <span className="text-xs text-slate-400">{bookings.length} reservations</span>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs">
                                <thead className="text-slate-400 border-b border-slate-800 uppercase text-[10px]">
                                    <tr>
                                        <th className="py-3">Client</th>
                                        <th className="py-3">Tour / Package</th>
                                        <th className="py-3">Travel Date</th>
                                        <th className="py-3">Status</th>
                                        <th className="py-3 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800/60">
                                    {bookings.map(b => (
                                        <tr key={b.id}>
                                            <td className="py-3">
                                                <div className="font-bold text-white">{b.userName}</div>
                                                <div className="text-[10px] text-slate-400">{b.userEmail}</div>
                                            </td>
                                            <td className="py-3 text-slate-300 font-medium">{b.service}</td>
                                            <td className="py-3 text-slate-400">{b.date}</td>
                                            <td className="py-3">
                                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                                    b.status === 'confirmed' ? 'bg-emerald-500/20 text-emerald-300' :
                                                    b.status === 'cancelled' ? 'bg-rose-500/20 text-rose-300' :
                                                    'bg-amber-500/20 text-amber-300'
                                                }`}>
                                                    {b.status.toUpperCase()}
                                                </span>
                                            </td>
                                            <td className="py-3 text-right">
                                                <div className="flex items-center justify-end gap-1.5">
                                                    {b.status !== 'confirmed' && (
                                                        <button
                                                            onClick={() => handleUpdateBookingStatus(b.id, 'confirmed')}
                                                            title="Confirm Booking"
                                                            className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/40 transition-colors"
                                                        >
                                                            <Check className="w-3.5 h-3.5" />
                                                        </button>
                                                    )}
                                                    {b.status !== 'cancelled' && (
                                                        <button
                                                            onClick={() => handleUpdateBookingStatus(b.id, 'cancelled')}
                                                            title="Cancel Booking"
                                                            className="p-1.5 rounded-lg bg-amber-500/20 text-amber-300 hover:bg-amber-500/40 transition-colors"
                                                        >
                                                            <X className="w-3.5 h-3.5" />
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() => handleDeleteBooking(b.id)}
                                                        title="Delete Record"
                                                        className="p-1.5 rounded-lg bg-rose-500/20 text-rose-300 hover:bg-rose-500/40 transition-colors"
                                                    >
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* MESSAGES TAB */}
                {activeTab === 'messages' && (
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
                        <h2 className="text-lg font-bold text-white">Client Messages & Inquiries</h2>
                        <div className="grid grid-cols-1 gap-4">
                            {messages.map(m => (
                                <div key={m.id} className="p-4 bg-slate-950/60 border border-slate-800 rounded-2xl relative space-y-2">
                                    <div className="flex items-center justify-between">
                                        <div className="font-bold text-white text-sm">{m.senderName} <span className="text-xs text-slate-400 font-normal">({m.senderEmail})</span></div>
                                        <span className="text-[10px] text-slate-500">{m.date}</span>
                                    </div>
                                    <div className="text-xs font-semibold text-orange-400">{m.subject}</div>
                                    <p className="text-xs text-slate-300 leading-relaxed pr-8">{m.text}</p>
                                    <button
                                        onClick={() => handleDeleteMessage(m.id)}
                                        className="absolute bottom-4 right-4 p-1.5 rounded-lg bg-rose-500/20 text-rose-300 hover:bg-rose-500/40"
                                        title="Delete Message"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* DESTINATIONS TAB */}
                {activeTab === 'destinations' && (
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
                        <h2 className="text-lg font-bold text-white">Featured Destinations Catalog</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                                <h3 className="font-bold text-white text-sm">Angkor Wat Heritage</h3>
                                <p className="text-xs text-slate-400 mt-1">Siem Reap • 12 Active Tours</p>
                                <div className="text-orange-400 font-bold text-sm mt-3">$99 / day</div>
                            </div>
                            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                                <h3 className="font-bold text-white text-sm">Koh Rong Islands</h3>
                                <p className="text-xs text-slate-400 mt-1">Sihanoukville • 8 Active Tours</p>
                                <div className="text-orange-400 font-bold text-sm mt-3">$145 / day</div>
                            </div>
                            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                                <h3 className="font-bold text-white text-sm">Bokor Mountain Trek</h3>
                                <p className="text-xs text-slate-400 mt-1">Kampot • 4 Active Tours</p>
                                <div className="text-orange-400 font-bold text-sm mt-3">$65 / day</div>
                            </div>
                        </div>
                    </div>
                )}

                {/* SETTINGS TAB */}
                {activeTab === 'settings' && (
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-xl space-y-5">
                        <h2 className="text-lg font-bold text-white">System Settings</h2>
                        <div className="space-y-4 text-xs">
                            <div>
                                <label className="block text-slate-400 mb-1 font-semibold">Operational Currency</label>
                                <select className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white outline-none">
                                    <option value="USD">USD ($)</option>
                                    <option value="KHR">KHR (៛)</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-slate-400 mb-1 font-semibold">System Backup</label>
                                <button
                                    onClick={() => alert("Database backup snapshot generated successfully!")}
                                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl flex items-center gap-2 font-semibold"
                                >
                                    <Database className="w-3.5 h-3.5" />
                                    <span>Create Instant Backup</span>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
