'use strict'

export async function sendOpenBDRequest(isbn: string) {
    const apiUrl = 'https://api.openbd.jp/v1/get?isbn=' + isbn
    return fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            return data[0]
        })
}
