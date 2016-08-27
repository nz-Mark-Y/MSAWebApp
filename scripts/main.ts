var currencySelected : string  = "AUD";
var conversionSelected : string = "setLocal";
var currencyArray : any[];

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
            console.log(currencyArray);
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
    	if (xmlhttp.readyState == 4 ) {
        	if (xmlhttp.status == 200) {
                var dataArray: any[];
        		dataArray = JSON.parse(xmlhttp.responseText);
                currencyArray = dataArray.rates;
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