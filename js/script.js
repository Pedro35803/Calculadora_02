document.querySelector("#change_theme").addEventListener("click", () => {
    const page = document.querySelector("body");
    page.classList.toggle("theme_dark");
});