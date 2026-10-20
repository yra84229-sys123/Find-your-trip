import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Destinations from './pages/Destinations';
import TripPlanner from './pages/TripPlanner';
import Calculator from './pages/Calculator';
import Packages from './pages/Packages';
import HiddenGems from './pages/HiddenGems';
import Booking from './pages/Booking';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';

function ScrollToTop() {
    const { pathname } = React.useMemo(() => window.location, []);
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
}

export default function App() {
    return (
        <ThemeProvider>
            <LanguageProvider>
                <AuthProvider>
                    <Router>
                        <ScrollToTop />
                        <div className="app-container">
                            <Navbar />
                            <main>
                                <Routes>
                                    <Route path="/" element={<Home />} />
                                    <Route path="/destinations" element={<Destinations />} />
                                    <Route path="/trip-planner" element={<TripPlanner />} />
                                    <Route path="/calculator" element={<Calculator />} />
                                    <Route path="/packages" element={<Packages />} />
                                    <Route path="/hidden-gems" element={<HiddenGems />} />
                                    <Route path="/booking" element={<Booking />} />
                                    <Route path="/settings" element={<Navigate to="/" replace />} />
                                    <Route path="/about" element={<About />} />
                                    <Route path="/contact" element={<Contact />} />
                                    <Route path="/login" element={<Login />} />
                                    <Route path="/register" element={<Register />} />
                                    <Route path="/dashboard" element={<UserDashboard />} />
                                    <Route path="/user-dashboard" element={<Navigate to="/dashboard" replace />} />
                                    <Route path="/admin" element={<AdminDashboard />} />
                                    <Route path="/admin-dashboard" element={<Navigate to="/admin" replace />} />
                                    <Route path="*" element={<Navigate to="/" replace />} />
                                </Routes>
                            </main>
                            <Footer />
                        </div>
                    </Router>
                </AuthProvider>
            </LanguageProvider>
        </ThemeProvider>
    );
}
