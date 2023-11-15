'use strict'

/**
 * Calc ISBN Code
 * 
 * PREFIX: Generally '978' in Japan
 * COUNTRY: '4' for Japan
 * PUBLISHER_SELECT: The number of digits varies by publisher
 * @author ponyoxa
 * @date 2023-11-08
 * @param {string} PUBLISHER_SELECT
 * @returns {any}
 */
export function calcIsbn (PUBLISHER_SELECT: string) {
    const PREFIX = '978'
    const COUNTRY = '4'
    const MIN = 1
    let max = '99999999'
    let padNum = 8
    if (PUBLISHER_SELECT !== '') {
        const numLen = PUBLISHER_SELECT.length
        max = max.slice(numLen)
        padNum = max.length
    }

    const RANDOM_NUM = Math.floor(Math.random() * (Number(max) + 1 - MIN)) + MIN

    const isbn12 =
        PREFIX +
        COUNTRY +
        PUBLISHER_SELECT +
        String(RANDOM_NUM).padStart(Number(padNum), '0')

    return isbn12 + calcCheckDigit(isbn12)
}

/**
 * Calc CheckDigit
 * For ISBN 13th digit
 * @author ponyoxa
 * @date 2023-11-06
 * @param {string} isbn12
 * @returns {any}
 */
function calcCheckDigit (isbn12: string) {
    let sum = 0
    for (let i = 0; i < 12; i++) {
        sum += i % 2 === 0 ? parseInt(isbn12[i]) : 3 * parseInt(isbn12[i])
    }

    const CHECK_DIGIT = (10 - (sum % 10)) % 10
    return CHECK_DIGIT.toString()
}