import HomePage from "../../pageObjects/HomePage";  
import newItemPageData from "../../fixtures/pom_fixtures/newItemPage.json" 

describe('createJobLink', () => {

    const homePage = new HomePage();

    it('AT_02.01_004| <Homepage> Create a job link', () => {
        homePage
            .clickCreateJobLink()
            .getNewItenHeader()
            .should('have.text', newItemPageData.newItemHeader);
    })
})