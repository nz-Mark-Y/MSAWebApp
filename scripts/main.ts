function settingsClicked() {
    var currencySelected : string  = document.querySelector('input[name=currency]:checked').value;
    var conversionSelected : string = document.querySelector('input[name=conversion]:checked').value;
    alert(currencySelected + " " + conversionSelected);
}