/* ==========================================================================
   1. HAMBURGER MENU RESPONSIF
   ========================================================================== */
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

if (hamburger) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Menutup menu setelah link diklik (khusus mode HP)
  navLinks.forEach((n) =>
    n.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    }),
  );
}

/* ==========================================================================
   2. HIGHLIGHT MENU OTOMATIS SAAT DI-SCROLL (Active Link)
   ========================================================================== */
const sections = document.querySelectorAll("section, header");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    // Memberikan toleransi agar perpindahan menu terasa pas di mata
    if (pageYOffset >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
});

/* ==========================================================================
   3. EFEK INTERAKTIF 3D TILT & GLOW (Timbul & Berubah Warna saat Disentuh)
   ========================================================================== */
// Targetkan kartu-kartu yang ingin diberi efek interaktif timbul
const interactiveCards = document.querySelectorAll(
  ".profile-card, .timeline-item, .cert-card, .skill-card, .contact-item",
);

interactiveCards.forEach((card) => {
  // Berikan transisi default yang halus agar tidak patah-patah
  card.style.transition =
    "transform 0.1s ease, box-shadow 0.3s ease, background-color 0.3s ease, border-color 0.3s ease";

  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();

    // Menghitung posisi kursor relatif terhadap kartu (koordinat X dan Y)
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Menghitung titik tengah kartu
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Membuat efek rotasi kemiringan (maksimal 6 derajat agar elegan, tidak berlebihan)
    const rotateX = ((centerY - y) / centerY) * 6;
    const rotateY = ((x - centerX) / centerX) * 6;

    // Eksekusi efek timbul (scale up), miring (rotate), dan bayangan menyala (glow)
    card.style.transform = `perspective(1000px) scale(1.03) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    card.style.boxShadow = "0 15px 35px rgba(15, 118, 110, 0.15)";

    // Sentuhan efek khusus pada border kiri jika ada
    if (
      card.classList.contains("profile-card") ||
      card.closest("#pengalaman")
    ) {
      card.style.borderLeftColor = "#0284c7"; // Berubah dari Teal ke Tech Blue saat disentuh
    }
  });

  // Kembalikan ke posisi semula saat kursor keluar dari kartu
  card.addEventListener("mouseleave", () => {
    card.style.transform =
      "perspective(1000px) scale(1) rotateX(0deg) rotateY(0deg)";
    card.style.boxShadow = "";

    if (card.classList.contains("profile-card")) {
      card.style.borderLeftColor = "#0f766e"; // Kembali ke warna semula
    }
    if (
      card.closest("#pengalaman") &&
      card.classList.contains("timeline-item")
    ) {
      card.style.borderLeftColor = "#0f766e";
    }
  });
});

/* ==========================================================================
   4. ANIMASI LOADING BAR SKILLS SAAT DI-SCROLL
   ========================================================================== */
const progressBars = document.querySelectorAll(".progress");

const showProgress = () => {
  progressBars.forEach((progressBar) => {
    const value = progressBar.style.width;
    // Set awal ke 0 sebelum masuk viewport
    progressBar.style.width = "0";

    const rect = progressBar.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom >= 0) {
      // Kembalikan ke nilai asli dengan animasi halus
      progressBar.style.width = value;
    }
  });
};

// Jalankan fungsi saat pertama kali dimuat dan saat halaman di-scroll
window.addEventListener("scroll", showProgress);
window.addEventListener("DOMContentLoaded", showProgress);
