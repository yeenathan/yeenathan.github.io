function clicked() {
    if (clickToggle) {
        output.innerHTML="";
        clickToggle=false;
        return;
    }
    clickToggle=true;
    output.innerHTML = "Clicked!";
}

var clickMeButton = document.getElementById("clickMe");
var output = document.getElementById("output");

var clickToggle = false;

clickMeButton.addEventListener("click", function(){clicked()});