import shoppingPageLocators from '../fixtures/locators/shoppingCartPage.json'

cy.shoppingCartOps = {
    verifyShoppingCartItem:(productRow, productName, qty, price) => {
        cy.get(shoppingPageLocators.products.productRows).should('have.length.of', productRow)
        cy.get(shoppingPageLocators.products.productRowColumns.replace('@VALUE@',productRow).replace('@VALUE2@',2)).invoke('text').then((text) => {
            expect(productName).equal(text.trim())
        })
        cy.get(shoppingPageLocators.products.productRowColumns.replace('@VALUE@',productRow).replace('@VALUE2@',3)).invoke('text').then((text) => {
            expect(qty.toString()).equal(text.trim())
        })
        cy.get(shoppingPageLocators.products.productRowColumns.replace('@VALUE@',productRow).replace('@VALUE2@',4)).invoke('text').then((text) => {
            expect(price).equal(text.trim())
        })
    },

    addNewAddress:(country,name, telephone, zip, address, city, state) => {
        cy.get(selectAddressPageLocators.address.countryTextBox).type(country)
        cy.get(selectAddressPageLocators.address.nameTextBox).type(name)
        cy.get(selectAddressPageLocators.address.mobileTextBox).type(telephone)
        cy.get(selectAddressPageLocators.address.zipCodeTextBox).type(zip)
        cy.get(selectAddressPageLocators.address.addressTextBox).type(address)
        cy.get(selectAddressPageLocators.address.cityTextBox).type(city)
        cy.get(selectAddressPageLocators.address.stateTextBox).type(state)
    }
}