'use strict'

/**
 * Calc ISBN
 * 
 * PREFIX: Generally '978' in Japan
 * COUNTRY: '4' for Japan
 * PUBLISHER_SELECT: The number of digits varies by publisher
 * @author ponyoxa
 * @date 2023-11-06
 * @returns {any}
 */
function calcIsbn () {
  const PREFIX = '978'
  const COUNTRY = '4'
  const MIN = 1
  let max = '99999999'
  let padNum = 8
  const PUBLISHER_SELECT = document.getElementById('publisherCode')
  if (PUBLISHER_SELECT?.value !== '') {
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

/**
 * Calc CheckDidit
 * For ISBN 13th digit
 * @author ponyoxa
 * @date 2023-11-06
 * @param {any} isbn12
 * @returns {any}
 */
function calcCheckDigit (isbn12) {
  let sum = 0
  for (let i = 0; i < 12; i++) {
    sum += i % 2 === 0 ? parseInt(isbn12[i]) : 3 * parseInt(isbn12[i])
  }

  const CHECK_DIGIT = (10 - (sum % 10)) % 10
  return CHECK_DIGIT.toString()
}

/**
 * Set URL for search in bookmeter
 * (This functionality will be discontinued and replaced with OpenBD api)
 * @author ponyoxa
 * @date 2023-11-06
 * @param {any} isbn
 * @returns void
 */
function setSearchUrl (isbn) {
  document.getElementById('searchUrl').href =
        'https://bookmeter.com/search?keyword=' + isbn
}

/**
 * Main function for generate ISBN
 * @author ponyoxa
 * @date 2023-11-06
 * @returns {any}
 */
function getIsbn () {
  const isbn = calcIsbn()
  document.getElementById('isbn').textContent = isbn
  setSearchUrl(isbn)
}
