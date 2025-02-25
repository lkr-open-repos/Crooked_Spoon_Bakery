document.addEventListener("DOMContentLoaded", () => {
    // Hero section parallax effect
    const hero = document.querySelector(".hero");
    const heroBg = document.querySelector(".hero-bg");

    hero.addEventListener("mousemove", (e) => {
        const { offsetWidth: width, offsetHeight: height } = hero;
        const { clientX: x, clientY: y } = e;
        const moveX = ((x - width / 2) / width) * 20;
        const moveY = ((y - height / 2) / height) * 20;
        heroBg.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.1)`;
    });

    hero.addEventListener("mouseleave", () => {
        heroBg.style.transform = "translate(0, 0) scale(1)";
    });

    // Testimonial carousel
    const carousel = document.querySelector(".testimonial-carousel");
    const cards = carousel.querySelectorAll(".testimonial-card");
    const prevBtn = document.querySelector(".carousel-control.prev");
    const nextBtn = document.querySelector(".carousel-control.next");
    let currentIndex = 0;

    function showTestimonial(index) {
        cards.forEach((card, i) => {
            card.classList.toggle("active", i === index);
        });
    }

    showTestimonial(currentIndex);

    nextBtn.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % cards.length;
        showTestimonial(currentIndex);
    });

    prevBtn.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        showTestimonial(currentIndex);
    });

    // Automatic rotation every 5 seconds
    setInterval(() => {
        currentIndex = (currentIndex + 1) % cards.length;
        showTestimonial(currentIndex);
    }, 5000);

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute("href")).scrollIntoView({
                behavior: "smooth",
            });
        });
    });

    // Intersection Observer for fade-in animation
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("fade-in");
                }
            });
        },
        { threshold: 0.1 },
    );

    document
        .querySelectorAll(
            ".product-card, .story-content, .story-image, .menu-section, .gallery-section",
        )
        .forEach((element) => {
            element.style.opacity = "0";
            element.style.transition = "opacity 0.5s ease";
            observer.observe(element);
        });

    // Add hover animation to social icons
    const socialIcons = document.querySelectorAll(".social-icons a");
    socialIcons.forEach((icon) => {
        icon.addEventListener("mouseenter", () => {
            icon.style.transform = "translateY(-3px)";
            icon.style.transition = "transform 0.3s ease";
        });
        icon.addEventListener("mouseleave", () => {
            icon.style.transform = "translateY(0)";
        });
    });

    // Menu Category Filtering
    const categoryButtons = document.querySelectorAll(".menu-category-btn");
    const menuItems = document.querySelectorAll(".menu-item");

    categoryButtons.forEach((button) => {
        button.addEventListener("click", function () {
            categoryButtons.forEach((btn) => btn.classList.remove("active"));
            this.classList.add("active");
            const category = this.dataset.category;

            menuItems.forEach((item) => {
                if (category === "all" || item.dataset.category === category) {
                    item.style.display = "block";
                } else {
                    item.style.display = "none";
                }
            });
        });
    });
});
