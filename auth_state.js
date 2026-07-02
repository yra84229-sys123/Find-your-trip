import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCYHlqxdxPS7wYWvFNvWh4qqbZcYmQ0h6s",
  authDomain: "find-your-trip-fcd69.firebaseapp.com",
  projectId: "find-your-trip-fcd69",
  storageBucket: "find-your-trip-fcd69.firebasestorage.app",
  messagingSenderId: "134544912671",
  appId: "1:134544912671:web:0e0864db863233ad9e802a"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

let currentUser = undefined;

function renderUserUI() {
    // Do not show the avatar or navbar login link on the login and register pages
    const path = window.location.pathname;
    if (path.includes('login.html') || path.includes('register.html')) {
        return;
    }

    const navBottom = document.querySelector('.nav-bottom');
    if (!navBottom) return;

    if (currentUser === undefined) return;

    // Remove existing buttons to avoid duplicates
    const existingProfile = document.getElementById('user-profile-btn');
    const existingLogin = document.getElementById('nav-login-btn');
    if (existingProfile) existingProfile.remove();
    if (existingLogin) existingLogin.remove();

    if (currentUser) {
        // User is signed in
        const email = currentUser.email || "User";
        const initial = email.charAt(0).toUpperCase();

        // Create Avatar Container
        const profileDiv = document.createElement('div');
        profileDiv.id = 'user-profile-btn';
        profileDiv.style.cssText = 'width: 42px; height: 42px; border-radius: 50%; background-color: #e83e8c; color: white; display: flex; align-items: center; justify-content: center; font-size: 1.3rem; font-weight: bold; cursor: pointer; margin-left: 20px; border: 2px solid white; box-shadow: 0 4px 6px rgba(0,0,0,0.1); position: relative; z-index: 100; transition: transform 0.2s;';
        profileDiv.innerHTML = initial;
        profileDiv.onmouseover = () => profileDiv.style.transform = 'scale(1.05)';
        profileDiv.onmouseout = () => profileDiv.style.transform = 'scale(1)';
        
        // Create Dropdown Menu
        const dropdown = document.createElement('div');
        dropdown.style.cssText = 'display: none; position: absolute; top: 55px; right: 0; background: white; border-radius: 8px; box-shadow: 0 10px 25px rgba(0,0,0,0.2); width: 180px; flex-direction: column; overflow: hidden; padding: 5px 0;';
        
        const emailText = document.createElement('div');
        emailText.style.cssText = 'padding: 10px 15px; font-size: 0.85rem; color: #666; border-bottom: 1px solid #eee; word-break: break-all;';
        emailText.textContent = email;
        
        const logoutBtn = document.createElement('button');
        logoutBtn.innerHTML = '<i class="fa-solid fa-right-from-bracket"></i> Logout';
        logoutBtn.style.cssText = 'padding: 12px 15px; border: none; background: transparent; text-align: left; cursor: pointer; font-size: 0.95rem; font-family: var(--font-body); color: #e83e8c; font-weight: 600; display: flex; align-items: center; gap: 8px; width: 100%; transition: background 0.2s;';
        logoutBtn.onmouseover = () => logoutBtn.style.backgroundColor = '#f8f9fa';
        logoutBtn.onmouseout = () => logoutBtn.style.backgroundColor = 'transparent';
        
        logoutBtn.onclick = () => {
            signOut(auth).then(() => {
                window.location.reload();
            });
        };

        dropdown.appendChild(emailText);
        dropdown.appendChild(logoutBtn);
        profileDiv.appendChild(dropdown);

        profileDiv.onclick = (e) => {
            e.stopPropagation();
            const isHidden = dropdown.style.display === 'none';
            document.querySelectorAll('.profile-dropdown').forEach(d => d.style.display = 'none'); // close others
            dropdown.style.display = isHidden ? 'flex' : 'none';
        };

        dropdown.className = 'profile-dropdown';

        document.addEventListener('click', () => {
            dropdown.style.display = 'none';
        });

        navBottom.appendChild(profileDiv);

    } else {
        // User is signed out
        // Add Login button next to BOOK NOW
        const loginBtn = document.createElement('a');
        loginBtn.id = 'nav-login-btn';
        loginBtn.href = 'login.html';
        loginBtn.className = 'nav-link';
        loginBtn.innerHTML = '<i class="fa-solid fa-user" style="margin-right: 5px;"></i> LOGIN';
        loginBtn.style.cssText = 'margin-left: 15px; font-weight: 700; color: white; display: flex; align-items: center; text-decoration: none;';
        
        const bookBtn = document.querySelector('.nav-book-btn');
        if (bookBtn) {
            navBottom.insertBefore(loginBtn, bookBtn);
        } else {
            navBottom.appendChild(loginBtn);
        }
    }
}

// Watch for DOM changes (React renders the navbar asynchronously)
const observer = new MutationObserver(() => {
    if (document.querySelector('.nav-bottom') && !document.getElementById('user-profile-btn') && !document.getElementById('nav-login-btn')) {
        renderUserUI();
    }
});
observer.observe(document.body, { childList: true, subtree: true });

onAuthStateChanged(auth, (user) => {
    currentUser = user;
    window.firebaseUser = user;
    window.dispatchEvent(new CustomEvent('auth-state-changed', { detail: user }));
    renderUserUI();
});
