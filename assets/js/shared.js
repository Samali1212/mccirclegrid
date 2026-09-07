// assets/js/shared.js
(function() {
    'use strict';
    const STORAGE_PREFIX = 'mc_circle_gen_v4_';

    function safeGetStorage(key, fallback) {
        try { const v = localStorage.getItem(STORAGE_PREFIX + key); return v !== null ? v : fallback; } catch (e) { return fallback; }
    }

    function safeSetStorage(key, val) {
        try { localStorage.setItem(STORAGE_PREFIX + key, String(val)); } catch (e) {}
    }

    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const themeIcon = document.getElementById('themeIcon');

    function initTheme() {
        const savedTheme = safeGetStorage('theme', 'dark');
        document.documentElement.setAttribute('data-theme', savedTheme);
        if (themeIcon) themeIcon.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
        if (themeToggleBtn) {
            // Remove all children and set clean text
            themeToggleBtn.innerHTML = `<span id="themeIcon">${savedTheme === 'dark' ? '☀️' : '🌙'}</span> ${savedTheme === 'dark' ? 'Light Mode' : 'Dark Mode'}`;
            // Re-find the icon after innerHTML update
            const icon = document.getElementById('themeIcon');
            if (icon) icon.setAttribute('aria-hidden', 'true');
        }
    }

    function toggleTheme() {
        const doc = document.documentElement;
        const currentTheme = doc.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        doc.setAttribute('data-theme', newTheme);
        safeSetStorage('theme', newTheme);
        if (themeToggleBtn) {
            themeToggleBtn.innerHTML = `<span id="themeIcon">${newTheme === 'dark' ? '☀️' : '🌙'}</span> ${newTheme === 'dark' ? 'Light Mode' : 'Dark Mode'}`;
            const icon = document.getElementById('themeIcon');
            if (icon) icon.setAttribute('aria-hidden', 'true');
        }
    }

    // Initialize on DOMContentLoaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initTheme();
            if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggleTheme);
        });
    } else {
        initTheme();
        if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggleTheme);
    }
})();
