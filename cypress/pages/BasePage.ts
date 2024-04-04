export class BasePage {
    protected readonly baseUrl: string = Cypress.config().baseUrl || '';
  
    // Method to visit a specific page by appending its path to the base URL
    visitPage(pagePath: string) {
      cy.visit(`${this.baseUrl}${pagePath}`);
    }
  
    // visitPage(pagePath: string) {
    //   const fullUrl = this.baseUrl.endsWith('/') ? this.baseUrl.slice(0, -1) : this.baseUrl;
    //   const formattedPagePath = pagePath.startsWith('/') ? pagePath.slice(1) : pagePath;
    //   const url = `${fullUrl}/${formattedPagePath}`;
    //   cy.visit(url);
    // }

    // Method to get the title of the current page
    getPageTitle() {
      return cy.title();
    }
  
    // Method to perform a custom wait
    wait(time: number) {
      cy.wait(time);
    }
  
    // Method to click on a link with given text
    clickLink(linkText: string) {
      cy.contains(linkText).click();
    }
  
    // Method to verify if an element is visible
    verifyElementVisible(selector: string) {
      cy.get(selector).should('be.visible');
    }
  
    // Method to verify if an element contains specific text
    verifyElementContainsText(selector: string, text: string) {
      cy.get(selector).should('contain', text);
    }
  
    // Other common methods can be added as needed
  }
  