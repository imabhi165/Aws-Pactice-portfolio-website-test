// Hamburger menu functionality
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Close mobile menu when clicking on a link
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    }
  });
}
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe cards
document.querySelectorAll(".card").forEach((card) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(30px)";
  card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(card);
});

// Navbar background change on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(17, 24, 39, 0.98)";
    navbar.style.backdropFilter = "blur(25px)";
    navbar.style.webkitBackdropFilter = "blur(25px)";
  } else {
    navbar.style.background = "rgba(17, 24, 39, 0.95)";
    navbar.style.backdropFilter = "blur(20px)";
    navbar.style.webkitBackdropFilter = "blur(20px)";
  }
});

// Active link highlighting
document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    const linkHref = link.getAttribute("href");
    if (linkHref === currentPage) {
      link.classList.add("active");
    }
  });
});
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);

    // Show success message (in a real app, you'd send this to a server)
    showMessage();

    // Reset form
    this.reset();
  });
}

function showMessage() {
  const msgElement = document.getElementById("msg");
  if (msgElement) {
    msgElement.style.display = "block";
    msgElement.style.opacity = "0";
    msgElement.style.transform = "translateY(20px)";
    msgElement.style.transition = "opacity 0.3s ease, transform 0.3s ease";

    setTimeout(() => {
      msgElement.style.opacity = "1";
      msgElement.style.transform = "translateY(0)";
    }, 100);

    // Hide message after 5 seconds
    setTimeout(() => {
      msgElement.style.opacity = "0";
      msgElement.style.transform = "translateY(-20px)";
      setTimeout(() => {
        msgElement.style.display = "none";
      }, 300);
    }, 5000);
  }
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

function scrollToBottom() {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth",
  });
}

// Typing animation for hero section
document.addEventListener("DOMContentLoaded", () => {
  const typingText = document.querySelector(".typing-text");
  if (typingText) {
    const text = "Full Stack Developer & UI/UX Designer";
    let index = 0;
    let isDeleting = false;

    function typeWriter() {
      const currentText = text.substring(0, index);
      typingText.innerHTML = currentText + '<span class="cursor">|</span>';

      if (!isDeleting && index < text.length) {
        index++;
        setTimeout(typeWriter, 100);
      } else if (isDeleting && index > 0) {
        index--;
        setTimeout(typeWriter, 50);
      } else {
        isDeleting = !isDeleting;
        setTimeout(typeWriter, 2000);
      }
    }

    typeWriter();
  }
});

// Stats counter animation
function animateStats() {
  const statNumbers = document.querySelectorAll(".stat-number");
  const observerOptions = {
    threshold: 0.5,
    rootMargin: "0px 0px -50px 0px",
  };

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const targetValue = parseInt(target.getAttribute("data-target"));
        let currentValue = 0;
        const increment = targetValue / 100;

        const timer = setInterval(() => {
          currentValue += increment;
          if (currentValue >= targetValue) {
            target.textContent = targetValue;
            clearInterval(timer);
          } else {
            target.textContent = Math.floor(currentValue);
          }
        }, 20);

        statsObserver.unobserve(target);
      }
    });
  }, observerOptions);

  statNumbers.forEach((stat) => {
    statsObserver.observe(stat);
  });
}

// Progress bar animation
function animateProgressBars() {
  const progressBars = document.querySelectorAll(".progress-bar");
  const observerOptions = {
    threshold: 0.5,
    rootMargin: "0px 0px -50px 0px",
  };

  const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const targetWidth = target.getAttribute("data-width") || "85%";
        target.style.width = targetWidth;
        progressObserver.unobserve(target);
      }
    });
  }, observerOptions);

  progressBars.forEach((bar) => {
    progressObserver.observe(bar);
  });
}

// Initialize animations when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  animateStats();
  animateProgressBars();
});
