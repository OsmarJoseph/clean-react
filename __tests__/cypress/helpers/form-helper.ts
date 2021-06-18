export const testInputStatus = (field: string, error?: string): void => {
  cy.getByTestId(`${field}-wrap`).should('have.attr', 'data-status', error ? 'invalid' : 'valid')
  if (error) {
    cy.getByTestId(field).should('have.attr', 'title', error)
    cy.getByTestId(`${field}-label`).should('have.attr', 'title', error)
  } else {
    cy.getByTestId(field).should('not.have.attr', 'title')
    cy.getByTestId(`${field}-label`).should('not.have.attr', 'title')
  }
}

export const testMainError = (error?: string): void => {
  cy.getByTestId('spinner').should('not.exist')
  if (error) cy.getByTestId('main-error').should('contain.text', error)
  else cy.getByTestId('main-error').should('not.exist', error)
}

export const testLocalStorageItem = (key: string): void => {
  cy.window().then((window) => assert.isOk(window.localStorage.getItem(key)))
}
