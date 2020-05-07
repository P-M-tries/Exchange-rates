const URL = 'http://192.168.0.31:8080';

context('exchange-rates', () => {
    before(() => {
        cy.visit('http://192.168.0.31:8080');
    });

    describe ('Verifies the client-side form validation', () => {
        it('Verifies the date field is validated accordingly', () => {
            cy.get('#date-input').type('     ');
            cy.get('#convert-button').click();
            cy.get('#error-container0').should('be.visible').and('contain', 'This field cannot be empty');

            cy.get('#date-input').type('gsdgsg');
            cy.get('#convert-button').click();
            cy.get('#error-container0').should('be.visible').and('contain', 'The date must have the following format: year-month-day (eg.: 2010-01-12)');

            cy.get('#date-input').clear().type('1997-12-12');
            cy.get('#convert-button').click();
            cy.get('#error-container0').should('be.visible').and('contain', 'The year must be 1999 or later');

            let todaysDate = new Date().toJSON().slice(0,10).replace(/-/g,'-');
            let splittedTodaysDate = todaysDate.split('-');
            splittedTodaysDate[2] = '0' + (Number(splittedTodaysDate[2]) + 1);
            let futureDate = splittedTodaysDate.join('-');

            cy.get('#date-input').clear().type(futureDate);
            cy.get('#convert-button').click();
            cy.get('#error-container0').should('be.visible').and('contain', 'The date must not be in the future');

        });

        it('Verifies the amount field is validated accordingly', () => {
            cy.get('#amount-input').type('000');
            cy.get('#convert-button').click();
            cy.get('#error-container2').should('be.visible').and('contain', 'This field cannot be 0');

            cy.get('#amount-input').clear().type('asfaf');
            cy.get('#convert-button').click();
            cy.get('#error-container2').should('be.visible').and('contain', 'This field can only be filled with numbers');
        });

        it('Verifies errors disappear when the form is filled correctly', () => {
            cy.get('#date-input').clear().type('2020-01-01');
            cy.get('#convert-button').click();
            cy.get('#error-container0').should('not.be.visible');

            cy.get('#date-input').clear().type('     ');
            cy.get('#amount-input').clear().type('10');
            cy.get('#convert-button').click();
            cy.get('#error-container0').should('be.visible').and('contain', 'This field cannot be empty');
            cy.get('#error-container2').should('not.be.visible');
        });
   });


    describe ('Verifies the web app interacts properly with the API and data is displayed appropiately', () => {
        it('Verifies the data displayed is the correct data', () => {
            cy.get('#date-input').clear().type('2020-01-01');
            cy.get('#select-menu').select('USD');
            cy.get('#amount-input').clear().type('10');
            cy.get('#convert-button').click();

            cy.get('#CAD-exchange').should('contain', '1.30');
            cy.get('#CAD-exchange').next().should('contain', '12.99');
            cy.get('#EUR-exchange').should('contain', '0.89');
            cy.get('#EUR-exchange').next().should('contain', '8.90');
        });
    });

    describe ('Verifies the web app can be used multiple times', () => {

        it('Verifies the bottom to get to the top of the page is working', () => {
            cy.get('#top-button').scrollIntoView();
            cy.wait(1000);
            cy.get('#top-button').click();
            cy.wait(1000);
        })

        it('Verifies the form validation of the date field keeps working', () => {

            cy.get('#date-input').clear().type('     ');
            cy.get('#convert-button').click();
            cy.get('#error-container0').should('be.visible').and('contain', 'This field cannot be empty');

            cy.get('#date-input').type('gsdgsg');
            cy.get('#convert-button').click();
            cy.get('#error-container0').should('be.visible').and('contain', 'The date must have the following format: year-month-day (eg.: 2010-01-12)');

            cy.get('#date-input').clear().type('1997-12-12');
            cy.get('#convert-button').click();
            cy.get('#error-container0').should('be.visible').and('contain', 'The year must be 1999 or later');

            let todaysDate = new Date().toJSON().slice(0,10).replace(/-/g,'-');
            let splittedTodaysDate = todaysDate.split('-');
            splittedTodaysDate[2] = '0' + (Number(splittedTodaysDate[2]) + 1);
            let futureDate = splittedTodaysDate.join('-');

            cy.get('#date-input').clear().type(futureDate);
            cy.get('#convert-button').click();
            cy.get('#error-container0').should('be.visible').and('contain', 'The date must not be in the future');

        });

        it('Verifies the form validation of the amount field keeps working', () => {
            cy.get('#amount-input').clear().type('000');
            cy.get('#convert-button').click();
            cy.get('#error-container2').should('be.visible').and('contain', 'This field cannot be 0');

            cy.get('#amount-input').clear().type('asfaf');
            cy.get('#convert-button').click();
            cy.get('#error-container2').should('be.visible').and('contain', 'This field can only be filled with numbers');

        });

        it('Verifies new data can be displayed when the API is called', () => {
            cy.get('#date-input').clear().type('2020-04-01');
            cy.get('#select-menu').select('CAD');
            cy.get('#amount-input').clear().type('5');
            cy.get('#convert-button').click();

            cy.get('#EUR-exchange').should('contain', '0.64');
            cy.get('#EUR-exchange').next().should('contain', '3.20');
            cy.get('#USD-exchange').should('contain', '0.70');
            cy.get('#USD-exchange').next().should('contain', '3.50');

        });

    });

});