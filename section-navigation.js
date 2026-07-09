(function () {
    'use strict';

    function getTarget() {
        if (!window.location.hash || window.location.hash === '#') return null;

        try {
            return document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
        } catch (error) {
            return null;
        }
    }

    function alignHashTarget() {
        const target = getTarget();
        if (!target) return;

        target.classList.add('visible');

        const header = document.querySelector('.header');
        const headerHeight = header ? Math.ceil(header.getBoundingClientRect().height) : 0;
        const targetTop = target.getBoundingClientRect().top + window.scrollY;

        window.scrollTo({
            top: Math.max(0, targetTop - headerHeight - 18),
            behavior: 'auto'
        });
    }

    function scheduleAlignment() {
        window.requestAnimationFrame(function () {
            window.requestAnimationFrame(alignHashTarget);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', scheduleAlignment, { once: true });
    } else {
        scheduleAlignment();
    }

    window.addEventListener('load', scheduleAlignment, { once: true });
    window.addEventListener('hashchange', scheduleAlignment);

    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(scheduleAlignment);
    }
}());
