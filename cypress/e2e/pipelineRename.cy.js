import pipelineName from "../fixtures/pipelineName.json"
import piplineRename from "../fixtures/piplineRename.json"

describe.skip('US_13.03 Pipeline.Rename pipeline project', () => {
    it('TC_13.03.001 Change Pipeline name using Rename button', () => {
        cy.get('a[href="newJob"]').click()
        cy.get('input#name').type(pipelineName.namePipeline)
        cy.get('#j-add-item-type-standalone-projects li:nth-child(2)').click()
        cy.get('#ok-button').click()
        cy.get('#breadcrumbs li:first-child').click()

        cy.get('#projectstatus :nth-child(2) td:nth-child(3) a').click()
        cy.get('.task:nth-child(8)').click()
        cy.get('.jenkins-input.validated').clear().type(pipelineName.newNamePipeline)
        cy.get('button[name="Submit"]').click()
        cy.get('h1.job-index-headline').should('contain' , pipelineName.newNamePipeline)
    })
    it('TC_13.03.002 Verify input field can be cleared before typing in a new text', () => {
        cy.get('a[href="newJob"]').click()
        cy.get('input#name').type(pipelineName.namePipeline)
        cy.get('#j-add-item-type-standalone-projects li:nth-child(2)').click()
        cy.get('#ok-button').click()
        cy.get('#breadcrumbs li:first-child').click()

        cy.get('#projectstatus :nth-child(2) td:nth-child(3) a').click()
        cy.get('.task:nth-child(8)').click()
        cy.get('.jenkins-input.validated').clear()
        cy.get('.jenkins-input.validated').should('have.text', '')
    })

    it('AT_13.03.004 | Pipeline > Verify pipeline project cant be renamed to the current name', () => {
        cy.get('a[href="newJob"]').click()
        cy.get('input#name').type(pipelineName.namePipeline)
        cy.get('.org_jenkinsci_plugins_workflow_job_WorkflowJob').click()
        cy.get('#ok-button').click()
        cy.get('#breadcrumbs li:first-child').click()

        cy.get('#projectstatus :nth-child(2) td:nth-child(3) a').click()
        cy.get('.task:nth-child(8)').click()
        cy.get('button[name=Submit]').click()
        cy.get('#main-panel h1').should('have.text', piplineRename.error)
        cy.get('#main-panel p').should('have.text', piplineRename.errorMessage)
    })
})