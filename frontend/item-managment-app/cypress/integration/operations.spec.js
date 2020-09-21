describe('Check all operations available', () => {
    it("Should make all the operations available on the default item WITHOUT deletion", () => {
        //Deposit an amount of 10 to the default item in the database.
        cy.visit('localhost:4200');
        cy.get('table[name=Table]').get('#ItemIdTD').eq(0).get('#DepositButton').click({ force: true });
        cy.get('#DepositForm');
        cy.get('#AmountDepositInput').type(10).get('#ApplyDeposit').click({ force: true });

        //Withdraw an amount of 1 from the default item in the database.
        cy.get('table[name=Table]').get('#ItemIdTD').eq(0).get('#WithdrawButton').click({ force: true });
        cy.get('#WithdrawForm');
        cy.get('#AmountWithdrawInput').type(10).get('#ApplyWithdraw').click({ force: true });

        /*
        Update the default item.
        New name: Eliran Updated
        New amount: 100
        New description: The item has been updated!
        */
        cy.get('table[name=Table]').get('#ItemIdTD').eq(0).get('#UpdateButton').click({ force: true });
        cy.get('#UpdateForm');
        cy.get('#NameUpdateInput').type('Eliran Updated').get('#AmountUpdateInput').type(100).get('#DescriptionUpdateInput').type('Item has been updated!')
        .get('#UpdateApply').click({ force: true });
    })
})