/// <reference types="cypress" />

describe.skip('Header | Head Icon', ()=>{

    it.skip('Verify Jenkins Icon Functionality', function(){
    cy.get('span[class="task-link-text"]').contains('People').click({force: true})
    cy.get('#jenkins-home-link').should('be.visible')
    cy.get('#jenkins-home-link').click('')
    cy.get('.empty-state-block > h1').should('contain', 'Welcome to Jenkins!')
    })
})
