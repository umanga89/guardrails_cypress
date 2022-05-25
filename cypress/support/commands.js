import landingPageLocators from '../fixtures/locators/landingPage.json'
import loginPageLocators from '../fixtures/locators/loginPage.json'
import shoppingCartLocators from '../fixtures/locators/shoppingCartPage.json'
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add("login",(username, password) => {
    cy.visit('https://juice-shop.herokuapp.com/')
        cy.get(landingPageLocators.general.cookieDismissBtn).click()
        cy.get(landingPageLocators.general.welcomePopupDismissBtn).click()
        cy.get(landingPageLocators.menubar.account).click()
        cy.get(landingPageLocators.menubar.login).click()
        cy.url().should('eq','https://juice-shop.herokuapp.com/#/login')

        //enter username and password then login
        cy.get(loginPageLocators.emailTextbox).type(username)
        cy.get(loginPageLocators.passwordTextbox).type(password)
        cy.get(loginPageLocators.loginBtn).click()

        //verify user is logged in
        cy.url().should('eq','https://juice-shop.herokuapp.com/#/search')
})

Cypress.Commands.add("clearCart",() => {
    cy.get(landingPageLocators.menubar.cartItemCount).invoke('text').then((text) => {
        cy.log(text)
        if(text !== '0'){
    cy.get(landingPageLocators.menubar.addToCartBtn).click()
    cy.get(shoppingCartLocators.products.productRows).its('length').then((productCountInCart) => {
        if(productCountInCart > 0){
            for(let i=1;i<=productCountInCart;i++){
                cy.get((shoppingCartLocators.products.productRowColumns.replace('@VALUE@',i).replace('@VALUE2@',5))).click()
            }
        }
    })
}
})
})