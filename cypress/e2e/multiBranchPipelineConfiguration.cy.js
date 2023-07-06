import { createMultiBranchPipeline } from "../support/helper";
import multibranchPipline from "../fixtures/multibranchPipeline.json"

describe.skip('Multibranch Pipeline Configuration', function () {

    const newPipelineName = 'pipeline' + Date.now()
    const descriptionText = 'description' + Date.now()
    const displayName = 'displayName' + Date.now()


    beforeEach('Create multibranch pipeline', function () {
        createMultiBranchPipeline(newPipelineName);

        cy.get('a[href="./configure"]').click();
    })

    it('AT 16.01.009|fill out and verify multibranch pipeline configuration General fields', function () {
        cy.get('.jenkins-form-item > .jenkins-form-label')
            .should('contain', multibranchPipline.configurationsFields.displayName)
        cy.get('a[title="Help for feature: Display Name"]')
            .click()
        cy.get('.jenkins-form-item > .help-area > .help > :nth-child(1)')
            .should('be.visible')
        cy.get('.jenkins-form-item > .jenkins-form-label')
            .should('contain', multibranchPipline.configurationsFields.description)
        cy.get('a[title="Help for feature: Display Name"]')
            .realHover()
            .should('be.visible')
        cy.get('input[name="_.displayNameOrNull"]')
            .should('be.visible')
            .type(displayName)
        cy.get('textarea[name="_.description"]')
            .should('be.visible')
            .type(descriptionText)
        cy.get('.textarea-show-preview')
            .should('contain', multibranchPipline.configurationsFields.preview)
            .click()
        cy.get('.textarea-preview').should('contain', descriptionText)
        cy.get('.textarea-hide-preview')
            .should('be.visible')
            .and('contain', multibranchPipline.configurationsFields.hidePreview)
        cy.get('.textarea-hide-preview')
            .click()
            .should('not.be.visible')
    });

    it.skip('AT_16.01_010 | Verify configuration fields -> Branch source ', function () {
        cy.get('#branch-sources').should('contain', 'Branch Sources')
        cy.get('#yui-gen1-button').realHover().click()
        cy.get('#yui-gen2 li').should('have.length', 3)
            .then($els => {
                const itemArray = Cypress.$.makeArray($els).map(($el) => $el.innerText);
                console.log('array', itemArray)
                expect(itemArray).to.deep.equal(multibranchPipline.configurationsFields.addSource)
            })
    });

    it.skip('AT_16.01_011 | Verify visibility of configuration fields names -> Build Configuration', function () {
        cy.get('#build-configuration')
            .should('contain', multibranchPipline.configurationsFields.buildConfiguration)
        cy.get(':nth-child(6) > :nth-child(2) > .jenkins-form-label')
            .should('contain', multibranchPipline.configurationsFields.mode)
        cy.get('select[class="jenkins-select__input dropdownList"]')
            .should('contain', multibranchPipline.configurationsFields.byJenkinsfile)
        cy.get('.jenkins-form-item > .jenkins-form-label')
            .should('contain', multibranchPipline.configurationsFields.scriptPath)
        cy.get('a[title="Help for feature: Script Path"]')
            .realHover()
            .should('be.visible')
    })

    it.skip('AT_16.01_013 | Multibranch Pipeline > Verify visibility of help message > Scan Multibranch Pipeline Triggers', function () {
        cy.get('a[title$="otherwise run"]')
          .realHover()
          .should('be.visible').click()
        cy.get('div[nameref="cb2"] div[class="help"]')
          .should('be.visible')
        cy.get('a[title$="otherwise run"]').click()
        cy.get('div[nameref="cb2"] div[class="help"]')
          .should('not.be.visible')
    })

    it.skip('AT_16.01_017 | Multibranch Pipeline>Configuration>Scan Multibranch Pipeline Triggers>Verify array of time Interval', function () {
        cy.get('div[ref="cb2"] .jenkins-checkbox').click()
        cy.get('select[value="1d"] option')
            .should('have.length', multibranchPipline.configurationsFields.intervalTime.length)
            .then($els => {
                const itemArray = Cypress.$.makeArray($els).map(($el) => $el.innerText);
                expect(itemArray).to.deep.equal(multibranchPipline.configurationsFields.intervalTime)
            })
    })
})
