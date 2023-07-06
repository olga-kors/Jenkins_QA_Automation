/// <reference types="cypress" />

import HomePage from "../../pageObjects/HomePage";
import homePageData from "../../fixtures/pom_fixtures/homePage.json";
import { sidePanelItems } from "../../fixtures/pom_fixtures/homePage.json";
import { permanentAgentRadioBtn } from "../../fixtures/pom_fixtures/newNodePageData.json";
import {endPointUrl} from "../../fixtures/pom_fixtures/homePage.json";
import buildHistoryPageData from "../../fixtures/pom_fixtures/buildHistoryPage.json";
import newItemPageData from "../../fixtures/pom_fixtures/newItemPage.json";
import {configureCloudsHeader} from "../../fixtures/pom_fixtures/configureCloudsPage.json"

describe("homePage", () => {
    const homePage = new HomePage()

    sidePanelItems.forEach((item, idx) => {
      it(`AT_02.04_009 | <Homepage> Verify all ${item} of the sub-menu redirect to the proper pages`, function () {
        homePage
          .clickSideMenuPanelItem(idx)
          .should('contain', endPointUrl[idx])
      })
    })

    it("AT_02.06_005 | Homepage > Verification of the link 'Add description'", () => {
        homePage
          .clickAddDescriptionLink();
        cy.focused().should('have.attr', 'name', 'description') 
    })

    it('AT_02.04_008 | Homepage > Verify 5 items from the sub-menu', () => {
        homePage
          .createSidePanelItemsList()
          .should('deep.equal', sidePanelItems)
    });

    it("AT_02.06_004 | Homepage > Description input textarea does not exist", () => {
        homePage
          .getAddDescriptionField()
          .should("not.exist")
    });

    it("AT_02.06_006 | Homepage > Preview text equals to input description text", () => {
        homePage
          .clickAddDescriptionLink()
          .typeDescriptionIntoField(homePageData.descriptionText)
          .clickDescriptionPreviewLink()
          .getDescriptionPreview()
          .should('have.text', homePageData.descriptionText) 
    });
    
    it("AT_02.07.009 | Homepage Verify the 'Set up an agent' link on the main page when no jobs have been created", () => {
      homePage
        .clickSetUpAgentLink()
        .getPermanentAgentBtn()
        .should("have.text", permanentAgentRadioBtn);
    });

    it('AT_02.04.006 | Verify that link "Build History" is clickable', () => {
      homePage
          .clickBuildHistoryLink()
          .getBuildHistoryPageUrl()
          .should('include', buildHistoryPageData.buildHistoryUrl)
    })
    
    it('AT_02.04.004 | Homepage(Dashboard) | Verify "New Item" redirection', () => {
      homePage
          .clickNewItemSideMenuLink()
          .getNewItemPageUrl()
          .should('include', newItemPageData.newItemEndPoinURL)   
  });

    it('AT_02.07.006 Homepage > Verify the redirection of the "Configure a cloud"', () => {
      homePage
      .clickConfigureACloudLink()
      .getConfigureCloudsHeader()
      .should('have.text', configureCloudsHeader)
    })

    it('AT_02.06.002 Homepage > User is able to add and edit the text in the panel description"', () => {
      homePage
        .clickAddDescriptionLink()
        .typeDescriptionIntoField(homePageData.descriptionText)
        .clickSaveDescriptionBtn()
        .clickEditDescriptionBtn()
        .typeDescriptionIntoField(homePageData.newDescriptionText)
        .clickSaveDescriptionBtn()
        .getDescriptionField()
        .should('have.text', homePageData.newDescriptionText);
    })

    it("AT_02.06_008 | Homepage > Verification of the link 'Hide preview' for description at main panel", () => {
      homePage
      .clickAddDescriptionLink()
      .typeDescriptionIntoField(homePageData.descriptionText)
      .clickDescriptionPreviewLink()
      .clickHideDescriptionPreviewLink()
      .getHideDescriptionPreview().should("not.be.visible")
  })
})
