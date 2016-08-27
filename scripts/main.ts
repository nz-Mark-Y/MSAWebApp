var currencySelected : string  = "AUD";
var conversionSelected : string = "setLocal";

function init() {
    document.getElementById("currencyForm").addEventListener("click", function(){
        currencySelected = document.querySelector('input[name=currency]:checked').value;
        document.getElementById("statusText").innerHTML = "You have selected " + currencySelected + ".";
        setPlaceholderText();
    });
    document.getElementById("conversionForm").addEventListener("click", function(){
         setPlaceholderText();
    });
    document.getElementById("goButton").addEventListener("click", function(){
        if (document.getElementById("inputBox").value === "") {
            alert("Please enter an amount")
        } else {
            getData();
        }
    });
}

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

function getData() {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		// http://www.w3schools.com/xml/dom_httprequest.asp
    	if (xmlhttp.readyState == 4 ) {
        	if (xmlhttp.status == 200) {
        		console.log(JSON.parse(xmlhttp.responseText));
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