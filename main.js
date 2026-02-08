// ============================================
// PROJECT DATA
// ============================================

const projects = [
    {
        id: 'phone-repair',
        icon: '\u{1F4F1}',
        date: '2015\u20132017',
        complexity: 2,
        title: 'Phone Repair',
        category: 'analog',
        featured: true,
        tagLabel: 'Origin',
        description: 'Where it all began \u2014 running a repair service from my bedroom, learning electronics through hands-on troubleshooting, schematic reading, and precision soldering.',
        previewSpecs: [
            { value: '200+', label: 'Devices' },
            { value: '94%', label: 'Success' }
        ],
        specsTitle: 'Key Metrics',
        specs: [
            { label: 'Devices Repaired', value: '200+' },
            { label: 'Success Rate', value: '94%' },
            { label: 'Component Level', value: '0402 SMD' },
            { label: 'Turnaround', value: '&lt;24 hrs' }
        ],
        techStack: ['Soldering', 'Diagnostics', 'Schematics', 'Hot Air', 'Microscopy'],
        actions: [
            { label: '\u{1F4F8} Gallery', type: 'primary' },
            { label: '\u{1F4D6} Story', type: 'secondary' }
        ]
    },
    {
        id: 'op-amp',
        icon: '\u26A1',
        date: '2019',
        complexity: 4,
        title: 'Precision Op-Amp Design',
        category: 'analog',
        tagLabel: 'Analog',
        description: 'Instrumentation amplifier with chopper stabilization achieving exceptional DC accuracy for medical-grade sensor interface applications.',
        previewSpecs: [
            { value: '&lt;50\u00B5V', label: 'Offset' },
            { value: '120dB', label: 'CMRR' }
        ],
        specsTitle: 'Performance',
        specs: [
            { label: 'Input Offset', value: '&lt;50\u00B5V' },
            { label: 'CMRR', value: '&gt;120dB' },
            { label: 'Bandwidth', value: '10MHz' },
            { label: 'Noise', value: '8nV/\u221AHz' }
        ],
        techStack: ['LTspice', 'Altium', 'Chopper', '4-Layer PCB'],
        actions: [
            { label: '\u{1F4D0} Schematic', type: 'primary' },
            { label: '\u{1F4CA} Results', type: 'secondary' }
        ]
    },
    {
        id: 'motor-driver',
        icon: '\u{1F50B}',
        date: '2020',
        complexity: 4,
        title: 'High-Current Motor Driver',
        category: 'power',
        tagLabel: 'Power',
        description: 'High-efficiency H-bridge with synchronous rectification and adaptive dead-time for robotics applications.',
        previewSpecs: [
            { value: '30A', label: 'Current' },
            { value: '&gt;95%', label: 'Efficiency' }
        ],
        specsTitle: 'Specifications',
        specs: [
            { label: 'Continuous', value: '30A' },
            { label: 'Voltage', value: '12\u201348V' },
            { label: 'Efficiency', value: '&gt;95%' },
            { label: 'PWM', value: '100kHz' }
        ],
        techStack: ['GaN FETs', 'Gate Drivers', 'Thermal', 'STM32'],
        actions: [
            { label: '\u2699\uFE0F Details', type: 'primary' },
            { label: '\u{1F3AC} Demo', type: 'secondary' }
        ]
    },
    {
        id: 'drink-mixer',
        icon: '\u{1F379}',
        date: '2021',
        complexity: 3,
        title: 'Automated Drink Mixer',
        category: 'digital',
        tagLabel: 'Mechatronics',
        description: 'Precision cocktail system with peristaltic pumps, load cell feedback, and touchscreen interface for automated mixing.',
        previewSpecs: [
            { value: '\u00B10.5mL', label: 'Accuracy' },
            { value: '12', label: 'Slots' }
        ],
        specsTitle: 'System',
        specs: [
            { label: 'Accuracy', value: '\u00B10.5mL' },
            { label: 'Slots', value: '12' },
            { label: 'Recipes', value: '500+' },
            { label: 'Cycle', value: '&lt;30s' }
        ],
        techStack: ['Raspberry Pi', 'Python', 'Peristaltic', 'Load Cells'],
        actions: [
            { label: '\u{1F3AC} Demo', type: 'primary' },
            { label: '\u{1F4DD} API', type: 'secondary' }
        ]
    },
    {
        id: 'risc-v',
        icon: '\u{1F5A5}\uFE0F',
        date: '2022',
        complexity: 5,
        title: 'RISC-V Processor Design',
        category: 'digital',
        tagLabel: 'Digital',
        description: 'Complete RV32IM implementation with 5-stage pipeline, hazard detection, forwarding, and FPGA synthesis.',
        previewSpecs: [
            { value: '100MHz', label: 'Clock' },
            { value: '5-Stage', label: 'Pipeline' }
        ],
        specsTitle: 'Architecture',
        specs: [
            { label: 'ISA', value: 'RV32I+M' },
            { label: 'Pipeline', value: '5-Stage' },
            { label: 'Clock', value: '100MHz' },
            { label: 'Cache', value: '16KB I/D' }
        ],
        techStack: ['SystemVerilog', 'Vivado', 'FPGA', 'Verilator'],
        actions: [
            { label: '\u{1F4BB} Source', type: 'primary' },
            { label: '\u{1F4C8} Bench', type: 'secondary' }
        ]
    },
    {
        id: 'transistor-materials',
        icon: '\u{1F52C}',
        date: '2023',
        complexity: 5,
        title: 'Transistor Material Optimization',
        category: 'research',
        tagLabel: 'Research',
        description: 'Systematic characterization of novel channel materials with automated measurement routines for advanced node development.',
        previewSpecs: [
            { value: '2.3\u00D7', label: 'Mobility' },
            { value: '1200+', label: 'Devices' }
        ],
        specsTitle: 'Outcomes',
        specs: [
            { label: 'Mobility', value: '2.3\u00D7 gain' },
            { label: 'SS', value: '15mV/dec' },
            { label: 'Devices', value: '1,200+' },
            { label: 'Temp', value: '-40\u2013150\u00B0C' }
        ],
        techStack: ['Device Physics', 'Extraction', 'Cryo', 'Python'],
        actions: [
            { label: '\u{1F4C4} Paper', type: 'primary' },
            { label: '\u{1F4CA} Data', type: 'secondary' }
        ]
    },
    {
        id: 'battery-economics',
        icon: '\u26A1',
        date: '2024',
        complexity: 4,
        title: 'Grid-Scale Battery Economics',
        category: 'research',
        tagLabel: 'Research',
        description: 'Techno-economic models for grid storage analyzing degradation, markets, and optimization across 7 ISOs.',
        previewSpecs: [
            { value: '100MW', label: 'Scale' },
            { value: '&gt;12%', label: 'IRR' }
        ],
        specsTitle: 'Scope',
        specs: [
            { label: 'Scale', value: '100MW' },
            { label: 'Horizon', value: '20 Years' },
            { label: 'IRR', value: '&gt;12%' },
            { label: 'Markets', value: '7 ISOs' }
        ],
        techStack: ['Economics', 'Degradation', 'Markets', 'Julia'],
        actions: [
            { label: '\u{1F4CA} Dashboard', type: 'primary' },
            { label: '\u{1F4C4} Paper', type: 'secondary' }
        ]
    },
    {
        id: 'gan-research',
        icon: '\u{1F9EA}',
        date: '2024\u2013Now',
        complexity: 5,
        title: 'GaN FET Dynamic R<sub>DS(on)</sub>',
        category: 'research',
        tagLabel: 'Research',
        isActive: true,
        description: 'Investigating dynamic on-resistance in GaN power transistors with automated SCPI testbench across 162 parameter combinations.',
        previewSpecs: [
            { value: '650V', label: 'Voltage' },
            { value: '100ns', label: 'Resolution' }
        ],
        specsTitle: 'Test System',
        specs: [
            { label: 'Voltage', value: '0\u2013650V' },
            { label: 'Current', value: '0\u201350A' },
            { label: 'Temp', value: '25\u2013150\u00B0C' },
            { label: 'Resolution', value: '100ns' }
        ],
        techStack: ['GaN', 'SCPI', 'Traps', 'Python GUI'],
        actions: [
            { label: '\u{1F52C} Overview', type: 'primary' },
            { label: '\u{1F4C8} Live', type: 'secondary' }
        ]
    }
];

// ============================================
// RENDER PROJECT CARDS
// ============================================

function renderComplexityDots(level) {
    return Array.from({ length: 5 }, (_, i) =>
        `<span class="complexity-dot${i < level ? ' filled' : ''}"></span>`
    ).join('');
}

function renderProjectCard(project) {
    const featuredClass = project.featured ? ' featured' : '';
    const tagClass = project.featured ? ' featured-tag' : '';
    const activeStatus = project.isActive
        ? '<span class="status-live">Active</span>'
        : '';

    const previewSpecsHTML = project.previewSpecs.map(spec => `
        <div class="spec-mini">
            <div class="spec-mini-value">${spec.value}</div>
            <div class="spec-mini-label">${spec.label}</div>
        </div>
    `).join('');

    const specsHTML = project.specs.map(spec => `
        <div class="spec-item">
            <span class="spec-label">${spec.label}</span>
            <span class="spec-value">${spec.value}</span>
        </div>
    `).join('');

    const techTagsHTML = project.techStack.map(tech =>
        `<span class="tech-tag">${tech}</span>`
    ).join('');

    const actionsHTML = project.actions.map(action =>
        `<button class="action-btn ${action.type}">${action.label}</button>`
    ).join('');

    return `
        <article class="project-card${featuredClass}" data-category="${project.category}">
            <div class="card-left">
                <div class="project-icon">${project.icon}</div>
                <div class="card-date-complexity">
                    <span class="project-date">${project.date}</span>
                    <div class="complexity-dots">
                        ${renderComplexityDots(project.complexity)}
                    </div>
                </div>
            </div>
            <div class="card-center">
                <div class="card-title-row">
                    <h3 class="project-title">${project.title}</h3>
                    <span class="category-tag${tagClass}">${project.tagLabel}</span>
                    ${activeStatus}
                </div>
                <p class="project-description">${project.description}</p>
            </div>
            <div class="card-right">
                <div class="specs-preview">
                    ${previewSpecsHTML}
                </div>
                <button class="expand-btn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </button>
            </div>
            <div class="expanded-content">
                <div class="expanded-inner">
                    <div class="specs-full">
                        <div class="specs-title">${project.specsTitle}</div>
                        <div class="specs-grid">
                            ${specsHTML}
                        </div>
                    </div>
                    <div class="tech-actions">
                        <div class="tech-stack">
                            ${techTagsHTML}
                        </div>
                        <div class="card-actions">
                            ${actionsHTML}
                        </div>
                    </div>
                </div>
            </div>
        </article>
    `;
}

function renderProjects() {
    const grid = document.querySelector('.projects-grid');
    if (grid) {
        grid.innerHTML = projects.map(renderProjectCard).join('');
    }
}

// ============================================
// THEME TOGGLE
// ============================================

function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        html.setAttribute('data-theme', savedTheme);
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? '' : 'dark';

        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        themeToggle.style.transform = 'scale(0.9) rotate(180deg)';
        setTimeout(() => {
            themeToggle.style.transform = '';
        }, 300);
    });
}

// ============================================
// NAVIGATION
// ============================================

function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const navLinkItems = document.querySelectorAll('.nav-link');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('open');
    });

    navLinkItems.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });

    return { navbar, navLinkItems };
}

// ============================================
// CUSTOM CURSOR
// ============================================

function initCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorDot = document.querySelector('.cursor-dot');

    if ('ontouchstart' in window) {
        cursor.style.display = 'none';
        cursorDot.style.display = 'none';
        return { cursor, enabled: false };
    }

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let dotX = 0, dotY = 0;

    function onMouseMove(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    }

    function animate() {
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        cursor.style.left = cursorX - 10 + 'px';
        cursor.style.top = cursorY - 10 + 'px';

        dotX += (mouseX - dotX) * 0.25;
        dotY += (mouseY - dotY) * 0.25;
        cursorDot.style.left = dotX - 3 + 'px';
        cursorDot.style.top = dotY - 3 + 'px';

        requestAnimationFrame(animate);
    }
    animate();

    const hoverElements = document.querySelectorAll('button, a, .project-card, .tech-tag');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
    });

    return { cursor, enabled: true, onMouseMove };
}

// ============================================
// PARALLAX EFFECTS
// ============================================

function initParallax() {
    const parallaxLayers = document.querySelectorAll('.parallax-layer');
    const orbs = document.querySelectorAll('.gradient-orb');
    const shapes = document.querySelectorAll('.parallax-shape');

    let targetScrollY = 0;
    let currentScrollY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let mouseParallaxX = 0;
    let mouseParallaxY = 0;

    function onScroll() {
        targetScrollY = window.scrollY;
    }

    function onMouseMove(e) {
        targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    }

    function animate() {
        currentScrollY += (targetScrollY - currentScrollY) * 0.1;
        mouseParallaxX += (targetMouseX - mouseParallaxX) * 0.05;
        mouseParallaxY += (targetMouseY - mouseParallaxY) * 0.05;

        parallaxLayers.forEach(layer => {
            const speed = parseFloat(layer.dataset.speed) || 0.05;
            const yOffset = currentScrollY * speed * -1;
            const xMouseOffset = mouseParallaxX * 30 * speed * 10;
            const yMouseOffset = mouseParallaxY * 20 * speed * 10;
            layer.style.transform = `translate3d(${xMouseOffset}px, ${yOffset + yMouseOffset}px, 0)`;
        });

        orbs.forEach((orb, index) => {
            const xOffset = mouseParallaxX * (20 + index * 10);
            const yOffset = mouseParallaxY * (15 + index * 8);
            const rotation = mouseParallaxX * (5 + index * 2);
            orb.style.transform = `translate(${xOffset}px, ${yOffset}px) rotate(${rotation}deg) scale(${1 + Math.abs(mouseParallaxX) * 0.05})`;
        });

        shapes.forEach((shape, index) => {
            const xOffset = mouseParallaxX * (25 + index * 8);
            const yOffset = mouseParallaxY * (20 + index * 6);
            const rotation = 15 + mouseParallaxX * 15 + (index * 20);
            shape.style.transform = `translate(${xOffset}px, ${yOffset}px) rotate(${rotation}deg)`;
        });

        requestAnimationFrame(animate);
    }
    animate();

    return { onScroll, onMouseMove };
}

// ============================================
// CARD INTERACTIONS
// ============================================

function initCardInteractions() {
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            card.style.setProperty('--mouse-x', x + '%');
            card.style.setProperty('--mouse-y', y + '%');
        });

        card.addEventListener('click', (e) => {
            if (!e.target.closest('.action-btn') && !e.target.closest('.expand-btn') && !e.target.closest('.tech-tag')) {
                card.classList.toggle('expanded');
            }
        });
    });

    document.querySelectorAll('.expand-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            btn.closest('.project-card').classList.toggle('expanded');
        });
    });
}

// ============================================
// FILTER FUNCTIONALITY
// ============================================

function initFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            projectCards.forEach((card, index) => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.classList.remove('hidden');
                    card.style.animationDelay = (index * 0.05) + 's';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

// ============================================
// HERO PARALLAX
// ============================================

function initHeroParallax() {
    const profileSection = document.querySelector('.profile-section');
    const infoSection = document.querySelector('.info-section');
    const hero = document.querySelector('.hero');

    function onScroll() {
        const scrolled = window.scrollY;
        const heroHeight = hero.offsetHeight;

        if (scrolled < heroHeight) {
            const progress = scrolled / heroHeight;

            if (profileSection) {
                profileSection.style.transform = `translateY(${scrolled * 0.3}px) scale(${1 - progress * 0.1})`;
                profileSection.style.opacity = 1 - progress * 0.8;
            }

            if (infoSection) {
                infoSection.style.transform = `translateY(${scrolled * 0.15}px)`;
                infoSection.style.opacity = 1 - progress * 0.6;
            }
        }
    }

    return { onScroll };
}

// ============================================
// ACTIVE NAV LINK TRACKING
// ============================================

function initActiveNavTracking(navLinkItems) {
    const sections = document.querySelectorAll('section[id], header[id]');

    function onScroll() {
        const scrollPosition = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinkItems.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    return { onScroll };
}

// ============================================
// CONSOLIDATED EVENT LISTENERS
// ============================================

function init() {
    // Render data-driven project cards
    renderProjects();

    // Initialize modules
    initTheme();
    const { navbar, navLinkItems } = initNavigation();
    const cursorModule = initCursor();
    const parallaxModule = initParallax();
    const heroParallax = initHeroParallax();
    const activeNav = initActiveNavTracking(navLinkItems);

    // Init after cards are rendered
    initCardInteractions();
    initFilters();

    // Single consolidated scroll handler
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        // Navbar scroll effect
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Parallax scroll
        parallaxModule.onScroll();

        // Hero parallax
        heroParallax.onScroll();

        // Active nav tracking
        activeNav.onScroll();
    });

    // Single consolidated mousemove handler
    document.addEventListener('mousemove', (e) => {
        if (cursorModule.enabled) {
            cursorModule.onMouseMove(e);
        }
        parallaxModule.onMouseMove(e);
    });

    // Trigger initial state
    activeNav.onScroll();
    heroParallax.onScroll();
}

// Start the app
document.addEventListener('DOMContentLoaded', init);
