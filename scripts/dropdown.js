const personasDropdown = document.querySelector("#personas-sitemap-toggle");
var personasSitemap = document.querySelector("#personas-sitemap");
personasDropdown.addEventListener("click", function() {
    if (personasSitemap.style.display === "none") {
        personasSitemap.style.display = "block";
    }
    else {
        personasSitemap.style.display = "none";
    }
})