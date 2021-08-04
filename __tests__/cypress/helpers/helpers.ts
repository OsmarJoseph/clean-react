export const testHttpCallsCount = (count: number): void => {
  cy.get('@request.all').should('have.length', count)
}

const baseUrl: string = Cypress.config().baseUrl

export const testUrl = (path: string): void => {
  cy.url().should('eq', `${baseUrl}${path}`)
}

export const testLocalStorageItem = (key: string): void => {
  cy.window().then((window) => assert.isOk(window.localStorage.getItem(key)))
}
