'use strict'
function calcIsbn() {
    const prefix = '978';
    const country = '4';
    const min = 1;
    const max = 999999999;
    const randomNum = Math.floor(Math.random() * (max + 1 - min)) + min;
    
    const isbn = prefix + country + String(randomNum).padStart(9, '0');

    return isbn;
}

function getIsbn() {
    const isbn = calcIsbn()
    document.getElementById('isbn').innerHTML = isbn;
}