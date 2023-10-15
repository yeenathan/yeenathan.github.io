var main = document.getElementById("main");
var smallMain = document.getElementById("main-small");
var mainNav = document.getElementById("main-nav");
var smallNav = document.getElementById("small-nav");

window.addEventListener("resize", check);

function check() {
    if (window.innerWidth < 1000) {
        smallMain.style.display = "block";
        main.style.display = "none";
        smallNav.style.display = "block";
        mainNav.style.display = "none";
    }
    else {
        smallMain.style.display = "none";
        main.style.display = "block";
        smallNav.style.display = "none";
        mainNav.style.display = "block";
    }
}