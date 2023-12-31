'use strict'

const PREFIXES = {
    first: '978',
    second: '979',
}

const COUNTRIES = {
    Ja: '4',
}

const math = { floor: Math.floor, random: Math.random }

/**
 * main function for getting ISBN
 * @author ponyoxa
 * @date 2023-11-29
 * @param PUBLISHER_SELECT:string
 * @returns string
 */
export function mainIsbn(PUBLISHER_SELECT: string) {
    return calcIsbn(PUBLISHER_SELECT, PREFIXES.first, COUNTRIES.Ja)
}

/**
 * Test Code of mainIsbn
 * @author ponyoxa
 * @date 2023-11-22
 * @param {any} import.meta.vitest
 * @returns {any}
 */
if (import.meta.vitest) {
    const { it, expect } = import.meta.vitest
    it('mainIsbn', () => {
        expect(mainIsbn('99')).toHaveLength(13)
        expect(mainIsbn('999')).toHaveLength(13)
        expect(mainIsbn('9999')).toHaveLength(13)
        expect(mainIsbn('99999')).toHaveLength(13)
    })
}

/**
 * Calc ISBN Code
 * 
 * PREFIX: Generally '978' in Japan
 * COUNTRY: '4' for Japan
 * PUBLISHER_SELECT: The number of digits varies by publisher
 * 
 * @author ponyoxa
 * @date 2023-11-29
 * @param {any} PUBLISHER_SELECT:string
 * @param {any} PREFIX:string
 * @param {any} COUNTRY:string
 * @returns string
 */
function calcIsbn (PUBLISHER_SELECT: string, PREFIX: string, COUNTRY: string) {
    const MIN = 1
    let max = '99999999'
    let padNum = 8
    if (PUBLISHER_SELECT !== '') {
        const numLen = PUBLISHER_SELECT.length
        max = max.slice(numLen)
        padNum = max.length
    }

    const RANDOM_NUM = randomNum({math}, max, MIN)

    const isbn12 =
        PREFIX +
        COUNTRY +
        PUBLISHER_SELECT +
        String(RANDOM_NUM).padStart(Number(padNum), '0')

    return isbn12 + calcCheckDigit(isbn12)
}

/**
 * Get random number
 * @author ponyoxa
 * @date 2023-11-22
 * @param {any} {math}:any
 * @param {any} max:string
 * @param {any} MIN:number
 * @returns {any}
 */
function randomNum({ math }: any, max: string, MIN: number) {
    const RANDOM_NUM: string = math.floor(math.random() * (Number(max) + 1 - MIN)) + MIN
    return RANDOM_NUM
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

