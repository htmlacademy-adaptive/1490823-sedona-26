let buttonToggle = document.getElementById("button-toggle");
let navigation = document.getElementById("navigation");

console.log(navigation);

buttonToggle.onclick = showMobileMenu;

function showMobileMenu() {
    buttonToggle.classList.toggle("button-toggle--close");
    navigation.classList.toggle("navigation-hidden");
}
