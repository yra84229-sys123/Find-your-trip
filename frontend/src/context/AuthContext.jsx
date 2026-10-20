import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
    signInWithEmailAndPassword, 
    signInWithPopup, 
    createUserWithEmailAndPassword,
    updateProfile as updateFirebaseProfile,
    signOut,
    onAuthStateChanged
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db, googleProvider } from '../firebase';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const [bookings, setBookings] = useState(() => {
        try {
            const stored = localStorage.getItem('fyt-bookings');
            return stored ? JSON.parse(stored) : [];
        } catch (e) {
            return [];
        }
    });

    const [savedTrips, setSavedTrips] = useState(() => {
        try {
            const stored = localStorage.getItem('fyt-saved-trips');
            return stored ? JSON.parse(stored) : [];
        } catch (e) {
            return [];
        }
    });

    // Listen to Firebase Auth state change
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                const name = firebaseUser.displayName || firebaseUser.email.split('@')[0];
                const avatar = firebaseUser.photoURL || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`;
                const role = (firebaseUser.email === 'admin@gmail.com' || firebaseUser.email?.includes('admin')) ? 'Admin' : 'Traveler';

                const userData = {
                    uid: firebaseUser.uid,
                    name: name,
                    email: firebaseUser.email,
                    photoURL: firebaseUser.photoURL,
                    avatar: avatar,
                    role: role,
                    phone: firebaseUser.phoneNumber || '+855 12 345 678',
                    location: 'Phnom Penh, Cambodia'
                };

                setUser(userData);
                localStorage.setItem('fyt-user', JSON.stringify(userData));

                // Save or sync to Firestore
                try {
                    await setDoc(doc(db, "users", firebaseUser.uid), {
                        uid: firebaseUser.uid,
                        email: firebaseUser.email,
                        displayName: name,
                        photoURL: firebaseUser.photoURL || null,
                        role: role.toLowerCase(),
                        status: 'Active',
                        lastLogin: serverTimestamp()
                    }, { merge: true });
                } catch (err) {
                    console.warn("Firestore sync skipped:", err.message);
                }
            } else {
                setUser(null);
                localStorage.removeItem('fyt-user');
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        localStorage.setItem('fyt-bookings', JSON.stringify(bookings));
    }, [bookings]);

    useEffect(() => {
        localStorage.setItem('fyt-saved-trips', JSON.stringify(savedTrips));
    }, [savedTrips]);

    /**
     * Firebase Email & Password Login
     */
    const login = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password);
            return { success: true, user: userCredential.user };
        } catch (error) {
            let msg = error.message;
            if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
                // Automatically register the account if it does not exist yet
                try {
                    const regRes = await register(email.split('@')[0], email.trim(), password);
                    if (regRes.success) {
                        return { success: true, user: regRes.user };
                    }
                } catch (autoErr) {
                    console.warn("Auto-register fallback error:", autoErr);
                }
                msg = 'Incorrect email or password. Please try again.';
            } else if (error.code === 'auth/invalid-email') {
                msg = 'Invalid email address format.';
            }
            return { success: false, error: msg };
        }
    };

    /**
     * Firebase Google Popup Sign-In
     */
    const loginWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const fbUser = result.user;

            // Sync with Firestore
            try {
                await setDoc(doc(db, "users", fbUser.uid), {
                    uid: fbUser.uid,
                    email: fbUser.email,
                    displayName: fbUser.displayName || fbUser.email.split('@')[0],
                    photoURL: fbUser.photoURL || null,
                    role: fbUser.email === 'admin@gmail.com' ? 'admin' : 'user',
                    status: 'Active',
                    lastLogin: serverTimestamp()
                }, { merge: true });
            } catch (err) {
                console.warn("Firestore user sync error:", err);
            }

            return { success: true, user: fbUser };
        } catch (error) {
            console.error("Google Auth Error:", error);
            if (error.code === 'auth/unauthorized-domain') {
                return { 
                    success: false, 
                    code: 'auth/unauthorized-domain',
                    error: 'Firebase: Error (auth/unauthorized-domain). Local domain is not yet whitelisted in Firebase Console.' 
                };
            }
            return { success: false, error: error.message };
        }
    };

    /**
     * Fallback for Google sign-in when localhost is not yet in Firebase Console authorized domains
     */
    const loginWithLocalGoogle = (email, name) => {
        const cleanEmail = (email || '').trim();
        if (!cleanEmail) return { success: false, error: 'Please enter a valid Gmail address.' };

        const baseName = name?.trim() || cleanEmail.split('@')[0].replace(/[._-]/g, ' ');
        const formattedName = baseName.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

        const localUser = {
            uid: `google-${Date.now()}`,
            name: formattedName,
            email: cleanEmail,
            photoURL: null,
            avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(formattedName)}`,
            role: cleanEmail.includes('admin') ? 'Admin' : 'Traveler',
            phone: '+855 12 345 678',
            location: 'Phnom Penh, Cambodia',
            authProvider: 'Google'
        };

        setUser(localUser);
        localStorage.setItem('fyt-user', JSON.stringify(localUser));
        return { success: true, user: localUser };
    };

    /**
     * Firebase Create Account (Register)
     */
    const register = async (name, email, password) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
            const fbUser = userCredential.user;

            if (name) {
                await updateFirebaseProfile(fbUser, { displayName: name.trim() });
            }

            try {
                await setDoc(doc(db, "users", fbUser.uid), {
                    uid: fbUser.uid,
                    email: fbUser.email,
                    displayName: name?.trim() || email.split('@')[0],
                    role: email === 'admin@gmail.com' ? 'admin' : 'user',
                    status: 'Active',
                    createdAt: serverTimestamp(),
                    lastLogin: serverTimestamp()
                }, { merge: true });
            } catch (err) {
                console.warn("Firestore user creation error:", err);
            }

            return { success: true, user: fbUser };
        } catch (error) {
            let msg = error.message;
            if (error.code === 'auth/email-already-in-use') {
                msg = 'This email is already registered. Please login instead.';
            } else if (error.code === 'auth/weak-password') {
                msg = 'Password should be at least 6 characters.';
            }
            return { success: false, error: msg };
        }
    };

    /**
     * Sign Out
     */
    const logout = async () => {
        try {
            await signOut(auth);
            setUser(null);
        } catch (e) {
            console.error("Sign out error", e);
        }
    };

    /**
     * Update Profile
     */
    const updateProfile = (updatedData) => {
        setUser(prev => ({ ...prev, ...updatedData }));
    };

    const addBooking = (bookingData) => {
        const newBooking = {
            id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
            createdAt: new Date().toISOString(),
            status: 'Confirmed',
            ...bookingData
        };
        setBookings(prev => [newBooking, ...prev]);
        return newBooking;
    };

    const saveTrip = (tripData) => {
        const newTrip = {
            id: `TRIP-${Date.now()}`,
            createdAt: new Date().toLocaleDateString(),
            ...tripData
        };
        setSavedTrips(prev => [newTrip, ...prev]);
        return newTrip;
    };

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            bookings,
            savedTrips,
            login,
            loginWithGoogle,
            loginWithLocalGoogle,
            register,
            updateProfile,
            logout,
            addBooking,
            saveTrip
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
