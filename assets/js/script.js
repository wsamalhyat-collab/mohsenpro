// ===============================
// MOHSEN PRO v1.0
// Mobile Menu
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    const menuBtn = document.querySelector(".menu-toggle");
    const navbar = document.querySelector(".navbar");

    if(menuBtn && navbar){

        menuBtn.addEventListener("click", () => {

            navbar.classList.toggle("active");

        });

    }

});
