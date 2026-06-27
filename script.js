// ==========================
// Welcome Message
// ==========================
window.addEventListener("load", () => {
    console.log("Welcome to Vignesh S Portfolio");
});

// ==========================
// Smooth Scrolling
// ==========================
document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});

// ==========================
// Active Navigation
// ==========================
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.pageYOffset >= sectionTop) {
            current = section.getAttribute("id");
        }
    });
    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});

// ==========================
// Scroll Fade Animation
// ==========================
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll("section, .project-card, .certificate-card, .skill").forEach(element => {
    element.classList.add("hidden");
    observer.observe(element);
});

// ==========================
// Dark Mode Toggle
// ==========================
const toggle = document.getElementById("theme-toggle");

toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    if (document.body.classList.contains("dark")) {
        toggle.textContent = "☀️";
        localStorage.setItem("theme", "dark");
    } else {
        toggle.textContent = "🌙";
        localStorage.setItem("theme", "light");
    }
    initParticles();
});

// ==========================
// Remember Theme
// ==========================
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    toggle.textContent = "☀️";
} else {
    toggle.textContent = "🌙";
}

// ==========================
// HERO PARTICLE CANVAS
// ==========================
function initParticles() {
    const old = document.getElementById("hero-canvas");
    if (old) old.remove();

    const hero = document.getElementById("hero");
    const canvas = document.createElement("canvas");
    canvas.id = "hero-canvas";
    hero.prepend(canvas);

    const ctx = canvas.getContext("2d");
    let W, H, particles, animId;

    function resize() {
        W = canvas.width  = hero.offsetWidth;
        H = canvas.height = hero.offsetHeight;
    }

    function makeParticle() {
        return {
            x: Math.random() * W,
            y: Math.random() * H,
            r: Math.random() * 2.2 + 0.5,
            vx: (Math.random() - 0.5) * 0.45,
            vy: (Math.random() - 0.5) * 0.45,
            alpha: Math.random() * 0.5 + 0.2,
        };
    }

    function initArr() {
        const count = Math.floor((W * H) / 9000);
        particles = Array.from({ length: Math.min(count, 120) }, makeParticle);
    }

    function draw() {
        ctx.clearRect(0, 0, W, H);

        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 130) {
                    const a = (1 - dist / 130) * 0.18;
                    ctx.strokeStyle = `rgba(99,102,241,${a})`;
                    ctx.lineWidth = 0.8;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }

        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(56,189,248,${p.alpha})`;
            ctx.shadowBlur = 8;
            ctx.shadowColor = "rgba(56,189,248,0.6)";
            ctx.fill();
            ctx.shadowBlur = 0;

            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0)  p.x = W;
            if (p.x > W)  p.x = 0;
            if (p.y < 0)  p.y = H;
            if (p.y > H)  p.y = 0;
        });

        animId = requestAnimationFrame(draw);
    }

    resize();
    initArr();
    if (animId) cancelAnimationFrame(animId);
    draw();

    window.addEventListener("resize", () => { resize(); initArr(); });
}

window.addEventListener("load", initParticles);
