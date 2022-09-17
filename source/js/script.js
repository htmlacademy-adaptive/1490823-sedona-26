const buttonToggle = document.querySelector(".button-toggle");
const navigation = document.querySelector(".navigation");

buttonToggle.addEventListener("click", ()=>
  buttonToggle.classList.toggle("button-toggle--close"),
  navigation.classList.toggle("navigation--hidden")
)
