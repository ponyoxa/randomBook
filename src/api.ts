"use strict"

export async function sendOpenBDRequest(isbn: string) {
    const apiUrl = 'https://api.openbd.jp/v1/get?isbn=' + isbn
    return fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data[0])
            return data[0]
        })
}
