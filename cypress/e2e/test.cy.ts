import env from 'config/env.json';
import locators from 'features/page_locators/otto/otto_HP_locators.json';

describe('Otto.de Registration', () => {
    it('User can search any term and observe the search result page with searched items on it', () => {
      cy.visit(env.otto);

      cy.xpath(locators['onetrust-accept-btn-handler']).click();

      cy.get('.squirrel_searchfield').type('spiegel');

      cy.get('.squirrel_submit-button.svelte-146qonh svg.svelte-146qonh').click();

      cy.get('.nav_grimm-breadcrumb-headline__title').contains('spiegel').should('exist');
    });
  });