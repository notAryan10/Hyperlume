class PixelParticle {
    constructor(x, y) {
        this.element = document.createElement('div');
        this.element.className = 'pixel-particle';
        this.element.style.left = x + 'px';
        this.element.style.top = y + 'px';
        
        // Random size for each particle
        const size = Math.random() * 6 + 4; // 4-10px
        this.element.style.width = `${size}px`;
        this.element.style.height = `${size}px`;
        
        // Set color and initial properties
        const color = this.getRandomColor();
        this.element.style.backgroundColor = color;
        this.element.style.boxShadow = `0 0 ${size * 2}px ${color}`;
        
        // Add rotation
        this.rotation = Math.random() * 360;
        this.rotationSpeed = (Math.random() - 0.5) * 10;
        
        // Add velocity for movement
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.x = x;
        this.y = y;
        
        this.life = 1;
        this.decay = Math.random() * 0.01 + 0.02; // Reduced decay rate (was 0.02 + 0.03)
        document.body.appendChild(this.element);
    }

    getRandomColor() {
        const colors = [
            '#FFD700', // Gold
            '#FF1493', // Pink
            '#FF4500', // Orange
            '#4169E1', // Royal Blue
            '#32CD32', // Lime Green
            '#FF69B4', // Hot Pink
            '#00FFFF'  // Cyan
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        this.life -= this.decay;
        if (this.life <= 0) {
            this.element.remove();
            return false;
        }

        // Update position with velocity
        this.x += this.vx;
        this.y += this.vy;
        
        // Update rotation
        this.rotation += this.rotationSpeed;
        
        // Apply changes
        this.element.style.transform = `
            translate(-50%, -50%) 
            rotate(${this.rotation}deg) 
            scale(${this.life})
        `;
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
        this.element.style.opacity = this.life;
        
        return true;
    }
}

class PixelTrail {
    constructor() {
        this.particles = [];
        this.throttleTime = 20; // Increased spawn rate
        this.lastSpawn = 0;
        this.maxParticles = 100; // Limit total particles for performance
        
        document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.animate();
    }

    handleMouseMove(e) {
        const currentTime = Date.now();
        if (currentTime - this.lastSpawn > this.throttleTime) {
            // Create multiple particles per spawn
            const numParticles = Math.floor(Math.random() * 2) + 1;
            for (let i = 0; i < numParticles; i++) {
                if (this.particles.length < this.maxParticles) {
                    this.particles.push(new PixelParticle(e.clientX, e.clientY));
                }
            }
            this.lastSpawn = currentTime;
        }
    }

    animate() {
        this.particles = this.particles.filter(particle => particle.update());
        requestAnimationFrame(() => this.animate());
    }
}

// Add styles
const style = document.createElement('style');
style.textContent = `
    .pixel-particle {
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        border-radius: 2px;
        mix-blend-mode: screen;
        will-change: transform, opacity;
    }
`;
document.head.appendChild(style);

// Initialize trail
window.addEventListener('DOMContentLoaded', () => {
    new PixelTrail();
}); 