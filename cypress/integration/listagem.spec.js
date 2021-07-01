/// <reference types="cypress"/>

context('Listagem', () => {
    it('Listagem sem registros', () => {

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

        cy.visit('WebTable.html');

        cy.get('div[role=row]').should('have.length', 1);

    });
    
    it('Listagem com 1 registro', () => {

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
        
        cy.visit('WebTable.html');
        
        cy.get('div[role=row] div[role=gridcell]').eq(4).find('div').as('gridCellPhone');
        cy.get('@gridCellPhone').should('contain.text', '1212121212');
    });
});