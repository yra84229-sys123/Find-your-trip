import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// TODO: Replace the object below with your actual Firebase configuration
// You can find this in your Firebase Console -> Project Settings -> General -> Your apps
const firebaseConfig = {
  apiKey: "AIzaSyCYHlqxdxPS7wYWvFNvWh4qqbZcYmQ0h6s",
  authDomain: "find-your-trip-fcd69.firebaseapp.com",
  projectId: "find-your-trip-fcd69",
  storageBucket: "find-your-trip-fcd69.firebasestorage.app",
  messagingSenderId: "134544912671",
  appId: "1:134544912671:web:0e0864db863233ad9e802a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    const submitBtn = document.getElementById('submit-btn');

    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            if (password.length < 6) {
                alert("Password should be at least 6 characters.");
                return;
            }

            // Show loading state
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Registering...';
            submitBtn.disabled = true;

            // Register User with Firebase
            createUserWithEmailAndPassword(auth, email, password)
                .then(async (userCredential) => {
                    const user = userCredential.user;
                    
                    // Save user details to Firestore
                    try {
                        await setDoc(doc(db, "users", user.uid), {
                            uid: user.uid,
                            email: user.email,
                            displayName: email.split('@')[0],
                            role: email === 'admin@gmail.com' ? 'admin' : 'user',
                            status: 'Active',
                            createdAt: serverTimestamp()
                        });
                    } catch (fsErr) {
                        console.error("Error writing user doc:", fsErr);
                    }

                    alert("Registration successful! Welcome to Find Your Trip.");

                    // Redirect
                    const pendingBooking = localStorage.getItem('pending-booking');
                    if (pendingBooking) {
                        try {
                            const data = JSON.parse(pendingBooking);
                            window.location.href = data.redirectUrl || "booking.html";
                        } catch (e) {
                            window.location.href = "index.html";
                        }
                    } else {
                        window.location.href = "index.html";
                    }
                })
                .catch((error) => {
                    // Reset button state
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;

                    const errorCode = error.code;
                    const errorMessage = error.message;

                    console.error("Firebase Auth Error:", errorCode, errorMessage);
                    alert("Registration Failed: " + errorMessage);
                });
        });
    }

    const googleBtn = document.getElementById('google-auth-btn');
    if (googleBtn) {
        googleBtn.addEventListener('click', () => {
            const provider = new GoogleAuthProvider();
            googleBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Loading...';
            googleBtn.disabled = true;

            signInWithPopup(auth, provider)
                .then(async (result) => {
                    const user = result.user;

                    // Save user details to Firestore
                    try {
                        await setDoc(doc(db, "users", user.uid), {
                            uid: user.uid,
                            email: user.email,
                            displayName: user.displayName || user.email.split('@')[0],
                            role: user.email === 'admin@gmail.com' ? 'admin' : 'user',
                            status: 'Active',
                            lastLogin: serverTimestamp()
                        }, { merge: true });
                    } catch (fsErr) {
                        console.error("Error writing user doc:", fsErr);
                    }

                    alert("Google Sign-In successful! Welcome " + (user.displayName || ""));
                    const pendingBooking = localStorage.getItem('pending-booking');
                    if (pendingBooking) {
                        try {
                            const data = JSON.parse(pendingBooking);
                            window.location.href = data.redirectUrl || "booking.html";
                        } catch (e) {
                            window.location.href = "index.html";
                        }
                    } else {
                        window.location.href = "index.html";
                    }
                })
                .catch((error) => {
                    googleBtn.innerHTML = '<i class="fa-brands fa-google"></i> Continue with Google';
                    googleBtn.disabled = false;
                    
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.error("Google Auth Error:", errorCode, errorMessage);
                    alert("Google Sign-In Failed: " + errorMessage);
                });
        });
    }
});
