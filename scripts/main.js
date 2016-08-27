var currencySelected = "AUD";
var conversionSelected = "setLocal";
var currencyData;
// Runs on the loading of the page
function init() {
    getData();
    document.getElementById("currencyForm").addEventListener("click", function () {
        currencySelected = document.querySelector('input[name=currency]:checked').value;
        document.getElementById("statusText").innerHTML = "You have selected " + currencySelected + ".";
        setPlaceholderText();
    });
    document.getElementById("conversionForm").addEventListener("click", function () {
        setPlaceholderText();
    });
    document.getElementById("goButton").addEventListener("click", function () {
        calcAndDisplay();
    });
}
//Allows the use of enter key rather than the button
function inputKeyUp(e) {
    e.which = e.which || e.keyCode;
    if (e.which == 13) {
        calcAndDisplay();
    }
}
// Calculates and displays the result
function calcAndDisplay() {
    var inputString = document.getElementById("inputBox").value;
    var isNumber = /^[0-9.]+$/.test(inputString);
    if ((inputString === "") || (!isNumber)) {
        document.getElementById("output").innerHTML = "Please enter an amount";
    }
    else {
        var rate = 0;
        rate = currencyData[currencySelected];
        var outputAmount;
        if (conversionSelected === "setLocal") {
            outputAmount = (parseInt(inputString) * rate).toFixed(2);
            document.getElementById("output").innerHTML = "$" + inputString + " NZD will buy you " + "$" + outputAmount + " " + currencySelected + ".";
        }
        else if (conversionSelected === "setForeign") {
            outputAmount = (parseInt(inputString) / rate).toFixed(2);
            document.getElementById("output").innerHTML = "$" + inputString + " " + currencySelected + " will cost you " + "$" + outputAmount + " NZD.";
        }
        else {
            outputAmount = ((1 / rate) * parseInt(inputString)).toFixed(2);
            document.getElementById("output").innerHTML = "$" + inputString + " " + currencySelected + " will buy you " + "$" + outputAmount + " NZD.";
        }
    }
}
// Sets the placeholder text of the input text box
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
// XMLHttpRequest which obtains JSON data from the fixer.io API and then parses it into an array
function getData() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) {
                var dataArray;
                dataArray = JSON.parse(xmlhttp.responseText);
                currencyData = dataArray.rates;
            }
            else if (xmlhttp.status == 400) {
                alert('There was an error 400');
            }
            else {
                alert('Something else other than 200 was returned');
            }
        }
    };
    xmlhttp.open("GET", "http://api.fixer.io/latest?base=NZD");
    xmlhttp.send();
}
