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
        var inputString = document.getElementById("inputBox").value;
        var isNumber = /^[0-9.]+$/.test(inputString);
        if ((inputString === "") || (!isNumber)) {
            alert("Please enter an amount");
        }
        else {
            var rate = getRate();
            var outputAmount = 0;
            if (conversionSelected === "setLocal") {
                outputAmount = parseInt(inputString) * rate;
            }
            else if (conversionSelected === "setForeign") {
                outputAmount = parseInt(inputString) / rate;
            }
            else {
                outputAmount = (1 / rate) * parseInt(inputString);
            }
            document.getElementById("output").innerHTML = outputAmount.toString();
        }
    });
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
//Pulls the exchange rate out of the currencyData object
function getRate() {
    var rate = 0;
    if (currencySelected === "AUD") {
        rate = currencyData['AUD'];
    }
    if (currencySelected === "GBP") {
        rate = currencyData['GBP'];
    }
    return rate;
}
