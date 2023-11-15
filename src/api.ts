"use strict"

export async function sendOpenBDRequest(isbn: string) {
    const apiUrl = 'https://api.openbd.jp/v1/get?isbn=' + isbn
    const response = await fetch(apiUrl)
    return response
}
