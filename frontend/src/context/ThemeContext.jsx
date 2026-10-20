import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [theme, setThemeState] = useState('light');

    useEffect(() => {
        // Enforce clean white light theme across the entire application
        document.body.classList.remove('dark-theme', 'glass-theme');
        document.documentElement.classList.remove('dark');
        document.body.classList.add('light-theme');
        localStorage.setItem('fyt-theme', 'light');
    }, []);

    const changeTheme = (newTheme) => {
        setThemeState('light');
    };

    return (
        <ThemeContext.Provider value={{ theme: 'light', changeTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);
