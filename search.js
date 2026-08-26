/**
 * Mamba Security – Site Search
 * Full-width search bar above the header.
 */
(function () {
    'use strict';

    var searchIndex = [
        { title: 'Home', url: 'index.html', keywords: 'home main page landing', section: 'Pages' },
        { title: 'Armed Response', url: 'ar.html', keywords: 'armed response reaction emergency rapid', section: 'Services' },
        { title: 'Security Guarding', url: 'guarding.html', keywords: 'security guarding guards professional', section: 'Services' },
        { title: 'Off-Site Monitoring', url: 'off-site-monitoring.html', keywords: 'off-site monitoring ai surveillance control room cctv', section: 'Services' },
        { title: 'Security Technologies', url: 'technologies.html', keywords: 'security technology cctv cameras alarm systems lpr access control', section: 'Services' },
        { title: 'Specialty Services', url: 'specialty-services.html', keywords: 'specialty services close protection screening', section: 'Services' },
        { title: 'Training Academy', url: 'training-academy.html', keywords: 'training academy psira courses certification', section: 'Services' },
        { title: 'Contact Us', url: 'contact.html', keywords: 'contact quote enquiry phone email', section: 'Pages' },
        { title: 'K9 Security Unit', url: 'ar.html#k9-unit', keywords: 'k9 dog unit canine patrol', section: 'Sub-services' },
        { title: 'Special Operations Unit', url: 'ar.html#special-operations', keywords: 'special operations tactical high-risk', section: 'Sub-services' },
        { title: 'Medical Response', url: 'ar.html#medical-response', keywords: 'medical response first aid emergency', section: 'Sub-services' },
        { title: 'Fire Ops SA', url: 'ar.html#fire-ops', keywords: 'fire fighting rescue fire safety', section: 'Sub-services' },
        { title: 'Corporate Security', url: 'guarding.html#corporate', keywords: 'corporate security office business', section: 'Sub-services' },
        { title: 'Estate Security', url: 'guarding.html#secure-estates', keywords: 'estate residential guards community', section: 'Sub-services' },
        { title: 'School Security', url: 'guarding.html#schools', keywords: 'school security education campus', section: 'Sub-services' },
        { title: 'AD HOC Security', url: 'guarding.html#ad-hoc', keywords: 'ad hoc temporary event', section: 'Sub-services' },
        { title: 'CCTV Installations', url: 'technologies.html#installations', keywords: 'cctv camera installation surveillance', section: 'Sub-services' },
        { title: 'LPR Camera Network', url: 'technologies.html#lpr-camera', keywords: 'lpr licence plate recognition camera', section: 'Sub-services' },
        { title: 'Alarm Systems', url: 'technologies.html#alarm-systems', keywords: 'alarm system burglar intruder', section: 'Sub-services' },
        { title: 'Access Control', url: 'technologies.html#access-control', keywords: 'access control biometric fingerprint', section: 'Sub-services' },
        { title: 'Mamba App', url: 'technologies.html#mamba-app', keywords: 'mamba app mobile smartphone', section: 'Sub-services' },
        { title: 'Control Centre', url: 'technologies.html#control-centre', keywords: 'control centre monitoring room', section: 'Sub-services' },
        { title: 'Neighbourhood Security', url: 'community-safety.html', keywords: 'neighbourhood watch community safety', section: 'Sub-services' },
        { title: 'Close Protection', url: 'specialty-services.html#close-protection', keywords: 'close protection vip bodyguard', section: 'Sub-services' },
        { title: 'Background Screening', url: 'specialty-services.html#background-screening', keywords: 'background screening verification', section: 'Sub-services' },
        { title: 'Child Safety', url: 'specialty-services.html#child-safety', keywords: 'child safety children protection', section: 'Sub-services' },
        { title: 'Community Training', url: 'specialty-services.html#community-training', keywords: 'community training self-defence', section: 'Sub-services' },
        { title: 'Security Tips', url: 'securitytips.html', keywords: 'security tips advice safety', section: 'Resources' },
        { title: 'Home Security Guide', url: 'home-security-guide.html', keywords: 'home security guide residential', section: 'Resources' },
        { title: 'Business Security', url: 'business-security.html', keywords: 'business security commercial', section: 'Resources' },
        { title: 'Community Safety', url: 'community-safety.html', keywords: 'community safety neighbourhood', section: 'Resources' },
        { title: 'Security Assessment', url: 'security-assessment.html', keywords: 'security assessment risk evaluation', section: 'Resources' },
    ];

    function normalise(s) { return (s || '').toLowerCase().trim(); }

    function score(item, query) {
        var q = normalise(query), title = normalise(item.title), kw = normalise(item.keywords);
        if (!q) return 0;
        if (title === q) return 100;
        if (title.indexOf(q) === 0) return 80;
        if (title.indexOf(q) !== -1) return 60;
        if (kw.split(/\s+/).indexOf(q) !== -1) return 50;
        if (kw.indexOf(q) !== -1) return 30;
        var tokens = q.split(/\s+/), mc = 0;
        for (var i = 0; i < tokens.length; i++) {
            if (tokens[i] && (title.indexOf(tokens[i]) !== -1 || kw.indexOf(tokens[i]) !== -1)) mc++;
        }
        if (mc === tokens.length && mc > 0) return 20;
        return 0;
    }

    function search(query) {
        if (!query || !query.trim()) return [];
        var results = [];
        for (var i = 0; i < searchIndex.length; i++) {
            var s = score(searchIndex[i], query);
            if (s > 0) results.push({ item: searchIndex[i], score: s });
        }
        results.sort(function (a, b) { return b.score - a.score; });
        return results.slice(0, 10);
    }

    function highlightMatch(text, query) {
        var q = normalise(query);
        if (!q) return text;
        return text.replace(new RegExp('(' + q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi'), '<mark>$1</mark>');
    }

    function getIcon(section) {
        switch (section) {
            case 'Services': return 'fa-shield-alt';
            case 'Sub-services': return 'fa-cog';
            case 'Pages': return 'fa-file-alt';
            case 'Resources': return 'fa-book';
            default: return 'fa-search';
        }
    }

    function renderResults(resultsEl, query) {
        if (!resultsEl) return;
        if (!query || !query.trim()) {
            resultsEl.innerHTML = '';
            resultsEl.classList.remove('open');
            return;
        }
        var results = search(query);
        if (results.length === 0) {
            resultsEl.innerHTML = '<div class="search-hint"><i class="fas fa-exclamation-circle"></i>No results found for "' + query.replace(/</g, '&lt;') + '"</div>';
            resultsEl.classList.add('open');
            return;
        }
        var html = '';
        for (var i = 0; i < results.length; i++) {
            var r = results[i].item;
            html += '<a href="' + r.url + '" class="search-result-item">' +
                '<div class="search-result-icon"><i class="fas ' + getIcon(r.section) + '"></i></div>' +
                '<div class="search-result-text">' +
                    '<div class="search-result-title">' + highlightMatch(r.title, query) + '</div>' +
                    '<div class="search-result-section">' + r.section + '</div>' +
                '</div></a>';
        }
        resultsEl.innerHTML = html;
        resultsEl.classList.add('open');
    }

    function init() {
        var input = document.getElementById('siteSearchInput');
        var resultsEl = document.getElementById('siteSearchResults');
        var clearBtn = document.getElementById('siteSearchClear');
        if (!input || !resultsEl) return;

        input.addEventListener('input', function () {
            var val = input.value;
            // Show/hide clear button
            if (clearBtn) {
                clearBtn.classList.toggle('visible', val.length > 0);
            }
            renderResults(resultsEl, val);
        });

        if (clearBtn) {
            clearBtn.addEventListener('click', function () {
                input.value = '';
                input.focus();
                clearBtn.classList.remove('visible');
                renderResults(resultsEl, '');
            });
        }

        // Close results when clicking outside
        document.addEventListener('click', function (e) {
            var bar = document.querySelector('.site-search-bar');
            if (bar && !bar.contains(e.target)) {
                resultsEl.classList.remove('open');
            }
        });

        // Keyboard shortcut: Ctrl+K or Cmd+K to focus search
        document.addEventListener('keydown', function (e) {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                input.focus();
                input.select();
            }
            if (e.key === 'Escape') {
                resultsEl.classList.remove('open');
                input.blur();
            }
        });

        // Re-open results on focus if there's text
        input.addEventListener('focus', function () {
            if (input.value.trim()) {
                renderResults(resultsEl, input.value);
            }
        });
    }

    function updateFixedHeaderSpace() {
        var header = document.querySelector('.header');
        if (!header) return;
        document.documentElement.style.setProperty('--fixed-header-space', header.offsetHeight + 'px');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            updateFixedHeaderSpace();
            init();
        });
    } else {
        updateFixedHeaderSpace();
        init();
    }

    window.addEventListener('load', updateFixedHeaderSpace);
    window.addEventListener('resize', updateFixedHeaderSpace);
})();
