describe('Check delete operation', () => {
    it("Should delete the default item in the database", () => {
        cy.visit('localhost:4200');
        cy.get('table[name=Table]').get('#ItemIdTD').eq(0).get('#DeleteButton').click({force:true}).get('#DeleteApply').click();
    })
})