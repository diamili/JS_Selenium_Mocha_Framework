import { BasePage } from './BasePage';

export class HeaderPage extends BasePage {
  // Selector for the logo element in the header
  private readonly logoSelector: string = '.header-logo';

  // Selector for the login link in the header
  private readonly loginLinkSelector: string = '.login-link';

  // Selector for the user profile dropdown in the header
  private readonly userProfileDropdownSelector: string = '.user-profile-dropdown';

  // Method to click on the logo and navigate to the homepage
  clickLogo() {
    cy.get(this.logoSelector).click();
  }

  // Method to click on the login link and navigate to the login page
  clickLoginLink() {
    cy.get(this.loginLinkSelector).click();
  }

  // Method to open the user profile dropdown
  openUserProfileDropdown() {
    cy.get(this.userProfileDropdownSelector).click();
  }

  // Method to log out from the application
  logout() {
    this.openUserProfileDropdown();
    cy.contains('Logout').click();
  }

  // Other methods related to the header functionality can be added as needed
}
