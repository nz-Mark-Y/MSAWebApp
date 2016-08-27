var currencySelected : string  = "AUD";
var conversionSelected : string = "setLocal";

function init() {
    document.getElementById("currencyForm").addEventListener("click", function(){
        currencySelected = document.querySelector('input[name=currency]:checked').value;
    });
    document.getElementById("conversionForm").addEventListener("click", function(){
         conversionSelected = document.querySelector('input[name=conversion]:checked').value;
    });
}
