'use strict'

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
function getIsbn() {
  const PUBLISHER_SELECT_DOM = <HTMLInputElement>document.getElementById('publisherCode')!
  const PUBLISHER_SELECT = PUBLISHER_SELECT_DOM.value
  const isbn = calcIsbn(PUBLISHER_SELECT)
  document.getElementById('isbn')!.textContent = isbn
  setSearchUrl(isbn)
  sendOpenBDRequest(isbn)
}
