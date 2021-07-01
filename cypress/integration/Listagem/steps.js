/// <reference types="cypress"/>

Given(/^que o site não possui registros$/, () => {
    cy.server();
    cy.route({
        method: 'GET',
        url: '**/api/1/databases/userdetails/collections/newtable?**',
        status: 200,
        response: 'fixture:webtable-get-empty'
    }).as('getNewtable');

    cy.route({
        method: 'GET',
        url: '**/api/1/databases/userdetails/collections/usertable?**',
        status: 200,
        response: []
    }).as('getUsertable');
});

When(/^acesso a listagem$/, () => {
    cy.visit('WebTable.html');
});

Then(/^devo visualizar a listagem vazia$/, () => {
    cy.get('div[role=row]').should('have.length', 1);
});

Given(/^que o site possui apenas um registro$/, () => {
    cy.server();
    cy.route({
        method: 'GET',
        url: '**/api/1/databases/userdetails/collections/newtable?**',
        status: 200,
        response: 'fixture:webtable-get-only'
    }).as('getNewtable');

    cy.route({
        method: 'GET',
        url: '**/api/1/databases/userdetails/collections/usertable?**',
        status: 200,
        response: []
    }).as('getUsertable');
});

Then(/^devo visualizar apenas um registro na lista$/, () => {
    cy.get('div[role=row] div[role=gridcell]').eq(4).find('div').as('gridCellPhone');
    cy.get('@gridCellPhone').should('contain.text', '1212121212');
});

