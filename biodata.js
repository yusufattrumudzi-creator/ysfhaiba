// --- INTERAKSI HAMBURGER MENU (MOBILE) ---
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
}

// Tutup menu saat link diklik
const navLink = document.querySelectorAll(".nav-link");

navLink.forEach(n => n.addEventListener("click", closeMenu));

function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}

// --- ACTIVE LINK SEWAKTU DI-SCROLL ---
const sections = document.querySelectorAll("section, header");
window.addEventListener("scroll", navHighlighter);

function navHighlighter() {
  let scrollY = window.pageYOffset;
  
  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 70; // 70 adalah perkiraan tinggi navbar
    let sectionId = current.getAttribute("id");
    
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelector(".nav-menu a[href*=" + sectionId + "]").classList.add("active");
    } else {
      document.querySelector(".nav-menu a[href*=" + sectionId + "]").classList.remove("active");
    }
  });
}