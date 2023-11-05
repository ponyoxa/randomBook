'use strict'

function calcIsbn () {
  const PREFIX = '978'
  const COUNTRY = '4'
  const MIN = 1
  let max = '99999999'
  let padNum = 8
  const PUBLISHER_SELECT = document.getElementById('publisherCode')
  if (PUBLISHER_SELECT.value !== '') {
    const numLen = String(PUBLISHER_SELECT.value).length
    max = max.slice(numLen)
    padNum = max.length
  }

  const RANDOM_NUM = Math.floor(Math.random() * (Number(max) + 1 - MIN)) + MIN

  const isbn12 =
        PREFIX +
        COUNTRY +
        PUBLISHER_SELECT.value +
        String(RANDOM_NUM).padStart(Number(padNum), '0')

  return isbn12 + calcCheckDigit(isbn12)
}

function calcCheckDigit (isbn12) {
  let sum = 0
  for (let i = 0; i < 12; i++) {
    sum += i % 2 === 0 ? parseInt(isbn12[i]) : 3 * parseInt(isbn12[i])
  }

  const CHECK_DIGIT = (10 - (sum % 10)) % 10
  return CHECK_DIGIT.toString()
}

function setSearchUrl (isbn) {
  document.getElementById('searchUrl').href =
        'https://bookmeter.com/search?keyword=' + isbn
}

function getIsbn () {
  const isbn = calcIsbn()
  document.getElementById('isbn').innerHTML = isbn
  setSearchUrl(isbn)
}
