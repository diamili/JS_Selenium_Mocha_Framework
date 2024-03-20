import env from '../../fixtures/env.json';
import locators from '../../fixtures/OTTO/locators/otto_HP_locators.json';

describe('User can use search functionality', () => {
    it('User can search any term and observe the search result page with searched items on it', () => {
      cy.visit(env.otto);

      cy.xpath(locators['onetrust-accept-btn-handler']).click();

      cy.get('.squirrel_searchfield').type('spiegel');

      cy.get('.squirrel_submit-button.svelte-146qonh svg.svelte-146qonh').click();

      cy.get('.nav_grimm-breadcrumb-headline__title').contains('spiegel').should('exist');
    });
  });