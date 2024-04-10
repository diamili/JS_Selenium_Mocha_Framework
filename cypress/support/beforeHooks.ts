import { HomePage } from '../pages/HomePage';
import env from '../fixtures/env.json';

const homePage = new HomePage();

const projectUrl = env.shein;
const projectIdentifier = projectUrl.includes('otto') ? 'otto' : 'shein';
export const project: string = projectIdentifier;


beforeEach(() => {
  homePage.visitHomePage(projectUrl); 

});


