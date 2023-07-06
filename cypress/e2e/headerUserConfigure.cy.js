/// <reference types="cypress"/>

import userDescription from '../fixtures/userDescription.json'

describe.skip('Header User configure', () => {
    Cypress.Commands.add('navigateUserConfigurationPage', () => {
        cy.get('.login .model-link').should('be.visible');
        cy.get('#page-header .login a.model-link button.jenkins-menu-dropdown-chevron').click({ force: true });
        cy.get('#breadcrumb-menu li.yuimenuitem a span').contains('Configure').click();
    });
    Cypress.Commands.add('saveDataUserConfigurationPage', (button) => {
        cy.intercept('POST',
            `http://localhost:${Cypress.env('local.port')}/user/admin/configSubmit`)
            .as('saved');
        cy.get(button).click();
        cy.wait(['@saved']);
    });
    
    Cypress.Commands.add('openConfigurationPage', () => {
        cy.get('.page-header .jenkins-menu-dropdown-chevron').realHover().click()
        cy.get('a[href*="/configure"]').click()
    });

    const descriptionText = 'Some example description';
    const descriptionField = () =>
        cy.get('#main-panel form[name="config"] div.setting-main')
            .find('textarea[name="_.description"]');
    const saveButton = '#bottom-sticker button[name="Submit"]';
    const applyButton = '#bottom-sticker button.jenkins-button.apply-button';
    const userId = Cypress.env('local.admin.username').toLowerCase();
    const jenkinsPort = Cypress.env('local.port');
    const jenkinsURL = 'http://localhost:'+jenkinsPort;
    const userURL = jenkinsURL+'/user/'+userId+'/';
    
    it.skip('AT_01.05_001| <Header>User configure menu item', function () {
        cy.navigateUserConfigurationPage().then(() => {
            cy.url().should('eq', userURL + 'configure');
        });
    });

    it.skip('AT_01.05_004| <Header> <User Configure> insert information about user', function () {
        cy.navigateUserConfigurationPage().then(() => {
            descriptionField().should('be.visible');
            descriptionField().type('{selectall}').then(() => {
                descriptionField().type(descriptionText).then(() => {
                    cy.saveDataUserConfigurationPage(applyButton);
                    cy.visit(userURL)
                        .then(() => {
                            cy.url().should('eq', userURL);
                            cy.get('#description>div:first-child').invoke('text').should('eq', descriptionText);
                        });
                });
            });
        });
    });

    it.skip('AT_01.05 _008| <Header> User can change information about user', function () {
        cy.navigateUserConfigurationPage().then(() => {
            descriptionField().should('be.visible');
            descriptionField().type('{selectall}').then(() => {
                descriptionField().type('{del}').then(() => {
                    descriptionField().type(descriptionText+' CHANGED').then(() => {
                        cy.saveDataUserConfigurationPage(applyButton);
                        cy.visit(userURL)
                            .then(() => {
                                cy.url().should('eq', userURL);
                                cy.get('#description>div:first-child').invoke('text').should('eq',descriptionText+' CHANGED');
                            });
                    });
                });
            });
        });
    });

    it('AT_01.05_005| <Header> <User Configure> delete information about user', function () {
        cy.navigateUserConfigurationPage().then(() => {
            descriptionField().should('be.visible');
            descriptionField().type('{selectall}').then(() => {
                descriptionField().type('{del}').then(() => {
                    cy.saveDataUserConfigurationPage(applyButton);
                    cy.visit(userURL)
                        .then(() => {
                            cy.url().should('eq', userURL);
                            cy.get('#description>div:first-child').invoke('text').should('be.empty');
                        });
                });
            });
        });
    });


    it.skip('AT_01.05_007 | <Header>The user is able to select the option "Configure" from the dropdown menu "User"', () => {
        cy.get('.login button').click({ force: true })
        cy.get('.yuimenuitemlabel').contains('Configure').click()
        cy.get('#breadcrumbs').should('contain', 'Configure')
    })

    it.skip('AT_01.05.009 | <Header>User should be able to choose the “Configure“ menu item in the “User” dropdown-menu', () => {
        cy.get('#page-header .login a.model-link button.jenkins-menu-dropdown-chevron').click({ force: true });
        cy.get('#breadcrumb-menu li.yuimenuitem a span').contains('Configure').click();
        cy.get(`${saveButton}`).click()
        cy.get('#main-panel').should('be.visible')
    })

    it.skip('AT_01.05_011 | Header>Redirect to User Configure Page', () => {
        cy.get("a[href^='/user/']>.jenkins-menu-dropdown-chevron")
          .realHover()
          .click({force: true});
        cy.get('#yui-gen2').click();
        cy.get("li[aria-current='page']").should('have.text', 'Configure');
    })


    it.skip('AT_01.05_12 | Verify User can configure user account', () => {
        cy.get('a[href^="/user/"] button[class="jenkins-menu-dropdown-chevron"]').realHover().click()
        cy.get('#yui-gen2').click()
        cy.get('textarea[name="_.description"]').type(userDescription.textDescription)
        cy.get('button[name="Submit"]').click()
        cy.get('#description').should('contain', userDescription.textDescription)
        cy.get('#tasks>:nth-child(4)').click()
        cy.get('textarea[name="_.description"]').clear().type(userDescription.editDescription)
        cy.get('button[name="Submit"]').click()
        cy.get('#description').should('contain', userDescription.editDescription)
        cy.get('#tasks>:nth-child(4)').click()
        cy.get('textarea[name="_.description"]').clear()
        cy.get('button[name="Submit"]').click()
        cy.get('#description-link').should('contain', 'Add description')
    })

    it.skip ('AT_01.05_013 | Header>Visiting User Configure Page and Filling Out the User Account', () => {
        cy.get("a[href^='/user/']>.jenkins-menu-dropdown-chevron")
          .click({force: true});
        cy.get('#yui-gen2').click();
        cy.get("textarea[name='_.description']").type(userDescription.textDescription);
        cy.get("button[formnovalidate='formNoValidate']").click();
        cy.get('#description').should('include.text', userDescription.textDescription);
    })

    it.skip ('AT_01.05_014 | Header>Visiting User Configure Page and Changing User Information', () => {
        cy.get("a[href^='/user/']>.jenkins-menu-dropdown-chevron")
          .realHover()
          .click();
        cy.get('#yui-gen2').click();
        cy.get("textarea[name='_.description']").type(userDescription.textDescription);
        cy.get("button[formnovalidate='formNoValidate']").click();
        cy.get('#description-link')
        .click();
      cy.get("textarea[name='description']")
        .clear()
        .type(userDescription.chengedDescription);
      cy.get("button[formnovalidate='formNoValidate']").click();
      cy.get('#description').should('include.text', userDescription.chengedDescription);
    });

    it.skip('AT_01.05_015 | Header>Visiting User Configure Page and Deleting User Information', () => {
        cy.navigateUserConfigurationPage();
        descriptionField().type(userDescription.chengedDescription);
        cy.get(`${saveButton}`).click();
        cy.navigateUserConfigurationPage();
        descriptionField().clear();
        cy.get(`${saveButton}`).click();
        cy.get('#description-link').should('contain', 'Add description');
    });

    it.skip('AT_01.05.10 | Header> Verify User redirected on page configure', () => {
        cy.openConfigurationPage();
        cy.get('.jenkins-form-label').eq(0).should('contain', userDescription.fieldName) 
    })
})
