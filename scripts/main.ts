var currencySelected : string  = "AUD";
var conversionSelected : string = "setLocal";
var currencyData : any;

// Runs on the loading of the page
function init() {
    getData();
    document.getElementById("currencyForm").addEventListener("click", function(){
        currencySelected = document.querySelector('input[name=currency]:checked').value;
        document.getElementById("statusText").innerHTML = "You have selected " + currencySelected + ".";
        setPlaceholderText();
    });
    document.getElementById("conversionForm").addEventListener("click", function(){
         setPlaceholderText();
    });
    document.getElementById("goButton").addEventListener("click", function(){
        var inputString : string = document.getElementById("inputBox").value;
        var isNumber : boolean = /^[0-9.]+$/.test(inputString);
        if ((inputString === "") || (!isNumber)) {
            alert("Please enter an amount")
        } else {
            var rate : number = getRate();
            var outputAmount : number = 0;
            if (conversionSelected === "setLocal") {
                outputAmount = parseInt(inputString)*rate;
            } else if (conversionSelected === "setForeign"){
                outputAmount = parseInt(inputString)/rate;
            } else {
                outputAmount = (1/rate)*parseInt(inputString);
            }
            document.getElementById("output").innerHTML = outputAmount.toString();
        }
    });
}

// Sets the placeholder text of the input text box
function setPlaceholderText () {
    conversionSelected = document.querySelector('input[name=conversion]:checked').value;
    if (conversionSelected === "setLocal") {
        document.getElementById("inputBox").placeholder = "Enter how much NZD you want to convert to " + currencySelected;
    } else if (conversionSelected === "setForeign"){
        document.getElementById("inputBox").placeholder = "Enter how much " + currencySelected + " you want to buy";
    } else {
        document.getElementById("inputBox").placeholder = "Enter how much " + currencySelected + " you want to sell";
    }
}

// XMLHttpRequest which obtains JSON data from the fixer.io API and then parses it into an array
function getData() {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
    	if (xmlhttp.readyState == 4 ) {
        	if (xmlhttp.status == 200) {
                var dataArray: any[];
        		dataArray = JSON.parse(xmlhttp.responseText);
                currencyData=dataArray.rates;
        	} else if (xmlhttp.status == 400) {
            	alert('There was an error 400');
        	} else {
            	alert('Something else other than 200 was returned');
        	}
    	}
	};
    xmlhttp.open("GET", "http://api.fixer.io/latest?base=NZD");
    xmlhttp.send();
}

//Pulls the exchange rate out of the currencyData object
function getRate() {
    var rate : number = 0;
    if (currencySelected === "AUD") {rate = currencyData['AUD'];}
    if (currencySelected === "BRL") {rate =currencyData['BRL'];}
    if (currencySelected === "GBP") {rate =currencyData['GBP'];}
    if (currencySelected === "CAD") {rate =currencyData['CAD'];}
    if (currencySelected === "CNY") {rate =currencyData['CNY'];}
    if (currencySelected === "DKK") {rate =currencyData['DKK'];}
    if (currencySelected === "EUR") {rate =currencyData['EUR'];}
    if (currencySelected === "HKD") {rate =currencyData['HKD'];}
    if (currencySelected === "INR") {rate =currencyData['INR'];}
    if (currencySelected === "IDR") {rate =currencyData['IDR'];}
    if (currencySelected === "ILS") {rate =currencyData['ILS'];}
    if (currencySelected === "JPY") {rate =currencyData['JPY'];}
    if (currencySelected === "MYR") {rate =currencyData['MYR'];}
    if (currencySelected === "MXN") {rate =currencyData['MXN'];}
    if (currencySelected === "PHP") {rate =currencyData['PHP'];}
    if (currencySelected === "RUB") {rate =currencyData['RUB'];}
    if (currencySelected === "SGD") {rate =currencyData['SGD'];}
    if (currencySelected === "ZAR") {rate =currencyData['ZAR'];}
    if (currencySelected === "KRW") {rate =currencyData['KRW'];}
    if (currencySelected === "CHF") {rate =currencyData['CHF'];}
    if (currencySelected === "THB") {rate =currencyData['THB'];}
    if (currencySelected === "USD") {rate =currencyData['USD'];}
    return rate;
}