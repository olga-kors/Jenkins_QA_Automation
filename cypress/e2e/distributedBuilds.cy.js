/// <reference types="cypress"/>

describe.skip('distributedBuilds', () => {
    it.skip ('Verify "Learn more about distributed builds" is clickable ', () =>{
        cy.get('a[class="content-block__link content-block__help-link"]').invoke('removeAttr','target').click()
        cy.url().should('eq', 'https://wiki.jenkins.io/display/JENKINS/Distributed+builds')
        
    })
    it.skip ('AT_02.05.09 | Click on Link Learn more about distributed builds from Homepage', () =>{
        cy.get('.content-block__help-link').invoke('removeAttr','target').click()
        cy.url().should('contain', '/Distributed+builds')
    
})
})