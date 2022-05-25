import landingPageLocators from '../fixtures/locators/landingPage.json'

cy.landingPageOps = {
    searchProductAndAddToCart:(productName) => {
        cy.get(landingPageLocators.menubar.searchBarTextBox).type(productName)
        cy.get(landingPageLocators.menubar.searchBarTextBox).type('{enter}')
        cy.get(landingPageLocators.products.productAddToCartBtn.replace('@VALUE@',productName)).click()
    }
}