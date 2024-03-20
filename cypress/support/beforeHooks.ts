import { HomePage } from '../pages/HomePage';
import env from '../fixtures/env.json';

const homePage = new HomePage();

beforeEach(() => {
  homePage.visitHomePage(env.otto); 
});
