import landingPageLocators from '../fixtures/locators/landingPage.json'
import shoppingCartPageLocators from '../fixtures/locators/shoppingCartPage.json'
import selectAddressPageLocators from '../fixtures/locators/selectAddressPage.json'
import credentials from '../fixtures/credentials/credentials.json'
import '../support/landingPage'
import '../support/shoppingCartPage'

describe('awesome OWASP Juice shop sample tests', () => {
    beforeEach('Login',()=> {
        cy.login(credentials.valid_credentials.username,credentials.valid_credentials.password)
        cy.wait(2000)
        cy.clearCart()
    })

    it('purchase single item e2e test', () => {
        const productName = 'Banana Juice (1000ml)'
        let productPrice = '1.99¤'
        cy.get(landingPageLocators.menubar.searchBarActivateBtn).click()
        cy.landingPageOps.searchProductAndAddToCart(productName)
        cy.get(landingPageLocators.products.productAddedToCartMessage).should('have.text',`Placed ${productName} into basket.`)
        cy.get(landingPageLocators.menubar.cartItemCount).should('have.text', '1')
        //cy.get(landingPageLocators.products.priceOfProduct.replace('@VALUE@',productName)).invoke('text').as('text')
        cy.get(landingPageLocators.products.priceOfProduct.replace('@VALUE@',productName)).should('have.text',productPrice)
        cy.get(landingPageLocators.menubar.addToCartBtn).click()
        // cy.get('@text').then((text) => {
        // cy.shoppingCartOps.verifyShoppingCartItem(1,productName,1,text)
        // })
        cy.shoppingCartOps.verifyShoppingCartItem(1,productName,1,productPrice)
        cy.get(shoppingCartPageLocators.products.totalPrice).invoke('text').then((text) => {
            expect(text).equal(`Total Price: ${productPrice}`)
        })
        cy.get(shoppingCartPageLocators.products.checkOutButton).click()
        cy.get(selectAddressPageLocators.address.addNewAddressBtn).click()

        cy.addNewAddress('Singapore', 'Umanga', '6583375212','600211','my address 123','Singapore City','Singapore state')

        cy.get(selectAddressPageLocators.address.submitBtn).click()
        cy.get(selectAddressPageLocators.address.addressRadioButton).click()
        cy.get(selectAddressPageLocators.address.continueToPaymentBtn).click()
    })

    it('purchase two items e2e test', () => {
        const product1 = ['Apple Juice (1000ml)','1.99¤']
        const product2 = ['Carrot Juice (1000ml)','2.99¤']
        let productMap = new Map()
        productMap.set("product1", product1)
        productMap.set("product2", product2)

        
        cy.get(landingPageLocators.menubar.searchBarActivateBtn).click()
        let count = 1
        for(let array in productMap){
            cy.get(landingPageLocators.menubar.searchBarTextBox).clear()
            cy.landingPageOps.searchProductAndAddToCart(array[0])
            cy.get(landingPageLocators.products.productAddedToCartMessage).should('have.text',`Placed ${array[0]} into basket.`)
            cy.get(landingPageLocators.menubar.cartItemCount).should('have.text', count.toString())
            cy.get(landingPageLocators.products.priceOfProduct.replace('@VALUE@',array[0])).should('have.text',array[1])
            cy.get(landingPageLocators.menubar.addToCartBtn).click()
            count++
        }

        cy.shoppingCartOps.verifyShoppingCartItem(1,productName1,1,productPrice1)

        cy.shoppingCartOps.verifyShoppingCartItem(2,productName2,1,productPrice2)
        cy.get(shoppingCartPageLocators.products.totalPrice).invoke('text').then((text) => {
            expect(text).equal(`Total Price: 4.98¤`)
        })

        cy.addNewAddress('Singapore', 'Umanga', '6583375212','600211','my address 123','Singapore City','Singapore state')

        cy.get(selectAddressPageLocators.address.submitBtn).click()
        cy.get(selectAddressPageLocators.address.addressRadioButton).click()
        cy.get(selectAddressPageLocators.address.continueToPaymentBtn).click()
    })

    it('Verify apple search results does not return banana', () => {
        cy.get(landingPageLocators.menubar.searchBarActivateBtn).click()
        cy.get(landingPageLocators.menubar.searchBarTextBox).type('apple')
        cy.get(landingPageLocators.menubar.searchBarTextBox).type('{enter}')

        cy.get(landingPageLocators.products.searchResultsProductNames).its('length').then((length) => {
            for(let i=1;i<=length;i++){
                cy.get(landingPageLocators.menubar.searchResultsProductNames).eq(i).should('not.contain', 'banana')
            }
        })

    })
})