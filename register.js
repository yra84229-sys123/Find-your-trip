import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

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
                .then((userCredential) => {
                    const user = userCredential.user;
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
                .then((result) => {
                    const user = result.user;
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
