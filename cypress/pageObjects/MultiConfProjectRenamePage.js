import HomePage from "./HomePage";
import MultiConfProjectConfirmRenamePage from "./MultiConfProjectConfirmRenamePage";

class MultiConfProjectRenamePage {
    getMultiConfProjectNameInputField = () => cy.get('input[name="newName"]');
    getMultiConfProjectRenameBtn = () => cy.get('button[name=Submit]'); 
    getGoHome = () => cy.get('#jenkins-home-link');
    
    typeMultiConfProjectNameInputField(name) {
        this.getMultiConfProjectNameInputField().clear().type(name);
        return this
    }
    clickMultiConfProjectRenameBtn() {
        this.getMultiConfProjectRenameBtn().click();
        return new MultiConfProjectConfirmRenamePage();
    }  

    clickRenameBtnMultiConfProject() {
        this.getMultiConfProjectRenameBtn().click();
        return this
    }

    clickGoHome(){
        this.getGoHome().click();
        return new HomePage();
    }
}
export default MultiConfProjectRenamePage;