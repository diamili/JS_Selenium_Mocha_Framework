import { BasePage } from './BasePage';
export class HomePage extends BasePage {

  visitHomePage(url: string) {
    this.visitPage(url); 
  }
}

