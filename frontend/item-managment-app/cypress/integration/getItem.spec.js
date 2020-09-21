
describe('Searcn the default item in the database',()=>{
    it('Should find the default item in the database, and display in result div',()=>{
        //Search for the item in the dashboard
        cy.visit('localhost:4200');
        cy.get('#GetItemID');
        cy.get('#InputID').type('1');
        cy.get("#GetItemID").submit();

        //Check if display in result div
        cy.get('#ResultDiv').contains('1')
    })
})