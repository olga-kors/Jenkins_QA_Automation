import MultibranchPipelineConfigurePage from "./MultibranchPipelineConfigurePage";
import MultiConfigurationProjectConfigurePage from "./MultiConfigurationProjectConfigurePage";
import FreestyleProjectConfigurePage from "./FreestyleProjectConfigurePage";
import PipelineConfigurePage from "./PipelineConfigurePage";
import OrgFolderConfigurePage from "./OrgFolderConfigurePage";
import FolderConfigurePage from "./FolderConfigurePage";
import ErrorMessagePage from "./ErrorMessagePage";

class NewItemPage {
    getNewItemPageUrl = () => cy.url()
    getNewItemNameInputField = () => cy.get('#name');
    getMultibranchPipelineItem = () => cy.get('li[class$="WorkflowMultiBranchProject"]');
    getFreestyleProjectItem = () => cy.get('li[class$="FreeStyleProject"]');
    getNewItemOkBtn = () => cy.get('#ok-button');
    getNewItemNames = () => cy.get('.label');
    getPipelineItem = () => cy.get('ul .org_jenkinsci_plugins_workflow_job_WorkflowJob'); 
    getMultiConfigurationProjectItem = () => cy.get(".hudson_matrix_MatrixProject");
    getOrgFolderItem = () => cy.get('.jenkins_branch_OrganizationFolder');
    getNewItenHeader = () => cy.get('.header .h3');
    getFolderItem = () => cy.get('li[class*="folder"]');
    getNewItemHeader = () => cy.get('.header .h3');
    getEachItemsName = () => cy.get('#createItem li[tabindex]')
    getWarningMessage = () => cy.get('#itemname-required');
    getNewItemHeader = () => cy.get('.header .h3');  
    getErrorMessageForInvalidInput = () => cy.get('.header #itemname-invalid')
    getNewItemPageTitle = () => cy.get('head title')
    getNewItemTypeIcons = () => cy.get('.j-item-options .icon')   


    typeNewItemNameInputField(name) {
        this.getNewItemNameInputField().clear().type(name);
        return this;
    };

    selectMultibranchPipelineItem() {
        this.getMultibranchPipelineItem().click();
        return this;
    };

    clickOkBtnAndGoMultiPipelineConfig() {
        this.getNewItemOkBtn().click();
        return new MultibranchPipelineConfigurePage();
    };

    createNewItemNamesList() {
        return this.getNewItemNames().then($els => {
            return Cypress.$.makeArray($els).map($el => $el.innerText)
        });
    };

    selectMultiConfigurationProjectItem() {
        this.getMultiConfigurationProjectItem().click();
        return this;
      }

      clickOkBtnAndGoMultiConfProjectConfig() {
        this.getNewItemOkBtn().click();
        return new MultiConfigurationProjectConfigurePage();
      }
    selectFreestyleProjectItem() {
        this.getFreestyleProjectItem().click();
        return this;
    };

    clickOkBtnAndGoFreestyleProjectConfig() {
        this.getNewItemOkBtn().click();
        return new FreestyleProjectConfigurePage();
    };

    selectOrgFolderItem() {
        this.getOrgFolderItem().click();
        return this;
    };

    clickOkBtnAndGoOrgFolderConfig() {
        this.getNewItemOkBtn().click();
        return new OrgFolderConfigurePage();
    };

    selectPipelineItem() {
        this.getPipelineItem().click();
        return this;
    };

    clickOkBtnAndGoPipelineConfig() {
        this.getNewItemOkBtn().click()
        return new PipelineConfigurePage();
    };

    selectFolderItem() {
        this.getFolderItem().click();
        return this;
      };
  
    clickOkBtnAndGoFolderConfig() {
        this.getNewItemOkBtn().click();
        return new FolderConfigurePage();
      };

    clickEachItemsNameFromMenuListItem(idx) {
        this.getEachItemsName().eq(idx).click()
        return this
    };

    clickOkBtnAndGoErrorPage() {
        this.getNewItemOkBtn().click();
        return new ErrorMessagePage();
    };

    verifyNewItemHeader(name) {
        this.getNewItemHeader().should('have.text', name)
        return this
    };

    clickOkBtnAndGoHomePage() {
        this.getNewItemOkBtn().click();
    };
}
export default NewItemPage;
