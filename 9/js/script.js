let burgerButton = document.getElementById("burger-button");
let closeButton = document.getElementById("close-button");
let element = document.getElementById("navigation");

burgerButton.onclick = showMobileMenu;

function showMobileMenu() {
    element.classList.remove("navigation--hidden");
    closeButton.classList.remove("button-hidden");
}

closeButton.onclick = closeMobileMenu;

function closeMobileMenu () {
    element.classList.add("navigation--hidden");
    closeButton.classList.add("button-hidden");
}