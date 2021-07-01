/// <reference types="cypress"/>

let Chance = require('chance');
let chance = new Chance();

// Implementação dos passos descritos nas features

Given(/^que acessa o site$/, () => {
	//Rotas
    cy.server();
    cy.route({
        method: 'POST',
        url: '**//api/1/databases/userdetails/collections/newtable?**',
        status: 200,
        response: {}
    }).as('postNewtable');
    
    cy.route({
        method: 'POST',
        url: '**//api/1/databases/userdetails/collections/usertable?**',
        status: 200,
        response: {}
    }).as('postUsertable');

    cy.route({
        method: 'GET',
        url: '**/api/1/databases/userdetails/collections/newtable?**',
        status: 200,
        response: {}
    }).as('getNewtable');

    cy.route({
        method: 'GET',
        url: '**/api/1/databases/userdetails/collections/usertable?**',
        status: 200,
        response: {}
    }).as('getUsertable');

    //Visita página
    cy.visit('Register.html');
});


When(/^informar meus dados$/, () => {
	cy.get('input[placeholder="First Name"]').type(chance.first());
    cy.get('input[ng-model^=Last]').type(chance.last());
    cy.get('input[ng-model^=Email]').type(chance.email());
    cy.get('input[ng-model^=Phone]').type(chance.phone({ formatted: false }));
    
    cy.get('input[value=Male]').check();
    cy.get('input[type=Checkbox]').check('Movies');
    cy.get('select[ng-model="Skill"]').select('Certifications');
    cy.get('select[id="countries"]').select('Hungary');
    cy.get('select#country').select('Japan', {force : true});
    cy.get('select#yearbox').select('1953');
    cy.get('select[placeholder="Month"]').select('July');
    cy.get('select#daybox').select('10');
    
    cy.get('#firstpassword').type('Ag@123');
    cy.get('#secondpassword').type('Ag@123');
    
    //incluir arquivo
    cy.get('#imagesrc').attachFile('Image1.png');
        
});

When(/^salvar$/, () => {
    cy.get('#submitbtn').click();

});

Then(/^devo ser cadastrado com sucesso$/, () => {
    cy.wait('@postNewtable').then((resNewtable) =>{
        expect(resNewtable.status).to.eq(200);
    });

    cy.wait('@postUsertable').then((resUsertable) =>{
        expect(resUsertable.status).to.eq(200);
    });

    cy.wait('@getNewtable').then((resNewtable) =>{
        expect(resNewtable.status).to.eq(200);
    });

    cy.wait('@getUsertable').then((resUsertable) =>{
        expect(resUsertable.status).to.eq(200);
    });

    cy.url().should('contain', 'WebTable');
});
