// Get modal elements
const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');

// Get buttons
const loginBtn = document.querySelector('.btn.login');
const registerBtn = document.querySelector('.btn.register');

// Get close buttons
const closeButtons = document.querySelectorAll('.close');

// Modal handling
if (loginBtn && loginModal) {
    loginBtn.addEventListener('click', () => {
        loginModal.style.display = 'block';
    });
}

if (registerBtn && registerModal) {
    registerBtn.addEventListener('click', () => {
        registerModal.style.display = 'block';
    });
}

// Close modals when clicking the X button
closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (loginModal) loginModal.style.display = 'none';
        if (registerModal) registerModal.style.display = 'none';
    });
});

// Close modals when clicking outside
window.addEventListener('click', (event) => {
    if (event.target === loginModal) {
        loginModal.style.display = 'none';
    }
    if (event.target === registerModal) {
        registerModal.style.display = 'none';
    }
});

// Handle form submissions
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        console.log('Login attempt:', { email, password });
        loginModal.style.display = 'none';
    });
}

const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        
        console.log('Registration attempt:', { name, email, password });
        registerModal.style.display = 'none';
    });
}

// Handle team submission form
const teamSubmissionForm = document.getElementById('teamSubmissionForm');
if (teamSubmissionForm) {
    teamSubmissionForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const teamData = {
            teamName: document.getElementById('teamName').value,
            leader: {
                name: document.getElementById('leaderName').value,
                email: document.getElementById('leaderEmail').value,
                urn: document.getElementById('leaderURN').value
            },
            member2: {
                name: document.getElementById('member2Name').value,
                email: document.getElementById('member2Email').value,
                urn: document.getElementById('member2URN').value
            },
            member3: {
                name: document.getElementById('member3Name').value || 'Not provided',
                email: document.getElementById('member3Email').value || 'Not provided',
                urn: document.getElementById('member3URN').value || 'Not provided'
            }
        };
        
        console.log('Team Registration:', teamData);
        alert('Team registration submitted successfully!');
        e.target.reset();
    });
}

// Background effects
document.addEventListener('DOMContentLoaded', () => {
    // Remove any existing background
    const existingBackground = document.querySelector('.retro-background');
    if (existingBackground) {
        existingBackground.remove();
    }

    // Create new background
    const background = document.createElement('div');
    background.className = 'retro-background';
    document.body.appendChild(background);

    // Add grid
    const grid = document.createElement('div');
    grid.className = 'grid';
    background.appendChild(grid);

    // Add scanlines
    for (let i = 0; i < 3; i++) {
        const scanline = document.createElement('div');
        scanline.className = 'scanline';
        scanline.style.animationDelay = `${i * 2}s`;
        background.appendChild(scanline);
    }

    // Add glow effects
    for (let i = 0; i < 3; i++) {
        const glow = document.createElement('div');
        glow.className = 'glow';
        glow.style.left = `${Math.random() * 100}%`;
        glow.style.top = `${Math.random() * 100}%`;
        glow.style.animationDelay = `${i * -2.5}s`;
        background.appendChild(glow);
    }

    // Create coin background container
    const coinBackground = document.createElement('div');
    coinBackground.className = 'coin-background';
    document.body.appendChild(coinBackground);

    // Create coins
    function createCoin() {
        const coin = document.createElement('div');
        coin.className = 'coin';
        coin.style.left = `${Math.random() * 100}%`;
        const duration = 4 + Math.random() * 4;
        coin.style.animation = `coinFloat ${duration}s linear`;
        coinBackground.appendChild(coin);

        coin.addEventListener('animationend', () => {
            coin.remove();
        });

        setTimeout(createCoin, Math.random() * 2000);
    }

    // Create mushrooms
    function createMushroom() {
        const mushroom = document.createElement('div');
        mushroom.className = 'mushroom';
        mushroom.style.left = `${Math.random() * 100}%`;
        const duration = 6 + Math.random() * 4;
        mushroom.style.animation = `mushroomFloat ${duration}s linear`;
        coinBackground.appendChild(mushroom);

        mushroom.addEventListener('animationend', () => {
            mushroom.remove();
        });

        setTimeout(createMushroom, Math.random() * 3000);
    }

    // Initialize coins and mushrooms
    for (let i = 0; i < 5; i++) {
        setTimeout(createCoin, Math.random() * 2000);
    }
    for (let i = 0; i < 3; i++) {
        setTimeout(createMushroom, Math.random() * 3000);
    }
});

// Scroll animation function
function handleScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe elements
    const section = document.querySelector('.special-guest');
    const card = document.querySelector('.guest-card');
    const image = document.querySelector('.guest-image');
    const info = document.querySelector('.guest-info');

    observer.observe(section);
    observer.observe(card);
    observer.observe(image);
    observer.observe(info);
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', handleScrollAnimations);

// Optional: Add a scroll progress indicator
function addScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = `${progress}%`;
    });
}

// Add these styles for the progress bar
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        width: 0;
        height: 3px;
        background: linear-gradient(to right, #ff8800, #ff00f7);
        z-index: 1000;
        transition: width 0.2s ease;
    }
`;
document.head.appendChild(styleSheet);

// Initialize scroll progress
addScrollProgress();

// Add smooth scrolling with glide effect
let scrollTimeout;
let lastScrollPosition = window.pageYOffset;
let ticking = false;

function smoothScroll() {
    const currentScroll = window.pageYOffset;
    const distance = lastScrollPosition - currentScroll;
    
    if (Math.abs(distance) > 1) {
        window.scrollTo({
            top: currentScroll + (distance * 0.15),
            behavior: 'auto'
        });
        requestAnimationFrame(smoothScroll);
    }
}

window.addEventListener('scroll', () => {
    lastScrollPosition = window.pageYOffset;
    
    // Clear the previous timeout
    clearTimeout(scrollTimeout);
    
    // Set new timeout
    scrollTimeout = setTimeout(() => {
        if (!ticking) {
            requestAnimationFrame(() => {
                smoothScroll();
                ticking = false;
            });
            ticking = true;
        }
    }, 800); // 0.8 seconds delay
});

// Add this code to handle header visibility
document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.main-header');
    let lastScrollY = window.scrollY;
    let isHeaderVisible = true;
    
    // Create trigger area
    const triggerArea = document.createElement('div');
    triggerArea.className = 'header-trigger-area';
    document.body.appendChild(triggerArea);

    // Handle scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > lastScrollY && isHeaderVisible && window.scrollY > 100) {
            // Scrolling down - hide header
            header.classList.add('hidden');
            isHeaderVisible = false;
        } else if (window.scrollY < lastScrollY && !isHeaderVisible) {
            // Scrolling up - show header
            header.classList.remove('hidden');
            isHeaderVisible = true;
        }
        lastScrollY = window.scrollY;
    });

    // Handle mouse movement
    triggerArea.addEventListener('mouseenter', () => {
        header.classList.remove('hidden');
        isHeaderVisible = true;
    });

    // Optional: Hide header when mouse leaves the header area
    header.addEventListener('mouseleave', (e) => {
        if (window.scrollY > 100 && !triggerArea.matches(':hover')) {
            header.classList.add('hidden');
            isHeaderVisible = false;
        }
    });
}); 