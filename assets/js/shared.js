
<!-- assets/js/shared.js -->
<script>
    // Shared theme and utility functions
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
                themeToggleBtn.childNodes[themeToggleBtn.childNodes.length - 1].textContent = ` ${savedTheme === 'dark' ? 'Light Mode' : 'Dark Mode'}`;
            }
        }

        function toggleTheme() {
            const doc = document.documentElement;
            const currentTheme = doc.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            doc.setAttribute('data-theme', newTheme);
            safeSetStorage('theme', newTheme);
            if (themeIcon) themeIcon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
            if (themeToggleBtn) {
                themeToggleBtn.childNodes[themeToggleBtn.childNodes.length - 1].textContent = ` ${newTheme === 'dark' ? 'Light Mode' : 'Dark Mode'}`;
            }
        }

        document.addEventListener('DOMContentLoaded', function() {
            initTheme();
            if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggleTheme);
        });

        // Expose for generator (if needed)
        window.mccShared = { safeGetStorage, safeSetStorage };
    })();
</script>
