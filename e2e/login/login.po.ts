import { browser, element, by, protractor } from 'protractor';

export class LoginPage {
  userInput = element(by.id('emailInput'));
  pwdInput = element(by.id('pwdInput'));

  navigateTo() {
    return browser.get('/login');
  }

  enterDetails(username, passwd) {
    this.userInput.sendKeys(username);
    this.pwdInput.sendKeys(passwd);
    // expect(this.user.getAttribute('value')).toEqual(username);
    // expect(this.pwd.getAttribute('value')).toEqual(passwd);
  }

  login() {
    this.pwdInput.sendKeys(protractor.Key.ENTER);
    browser.waitForAngularEnabled(false);
    // browser.sleep(5000);
    // expect(browser.getCurrentUrl()).toContain('/datasets');
  }

  logout() {
    browser.get('/logout');
  }
}
