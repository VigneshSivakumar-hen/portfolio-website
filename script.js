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

            target.scrollIntoView({
                behavior: "smooth"
            });

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

}, {
    threshold: 0.2
});

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
