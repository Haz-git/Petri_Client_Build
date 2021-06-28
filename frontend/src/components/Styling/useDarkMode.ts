//Custom Darkmode hook for toggler.

import { useEffect, useState } from 'react';

export const getMode = () => {
    const getTheme = window.localStorage.getItem('theme');
    return getTheme;
};

export const useDarkMode = () => {
    const [theme, setTheme] = useState('light');
    const [componentMounted, setComponentMounted] = useState(false);

    const setMode = (mode) => {
        window.localStorage.setItem('theme', mode);
        setTheme(mode);
    };

    const toggleTheme = (callBack) => {
        if (theme === 'light') {
            setMode('dark');
            return callBack('dark');
        } else {
            setMode('light');
            return callBack('light');
        }
    };

    useEffect(() => {
        const localTheme = window.localStorage.getItem('theme');

        if (localTheme) {
            setTheme(localTheme);
        } else {
            setMode('light');
        }

        setComponentMounted(true);
    }, []);

    return [theme, toggleTheme, componentMounted];
};
