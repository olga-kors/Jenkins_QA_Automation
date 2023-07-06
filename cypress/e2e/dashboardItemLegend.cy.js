/// <reference types='cypress'/>

import { iconLegends } from '../fixtures/iconLegends.json'
import itemLegends from '../fixtures/iconLegends.json'
import headers from '../fixtures/headers.json'
import statuses from '../fixtures/statuses.json'


describe.skip('Verify <Dashboard>Icon legend', () => {
  beforeEach('Create Project', function () {
    cy.get('a[href="newJob"]').click()
    cy.get('input#name').type('TestProject')
    cy.get('li[tabindex="0"] span').contains('Freestyle project').click()
    cy.get('#ok-button').click()
    cy.get(':nth-child(1) > .model-link').click()

  });
  it('AT_TC_20.05_001 | Verify <Dashboard>Icon legend', () => {
    cy.get('a[href="/legend"]')
      .should('be.visible')
      .click()
    cy.url().should('equal', 'http://localhost:8080/legend')
  })

  it('Click on Icon legend via Dashboard', function () {

    cy.get('.jenkins-button[href="/legend"]').click()
    cy.url().should('contain', '/legend')

  });

  it.skip('Verify number of Icon legend', () => {
    cy.get('#rss-bar .jenkins-button').contains('Icon legend').click()
    cy.get('#main-panel > .app-icon-legend dt').should('have.length', iconLegends.length)
  })

  it.skip("AT_20.05.005 | Verify User is able to see Project Health statuses", function () {
    cy.get('a[href="/legend"]').click();
    cy.get("#main-panel > h2:nth-child(5)")
      .should("be.visible")
      .and("have.text", headers.iconLegend.projectHealth);
    cy.get("#main-panel > dl:nth-child(6)").each(($el, idx) => {
      cy.wrap($el)
        .invoke("text")
        .then((text) => {
          expect(text.trim()).to.includes(
            statuses.projectHealth[idx]
          );
        });
    });
  });

  it.skip('AT_20.05_003 | Icon legend`s quantity by header groups', () => {
    cy.get('#rss-bar .jenkins-button').contains('Icon legend').click();
    cy.get('#main-panel .jenkins-app-bar').should('have.text', itemLegends.pageName);
    cy.get('#main-panel>h2:nth-child(3)').should('have.text', itemLegends.headers[0]);
    cy.get('#main-panel > dl:nth-child(4) dt').should('have.length', itemLegends.statusDescriptions.length);
    cy.get('#main-panel>h2:nth-child(5)').should('have.text', itemLegends.headers[1]);
    cy.get('#main-panel > dl:nth-child(6) dt').should('have.length', itemLegends.projectHealthDescriptions.length);
  })
})
