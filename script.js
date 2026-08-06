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
// إغلاق القائمة عند الضغط خارجها
document.addEventListener("click", (e) => {
    if (!navbar.contains(e.target) && !menuBtn.contains(e.target)) {
        navbar.classList.remove("active");
    }
});

// إغلاق القائمة عند الضغط على زر Escape
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        navbar.classList.remove("active");
    }
});

// تشغيل تأثير الهيدر مباشرة
window.dispatchEvent(new Event("scroll"));
});
// زر العودة للأعلى
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        backToTop.style.display = "block";
    } else {
        backToTop.style.display = "none";
    }
});

backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}// ===============================
// Contact Form -> WhatsApp
// ===============================

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;
const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function(e){

        e.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        const subject = encodeURIComponent("رسالة جديدة من موقع MOHSEN PRO");

        const body = encodeURIComponent(
`الاسم: ${name}

البريد الإلكتروني:
${email}

الرسالة:
${message}`
        );

        window.location.href =
`mailto:mohsenpro774@gmail.com?subject=${subject}&body=${body}`;

    });

}