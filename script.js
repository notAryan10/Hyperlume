// Get modal elements
const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');

// Get buttons
const loginBtn = document.querySelector('.btn.login');
const registerBtn = document.querySelector('.btn.register');

// Get close buttons
const closeButtons = document.querySelectorAll('.close');

// Open login modal
loginBtn.addEventListener('click', () => {
    loginModal.style.display = 'block';
});

// Open register modal
registerBtn.addEventListener('click', () => {
    registerModal.style.display = 'block';
});

// Close modals when clicking the X button
closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        loginModal.style.display = 'none';
        registerModal.style.display = 'none';
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
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    console.log('Login attempt:', { email, password });
    // Add your login logic here
    loginModal.style.display = 'none';
});

document.getElementById('registerForm').addEventListener('submit', (e) => {
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

// Handle team submission form
document.getElementById('teamSubmissionForm').addEventListener('submit', (e) => {
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

// Add this to your existing script.js
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

    function createCoin() {
        const coin = document.createElement('div');
        coin.className = 'coin';
        
        // Random horizontal position
        coin.style.left = `${Math.random() * 100}%`;
        
        // Random duration between 4 and 8 seconds
        const duration = 4 + Math.random() * 4;
        
        // Apply the animation
        coin.style.animation = `coinFloat ${duration}s linear`;
        
        coinBackground.appendChild(coin);

        // Remove coin after animation completes
        coin.addEventListener('animationend', () => {
            coin.remove();
        });

        // Create next coin after random delay
        setTimeout(createCoin, Math.random() * 2000); // Random delay up to 2 seconds
    }

    // Create initial batch of coins
    for (let i = 0; i < 5; i++) {
        setTimeout(createCoin, Math.random() * 2000);
    }

    // Create mushroom background container
    const mushroomBackground = document.createElement('div');
    mushroomBackground.className = 'coin-background'; // Reuse the same container class
    document.body.appendChild(mushroomBackground);

    function createMushroom() {
        const mushroom = document.createElement('div');
        mushroom.className = 'mushroom';
        
        // Random horizontal position
        mushroom.style.left = `${Math.random() * 100}%`;
        
        // Random duration between 6 and 10 seconds (slower than coins)
        const duration = 6 + Math.random() * 4;
        
        // Apply the animation
        mushroom.style.animation = `mushroomFloat ${duration}s linear`;
        
        mushroomBackground.appendChild(mushroom);

        // Remove mushroom after animation completes
        mushroom.addEventListener('animationend', () => {
            mushroom.remove();
        });

        // Create next mushroom after random delay
        setTimeout(createMushroom, Math.random() * 3000); // Random delay up to 3 seconds
    }

    // Create initial batch of mushrooms
    for (let i = 0; i < 3; i++) { // Start with fewer mushrooms
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