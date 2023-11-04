'use strict'
function calcIsbn() {
    const prefix = '978';
    const country = '4';
    const min = 1;
    const max = 99999999;
    const randomNum = Math.floor(Math.random() * (max + 1 - min)) + min;
    
    const isbn12 = prefix + country + String(randomNum).padStart(8, '0');

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