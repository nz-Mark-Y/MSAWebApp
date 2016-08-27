var currencySelected = "AUD";
var conversionSelected = "setLocal";
function init() {
    document.getElementById("currencyForm").addEventListener("click", function () {
        currencySelected = document.querySelector('input[name=currency]:checked').value;
        document.getElementById("statusText").innerHTML = "You have selected " + currencySelected + ".";
        setPlaceholderText();
    });
    document.getElementById("conversionForm").addEventListener("click", function () {
        setPlaceholderText();
    });
    document.getElementById("goButton").addEventListener("click", function () {
        alert("You want to " + conversionSelected + " with " + currencySelected);
    });
}
function setPlaceholderText() {
    conversionSelected = document.querySelector('input[name=conversion]:checked').value;
    if (conversionSelected === "setLocal") {
        document.getElementById("inputBox").placeholder = "Enter how much NZD you want to convert to " + currencySelected;
    }
    else if (conversionSelected === "setForeign") {
        document.getElementById("inputBox").placeholder = "Enter how much " + currencySelected + " you want to buy";
    }
    else {
        document.getElementById("inputBox").placeholder = "Enter how much " + currencySelected + " you want to sell";
    }
}
