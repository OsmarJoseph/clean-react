declare namespace Cypress {
  export interface Chainable {
    getByTestId: (id: string, selector?: string) => Chainable<JQuery<E>>
    /**
     * Finds the descendent DOM elements with the given selector.
     *
     * @see https://on.cypress.io/find
     * @example
     *    // Find the li’s within the nav
     *    cy.get('.left-nav>.nav').find('>li')
     */
    find: <E extends Node = HTMLElement>(
      selector: string,
      options?: FindOptions,
    ) => Chainable<JQuery<E>>
    /**
     * Get the descendent DOM elements of a specific selector.
     *
     * @see https://on.cypress.io/find
     * @example
     *    cy.get('.article').find('footer') // Yield 'footer' within '.article'
     */
    find: <K extends keyof HTMLElementTagNameMap>(
      selector: K,
      options?: FindOptions,
    ) => Chainable<JQuery<HTMLElementTagNameMap[K]>>
  }
}

type FindOptions = Partial<Loggable & Timeoutable & Shadow & TestId>

interface TestId {
  /**
   * show find by selector test id
   *
   * @default: false
   */
  id: boolean
}
