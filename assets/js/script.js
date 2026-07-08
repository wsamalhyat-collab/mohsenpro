// ===============================
// MOHSEN PRO v1.1
// Mobile Menu + Sticky Header
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    const menuBtn = document.querySelector(".menu-toggle");
    const navbar = document.querySelector(".navbar");
    const navLinks = document.querySelectorAll(".navbar a");
    const header = document.querySelector("header");

    // فتح وإغلاق القائمة
    if (menuBtn && navbar) {
        menuBtn.addEventListener("click", () => {
            navbar.classList.toggle("active");
        });
    }

    // إغلاق القائمة بعد الضغط على أي رابط
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navbar.classList.remove("active");
        });
    });

    // تأثير الهيدر عند التمرير
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

});
