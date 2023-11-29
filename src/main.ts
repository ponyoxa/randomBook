'use strict'
import * as a from './api.ts'
import * as i from './isbn.ts'

/**
 * Set URL for search in bookmeter
 * (This functionality will be discontinued and replaced with OpenBD api)
 * @author ponyoxa
 * @date 2023-11-06
 * @param {string} isbn
 * @returns void
 */
function setSearchUrl (isbn: string) {
    const link = <HTMLAnchorElement>document.getElementById('searchUrl')!
    link.href = 'https://bookmeter.com/search?keyword=' + isbn
}

/**
 * Main function for generate ISBN
 * @author ponyoxa
 * @date 2023-11-06
 * @returns {any}
 */
(window as any).getIsbn = async () => {
    let selectedValue: string = ''
    const radioButtons = document.getElementsByName('publisherCode') as NodeListOf<HTMLInputElement>

    for (let i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) {
            selectedValue = radioButtons[i].value
            break
        }
    }

    let isbn = i.mainIsbn(selectedValue)
    let res = await a.sendOpenBDRequest(isbn)
    while (res === null) {
        isbn = i.mainIsbn(selectedValue)
        res = await a.sendOpenBDRequest(isbn)
    }
    const parsed = JSON.parse(JSON.stringify(res))
    const title = parsed['summary']['title']
    console.log(res)
    document.getElementById('isbn')!.textContent = isbn
    document.getElementById('title')!.textContent = title
    setSearchUrl(isbn)
    modalOpen()
}

const modal = document.querySelector('.js-modal'),
    close = document.querySelector('.js-modal-close')

function modalOpen() {
    modal?.classList.add('is-active')
}

function modalClose() {
    modal?.classList.remove('is-active')
}
close?.addEventListener('click', modalClose)

function modalOut(e: any) {
    if (e.target == modal) {
        modal?.classList.remove('is-active')
    }
}
addEventListener('click', modalOut)
