import { HeaderPage } from 'pages/HeaderPage';

describe('User can use search functionality', () => {

  const headerPage = new HeaderPage();

    it ('User can see logo and click on it to open Home Page', () => {
      
        headerPage.existLogo();

        cy.get('.c-header2.header-optimize .header-optimize__cate').contains('Große Größen').click();
  
        headerPage.existLogo();
  
        headerPage.clickLogo();
  
        headerPage.existLogo();
    })

    // it('User can search any term and observe the search result page with searched items on it', () => {

    //   cy.get(locators_header['serach-field']).type('spiegel');

    //   cy.get(locators_header['search-icon']).click();

    //   cy.get(locators_search_PLP['searched_term']).contains('spiegel').should('exist');
    // });
  });