/// <reference types="cypress"/>

import items from '../fixtures/items.json'
import userMenuItems from '../fixtures/userIconMenuItems.json'

 
describe.skip("breadcrumbsMyViewsPage", () => {
    it.skip('AT_04.03_001|<Breadcrumbs>My Views page > Verify that user can open selected Pipeline', () => {

        cy.get('a[href="/view/all/newJob"]').click();
        cy.get('#name').type(items.pipelineName);
        cy.get('.org_jenkinsci_plugins_workflow_job_WorkflowJob').click();
        cy.get('#ok-button').click();
        cy.get('.jenkins-button--primary').click();

        cy.get('#breadcrumbBar li:first-child').click();
        cy.get('#page-header .jenkins-menu-dropdown-chevron').realHover().click()
        cy.get('.yuimenuitem').contains(userMenuItems.userMenuItems[2]).click()
        cy.get('a[href="job/testPipeline/"]').click()
        cy.get('#main-panel > h1')
          .should('be.visible')
          .and('include.text', items.pipelineName)
    })
    
    it.skip('AT_04.03_002| <Breadcrumbs>My Views page > Verify that the user can open the selected Folder', () => {
        cy.get('a[href="/view/all/newJob"]').click();
        cy.get('#name').type(items.folderName);
        cy.get('.com_cloudbees_hudson_plugins_folder_Folder').click();
        cy.get('#ok-button').click();
        cy.get('.jenkins-button--primary').click();

        cy.get('#page-header .jenkins-menu-dropdown-chevron').realHover().click()
        cy.get('.yuimenuitem').contains(userMenuItems.userMenuItems[2]).click()
        cy.get('a[href="job/testFolder/"]').click()
        cy.get('#main-panel > h1')
          .should('be.visible')
          .and('include.text', items.folderName)
    })

    it.skip('AT_04.03_003 |<Breadcrumbs>My Views page > Verify that the user can open the selected Freestyle project', () => {
        cy.get('a[href="/view/all/newJob"]').click();
        cy.get('#name').type(items.freestyleProjectName);
        cy.get('.hudson_model_FreeStyleProject').click();
        cy.get('#ok-button').click();
        cy.get('.jenkins-button--primary').click();

        cy.get('#page-header .jenkins-menu-dropdown-chevron').realHover().click()
        cy.get('.yuimenuitem').contains(userMenuItems.userMenuItems[2]).click()
        cy.get('#job_testFreestyleProject').click()
        cy.get('a[class="jenkins-table__link model-link inside"]')
          .should('be.visible')
          .and('include.text', items.freestyleProjectName)
    })

    it.skip('AT_04.03_007 | Verify that the user can open the selected Multi-configuration project', () => {
        cy.get('a[href="/view/all/newJob"]').click();
        cy.get('#name').type(items.multiConfigurationProjectName);
        cy.get('.hudson_matrix_MatrixProject').click();
        cy.get('#ok-button').click();
        cy.get('.jenkins-button--primary').click();

        cy.get('#page-header .jenkins-menu-dropdown-chevron').realHover().click()
        cy.get('.yuimenuitem').contains(userMenuItems.userMenuItems[2]).click()
        cy.get('a[class="jenkins-table__link model-link inside"] span')
          .contains(items.multiConfigurationProjectName)
          .click()
        cy.get('h1[class="matrix-project-headline page-headline"]')
          .should('be.visible')
          .and('include.text', items.multiConfigurationProjectName)
    })

    it.skip('AT_04.03.008 | Verify that the user can open the selected Multibranch Pipeline', () => {
        cy.get('a[href="/view/all/newJob"]').click();
        cy.get('#name').type(items.multiBranchPipelineName);
        cy.get('.hudson_matrix_MatrixProject').click();
        cy.get('#ok-button').click();
        cy.get('.jenkins-button--primary').click();

        cy.get('#page-header .jenkins-menu-dropdown-chevron').realHover().click()
        cy.get('.yuimenuitem').contains(userMenuItems.userMenuItems[2]).click()
        cy.get('a[class="jenkins-table__link model-link inside"] span')
          .contains(items.multiBranchPipelineName)
          .click()
        cy.get('h1[class="matrix-project-headline page-headline"]')
          .should('be.visible')
          .and('include.text', items.multiBranchPipelineName)
    })

    it.skip('AT_04.03.009|Verify that the user can open the selected Organization Folder', () => {
        cy.get('a[href="/view/all/newJob"]').click();
        cy.get('#name').type(items.organizationFolderName[0]);
        cy.get('.hudson_matrix_MatrixProject').click();
        cy.get('#ok-button').click();
        cy.get('.jenkins-button--primary').click();

        cy.get('#page-header .jenkins-menu-dropdown-chevron').realHover().click()
        cy.get('.yuimenuitem').contains(userMenuItems.userMenuItems[2]).click()
        cy.get('a[class="jenkins-table__link model-link inside"] span')
          .contains(items.organizationFolderName[0])
          .click()
        cy.get('#main-panel')
          .should('be.visible')
          .and('include.text', items.organizationFolderName[0])
    })

  it.skip('AT_04.03.011 |<Breadcrumbs>My Views page| Sort items by ascending order', () => {
    for (let i = 0; i <= 2; i++) {
      cy.get('.task ').contains('New Item').click();
      cy.get('#name').type(items.organizationFolderName[i]);
      cy.get('.hudson_matrix_MatrixProject').click();
      cy.get('#ok-button').click();
      cy.get('.jenkins-button--primary').click();
      cy.get('#jenkins-home-link').click();
    };

    cy.get('#page-header .jenkins-menu-dropdown-chevron').realHover().click();
    cy.get('.yuimenuitem').contains(userMenuItems.userMenuItems[2]).click();
    cy.get('a[class="jenkins-table__link model-link inside"] span').should('have.length', 3)
      .each(($el, idx) => {
        expect($el.text()).to.be.equal(items.createdItemsNames[idx]);
      });
    cy.get('.sortheader').contains('Name').click();
    cy.get('a[class="jenkins-table__link model-link inside"] span').should('have.length', 3)
      .each(($el, idx) => {
        expect($el.text()).to.be.equal(items.ascendingItemsNames[idx]);
      });
  });

  it('AT_04.03.013 | Verify user can manage the list of Jobs by sorting the projects', () => {
    cy.get('[href="newJob"]').click()
    cy.get('input#name').type(items.freestyleProjectName)
    cy.get('.hudson_model_FreeStyleProject').click()
    cy.get('#ok-button').click()
    cy.get('button[name="Submit"]').click()
    cy.get('#jenkins-home-link').click()
    cy.get('[href="/view/all/newJob"]').click()
    cy.get('input#name').type(items.multiBranchPipelineName)
    cy.get('[class$="WorkflowMultiBranchProject"]').click()
    cy.get('#ok-button').click()
    cy.get('button[name="Submit"]').click()
    cy.get('#jenkins-home-link').click()

    cy.get('.jenkins-table__link.model-link.inside')
      .should('have.length', items.createdJobs.length)
      .then(($els) => {
        return Cypress.$.makeArray($els).map($el => $el.innerText)
      })
      .should('deep.equal', items.createdJobs)
    cy.get('.sortheader')
      .contains('Name')
      .click()
    cy.get('.jenkins-table__link.model-link.inside')
      .then(($els) => {
        return Cypress.$.makeArray($els).map($el => $el.innerText)
      })
      .should('deep.equal', items.createdJobsReverse)
  })
  
  it.skip('AT_04.03.012 | <Breadcrumbs> My Views page| Schedule a build', () => {
    cy.get('a[href="/view/all/newJob"]').click();
    cy.get('#name').type(items.createdBuildsNames[0]);
    cy.get('.hudson_model_FreeStyleProject').click();
    cy.get('#ok-button').click();
    cy.get('.jenkins-button--primary').click();
    cy.get(':nth-child(1) > .model-link').click();
    cy.get('.build-status-icon__outer').trigger('focus')
    cy.get('svg[tooltip="Not built"]').should('be.visible');
    cy.get('td:nth-child(4)').should('contain', items.cellData);
    cy.get('td:nth-child(5)').should('contain', items.cellData);
    cy.get('td:nth-child(6)').should('contain', items.cellData);
    cy.get('td:nth-child(7)').trigger('focus');

    cy.get('a[tooltip="Schedule a Build for Build Freestyle"]')
      .should('be.visible').click()
    cy.wait(2000)
    cy.get(':nth-child(1) > .model-link').click();
    cy.get('.build-status-icon__outer').trigger('focus');
    cy.get('svg[tooltip="Success"]').should('be.visible');
  });

  it.skip("AT_04.03_006 | Breadcrumbs My Views page Check an opportunity to open a chosen job", () => {
    let jobName = "Test1";
    cy.get('[href="/view/all/newJob"] .task-link-text').click({
      force: true,
    });
    cy.get("#name").click().type(jobName);
    cy.get(".hudson_model_FreeStyleProject .label").click({
      force: true,
    });
    cy.get("#ok-button").click();
    cy.get('[name="Submit"]').click();
    cy.get(".job-index-headline.page-headline").should(
      "have.text",
      `Project ${jobName}`
    );
    cy.get(`[href="/"].model-link`).click();
    cy.get('[href="/me/my-views"]').click();
    cy.get(`a[href="job/${jobName}/"]`).click();
    cy.url().should(
      "be.eq",
      `http://localhost:${Cypress.env(
        "local.port"
      )}/me/my-views/view/all/job/${jobName}/`
    );
    cy.get(".job-index-headline.page-headline").should(
      "have.text",
      `Project ${jobName}`
    );
  });
});

