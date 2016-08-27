function settingsClicked() {
    var currencySelected = document.querySelector('input[name=currency]:checked').value;
    var conversionSelected = document.querySelector('input[name=conversion]:checked').value;
    alert(currencySelected + " " + conversionSelected);
}
