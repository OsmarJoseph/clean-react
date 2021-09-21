Cypress.Commands.add('getByTestId', (id, selector = '') => cy.get(`[data-testid=${id}]${selector}`))
Cypress.Commands.overwrite('find', (originalFn, parentElement, search, options) => {
  if (options?.id) {
    search = `[data-testid=${search}]`
  }

  return originalFn(parentElement, search)
})
