'use strict'
function calcIsbn() {
    const prefix = '978';
    const country = '4';
    const min = 1;
    let max = "99999999";
    let padNum = 8;
    let publisherSelect = document.getElementById('publisherCode');
    if (publisherSelect.value != '') {
        let numLen = String(publisherSelect.value).length;
        max = max.slice(numLen);
        padNum = max.length;
    }
    
    const randomNum = Math.floor(Math.random() * (Number(max) + 1 - min)) + min;
    
    const isbn12 = prefix + country + publisherSelect.value + String(randomNum).padStart(Number(padNum), '0');

    return isbn12 + calcCheckDigit(isbn12);
}

function calcCheckDigit(isbn12) {
    let sum = 0;
    for (let i = 0; i < 12; i++) {
        sum += (i % 2 === 0) ? parseInt(isbn12[i]) : 3 * parseInt(isbn12[i]);
    }

    const checkDigit = (10 - (sum % 10)) % 10;
    return checkDigit.toString();
}

function setSearchUrl(isbn) {
    document.getElementById('searchUrl').href = 'https://bookmeter.com/search?keyword=' + isbn;
}

function getIsbn() {
    const isbn = calcIsbn()
    document.getElementById('isbn').innerHTML = isbn;
    setSearchUrl(isbn);
}