const burger = document.querySelector("#burger");
var expand = document.querySelector("#burger-expand");
burger.addEventListener("click", function() {
    if (expand.style.display === "none") {
        expand.style.display = "flex";
    }
    else {
        expand.style.display = "none";
    }
})