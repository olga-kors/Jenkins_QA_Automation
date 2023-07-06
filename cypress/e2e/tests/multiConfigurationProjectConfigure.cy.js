/// <reference types="cypress" />

import HomePage from "../../pageObjects/HomePage";
import newItemPageData from "../../fixtures/pom_fixtures/newItemPage.json";
import projectData from "../../fixtures/pom_fixtures/multiConfigurationProjectConfigurePage.json";

describe('multiConfigurationProjectConfigure', () => {
  const homePage = new HomePage();

  it('AT_14.05_010 | Multi-configuration project. Advanced project options default values', () => {
    cy.createMultiConfigurationProject(newItemPageData.multiConfigurationProjectName);
    homePage
      .hoverAndClickProjectDrpDwnBtn(newItemPageData.multiConfigurationProjectName)
      .clickMultiConfProjectDrpDwnConfigureLink()
      .clickAdvancedBtn()
      .clickAdvancedOptionsLabels()
      .createAdvancedOptionsValuesList()
      .should('deep.equal', projectData.defaultOptionsValues)
  });

  it('AT_14.05_001 | Multi-configuration project. Block with advanced options is appeared after clicking "Advanced" button', () => {
    cy.createMultiConfigurationProject(newItemPageData.multiConfigurationProjectName);
    homePage
      .hoverAndClickProjectDrpDwnBtn(newItemPageData.multiConfigurationProjectName)
      .clickMultiConfProjectDrpDwnConfigureLink()
      .clickAdvancedBtn()
      .getAdvancedOptionsBlock()
      .should('be.visible');
      
  });

  it('AT_14.05_009 | Verify MultiConfig Project Advanced options are set and saved', () => {
    cy.createMultiConfigProject(newItemPageData.multiConfigurationProjectName);
    homePage
      .clickProjectDropdownMenuBtn()
      .clickMultiConfProjectDrpDwnConfigureLink()
      .clickAdvancedBtn()
      .clickAdvancedOptionsLabels()
      .fillAdvancedOptionsForms()
      .clickSaveButton()
      .clickConfigureSideMenuLink()
      .clickAdvancedBtn()
      .createAdvancedOptionsCheckboxesList()
      .createAdvancedOptionsValuesList()
      .should('deep.equal', projectData.advancedOptionsValues);
  });

  it('AT_14.05_004c | Multi-configuration project. Advance project options are checked', () => {
    cy.createMultiConfigurationProject(newItemPageData.multiConfigurationProjectName);
    homePage
      .hoverAndClickProjectDrpDwnBtn(newItemPageData.multiConfigurationProjectName)
      .clickMultiConfProjectDrpDwnConfigureLink()
      .clickAdvancedBtn()
      .clickAdvancedOptionsLabels()
      .clickSaveButton()
      .clickConfigureSideMenuLink()
      .clickAdvancedBtn()
      .assertAdvancedOptionsCheckboxesChecked()    
  });

  it('AT_14.05_004u | Multi-configuration project. Advance project options are unchecked', () => {
    cy.createMultiConfigurationProject(newItemPageData.multiConfigurationProjectName);
    homePage
      .hoverAndClickProjectDrpDwnBtn(newItemPageData.multiConfigurationProjectName)
      .clickMultiConfProjectDrpDwnConfigureLink()
      .clickAdvancedBtn()
      .clickAdvancedOptionsLabels()
      .clickSaveButton()
      .clickConfigureSideMenuLink()
      .clickAdvancedBtn()
      .clickAdvancedOptionsLabels()
      .clickSaveButton()
      .clickConfigureSideMenuLink()
      .clickAdvancedBtn()
      .assertAdvancedOptionsCheckboxesUnChecked()    
  });

  it('AT_14.05_003 | Multi-configuration project. Advanced options are enabled to select it', () => {
    cy.createMultiConfigurationProject(newItemPageData.multiConfigurationProjectName);
    homePage
      .hoverAndClickProjectDrpDwnBtn(newItemPageData.multiConfigurationProjectName)
      .clickMultiConfProjectDrpDwnConfigureLink()
      .clickAdvancedBtn()
      .getAdvancedOptionsBlock()
      .should('be.visible')
      .and('be.enabled')      
    });

    it('AT_14.05_002 | Multi-configuration project. There are ALL advanced project options in the list', () => {
        const optionsNumber = projectData.advancedOptions.length + projectData.advancedOptionsField.length;

        cy.createMultiConfigurationProject(newItemPageData.multiConfigurationProjectName);
        homePage
          .hoverAndClickProjectDrpDwnBtn(newItemPageData.multiConfigurationProjectName)
          .clickMultiConfProjectDrpDwnConfigureLink()
          .clickAdvancedBtn()
          .getAdvancedOptionsBlock()
          .should('have.length', optionsNumber);    
    });
});
