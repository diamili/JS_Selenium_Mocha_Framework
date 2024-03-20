import { BasePage } from './BasePage';
import { project } from '../support/beforeHooks';

interface Locators {
  [key: string]: string;
}

export class HeaderPage extends BasePage {

  private readonly locators: Locators;

  constructor() {
    super();
  
    switch (project) {
      case 'otto':
        this.locators = require('../fixtures/OTTO/locators/OTTO_Header_locators.json');
        break;
      case 'shein':
        this.locators = require('../fixtures/shein/locators/Shein_Header_locators.json');
        break;
      default:
        // Handle the case when project is neither 'otto' nor 'shein'
        throw new Error(`Unknown project: ${project}`);
    }
  }

  clickLogo() {
    cy.get(this.locators['logo']).click();
  }

  existLogo(){
    cy.get(this.locators['logo']).should('exist');
  }
  // openUserProfileDropdown() {
  //   cy.get(this.userProfileDropdownSelector).click();
  // }

  // logout() {
  //   this.openUserProfileDropdown();
  //   cy.contains('Logout').click();
  // }

}
