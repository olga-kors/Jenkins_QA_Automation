import {sideMenuItems, dropdownItems} from '../fixtures/multiConfigurationProject.json'
import projects from '../fixtures/projects.json'


const PORT = Cypress.env("local.port");

describe.skip('multiConfigurationProjectDelete', () => {

    beforeEach(() => {
        cy.get('a[href="newJob"]').click();
        cy.get('input#name').type(projects.multiConfigurationProject.name);
        cy.get('.hudson_matrix_MatrixProject').click();
        cy.get('#ok-button').click();
        cy.get("button[name='Submit']").click();
        cy.get("ol#breadcrumbs > li:nth-of-type(1)").click();
    })

    xit('AT_14.07_001 | Multi Configuration Project Delete | Delete Multi-configuration project within itself', () => {
        cy.get(`a[href='job/${projects.multiConfigurationProject.name}/']`).click();
        cy.get(".confirmation-link").contains(`${sideMenuItems[5]}`).click();
        cy.get("#page-body").should("not.have.text", `${projects.multiConfigurationProject.name}`);
    });

    xit('AT_14.07_002 |Multi-configuration project| Delete Multi-configuration project with dropdown menu', () => {
        cy.get(".jenkins-table__link .jenkins-menu-dropdown-chevron").realHover().click();
        cy.get("li:nth-of-type(5)  span")
        .contains(`${dropdownItems[4]}`)
        .click();
        cy.url().should('equal', `http://localhost:${PORT}/`);
        cy.get("#page-body").should("not.have.text", `${projects.multiConfigurationProject.name}`);
    });
});
