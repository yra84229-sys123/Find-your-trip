import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

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
    const loginForm = document.getElementById('login-form');
    const submitBtn = document.getElementById('submit-btn');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Show loading state
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Logging in...';
            submitBtn.disabled = true;

            // Login User with Firebase
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    alert("Login successful! Welcome back.");
                    
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
                    alert("Login Failed: " + errorMessage);
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
