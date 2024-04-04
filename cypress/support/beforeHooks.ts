import { HomePage } from '../pages/HomePage';
import env from '../fixtures/env.json';
import locators_homepage from '../fixtures/OTTO/locators/otto_HP_locators.json';

const homePage = new HomePage();

const projectUrl = env.otto;
console.log('Project URL:', projectUrl);
const projectIdentifier = projectUrl.includes('otto') ? 'otto' : 'shein';
export const project: string = projectIdentifier;

beforeEach(() => {
  homePage.visitHomePage(projectUrl); 

  // cy.get(locators_homepage['onetrust-accept-btn-handler']).click();
  // cy.log('cookie pop-up has been closed');
});


