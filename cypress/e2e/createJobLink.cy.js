/// <reference types="cypress"/>

import newItemNames from "../fixtures/newItemNames.json";

describe.skip("Homepage: Create a job link", () => {
  it.skip("Create a job link", function () {
    cy.get('a[href*="newJob"].content-block__link').should("be.visible");
    cy.get('a[href*="newJob"].content-block__link').should(
      "have.text",
      "Create a job"
    );
    cy.get('a[href*="newJob"].content-block__link').click();
    cy.url().should("contain", "/newJob");
  });

  it.skip("Create job link", () => {
    cy.get("#main-panel .content-block a[href=newJob]").click();
    cy.url().should(
      "eq",
      `http://localhost:${Cypress.env("local.port")}/newJob`
    );
  });

  it.skip("Homepage Create a job link", () => {
    cy.get('[href="newJob"]').click();
    cy.url().should(
      "eq",
      `http://localhost:${Cypress.env("local.port")}/newJob`
    );
  });
  it.skip("AT_02.01.008|Homepage Create a job link", () => {
    cy.get('a[href="newJob"]').click();
    cy.get(".h3").should("have.text", "Enter an item name");
  });

  it.skip("AT_02.01.007|Homepage Create a job link", () => {
    cy.get('a[href="newJob"]').click();
    cy.get(".h3").should("have.text", "Enter an item name");
  });

  it.skip("AT_02.01_006 | Homepage, Create a job link", () => {
    cy.get('[href="newJob"]').click();
    cy.url().should("include", "/newJob");
  });

  it.skip("AT_02.01.009 | Homepage Create a job link", () => {
    cy.get("a[href=newJob").click();
    cy.get(".h3").should("have.text", "Enter an item name");
  });

  it.skip("AT_02.01_11 | <Homepage> Verify Create a job link works", () => {
    cy.get('[href="newJob"]').click();
    cy.get(".header .h3").should("have.text", newItemNames.headerText);
  });

  it("AT_02.01_012 | <Homepage> Create a job link", function () {
    cy.get("a[href=newJob").click();
    cy.url().should("contains", "/newJob");
  });
});
