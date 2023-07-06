import HomePage from "../pageObjects/HomePage";
import JenkinsPage from './JenkinsPage'
import LoginPage from "./LoginPage";
import MyViewPage from "./MyViewPage";
import RestAPIPage from "./RestAPIPage"
import ResultSearchBoxPage from "./ResultSearchBoxPage";
import UserBuildsPage from "./UserBuildsPage";
import UserConfigurePage from "../pageObjects/UserConfigurePage";
import UserCredentialsPage from './UserCredentialsPage';
import UserProfilePage from "./UserProfilePage";
import searchBoxDocumentationPage from "./SearchBoxDocumentationPage";

class HeaderAndFooter {
    getUserNameLink = () => cy.get('div.login a[href*="user"]');
    getUserDropDownBtn = () => cy.get('div.login a[href*="user"] button');
    getUserConfigureMenu = () => cy.get('#breadcrumb-menu li a[href*="configure"] span');
    getUserDropdownMenuItemsList = () => cy.get('.bd li');
    getRestAPILink = () => cy.get('[href="api/"]');
    getUserMyViewsMenu = () => cy.get('#breadcrumb-menu li a[href*="my"] span');
    getJenkinsHomeLink = () => cy.get('#jenkins-home-link');
    getSearchBox = () => cy.get('#search-box');
    getLogOutBtn = () => cy.get('[href="/logout"]');
    getSearchBoxInputField = () => cy.get('input#search-box');
    getSearchBoxResultDropDownList = () => cy.get('#search-box-completion li:not([style="display: none;"])');
    getJenkinsLinkVerNumber = () => cy.get('.jenkins_ver a');
    getJenkinsVersionLink = () => cy.get('div[class$="white jenkins_ver"] a')
    getUserBuildsMenu = () => cy.get('#breadcrumb-menu li a[href*="builds"] span');
    getHeadIcon = () => cy.get('#jenkins-head-icon');
    getHeadIconName = () => cy.get('#jenkins-name-icon');
    getUserCredentialsMenu = () => cy.get('#breadcrumb-menu li a[href*="credentials"] span');
    getPageBody = () => cy.get('#page-body');
    getSearchBoxIconTrailing = () => cy.get('.main-search__icon-trailing');
    getUserDropDownMenuCredentials = () => cy.get('#yui-gen4');
    getCurrentUserName = () => cy.get('.login .model-link span');

    clickJenkinsVersionLink() {
        this.getJenkinsVersionLink().invoke('removeAttr', 'target').click()
        return new JenkinsPage;
    }

    clickUserDropDownBtn() {
        this.getUserDropDownBtn().realHover().click();
        return this;
    }

    selectUserConfigureMenu() {
        this.getUserConfigureMenu().click();
        return new UserConfigurePage();
    }

    clickRestAPILink() {
        this.getRestAPILink().click()
        return new RestAPIPage();
    }

    createUserDropdownMenuItemsList() {
        return this
            .getUserDropdownMenuItemsList()
            .then($els => {
                return Cypress._.map($els, 'innerText')
            });
    }

    selectUserMyViewsMenu() {
        this.getUserMyViewsMenu().click();
        return new MyViewPage();
    }

    clickJenkinsHomeLink() {
        this.getJenkinsHomeLink().click();
        return new HomePage();
    }

    searchTextSearchBox(text) {
        this.getSearchBoxInputField().type(text + '{enter}');
        return new ResultSearchBoxPage();
    }

    clickLogOutBtn() {
        this.getLogOutBtn().click();
        return new LoginPage();
    }

    typeSearchBoxInputField(text) {
        this.getSearchBoxInputField().type(text);
        return this;
    }

    trimSearchBoxResultDropDownList() {
        return this.getSearchBoxResultDropDownList().each(($el) => {
            return cy.wrap($el.text().trim());
        });
    }

    isIncludedLowerAndUpperLetters(text, lowerLetter, upperLetter) {
        return text.includes(lowerLetter) || text.includes(upperLetter);
    }

    selectUserBuildsMenu() {
        this.getUserBuildsMenu().click();
        return new UserBuildsPage();
    }

    selectUserCredentialsMenu() {
        this.getUserCredentialsMenu().click();
        return new UserCredentialsPage();
    }

    clickUserNameLink() {
        this.getUserNameLink().click();
        return new UserProfilePage();
    }

    clickEachDropdownMenuItems(idx) {
        this.getUserDropdownMenuItemsList().eq(idx).click();
        return this;
    }

    verifyPagesUrl(idx) {
        cy.url().should('contain', idx);
        return this;
    }

    clickSearchBoxIconTrailing() {
        this.getSearchBoxIconTrailing().click();
        return new searchBoxDocumentationPage();
    }

    clickUserDropDownMenuCredentials() {
        this.getUserDropDownMenuCredentials().click();
        return new UserCredentialsPage();
    }

    clickHeadIcon() {
        this.getHeadIcon().click();
        return new HomePage();
    }

}

export default HeaderAndFooter;