'use strict'
import * as a from "./api.ts"
import * as i from "./isbn.ts"

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
(window as any).getIsbn = () => {
  const PUBLISHER_SELECT_DOM = <HTMLInputElement>document.getElementById('publisherCode')!
  const PUBLISHER_SELECT = PUBLISHER_SELECT_DOM.value
  const isbn = i.calcIsbn(PUBLISHER_SELECT)
  document.getElementById('isbn')!.textContent = isbn
  const res = a.sendOpenBDRequest(isbn)
  console.log(res)
  setSearchUrl(isbn)
}
