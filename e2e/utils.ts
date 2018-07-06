import { browser } from 'protractor';
import { LoginPage } from './login/login.po';

export function login() {
    const lp = new LoginPage();
    lp.navigateTo();
    lp.enterDetails('ingestor', 'aman');
    lp.login();
}

export function logout() {
    browser.get('/logout');
}
