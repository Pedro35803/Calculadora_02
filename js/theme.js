const userTheme = window.matchMedia('(prefers-color-scheme: dark)');
const checkBox = document.querySelector("#change_theme");
const page = document.querySelector("body");

checkBox.addEventListener("click", () => {
    page.classList.toggle("theme_dark");
});

if (userTheme.matches) {
    page.classList.add("theme_dark");
    checkBox.checked = false;
}