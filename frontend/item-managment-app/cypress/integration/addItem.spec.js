describe("Check correctness of the adding functionality", ()=>{
    it("Should add an item succesfully and display in result container",()=>{

        // Here we find the add element and fill the details of the item
        cy.visit("localhost:4200");
        cy.get("#AddItemID");
        cy.get('#NameInput').type('CypressTest');
        cy.get('#AmountInput').type('1');
        cy.get('#DescriptionInput').type('Testing via cypress module');
        cy.get("#AddItemID").submit();

        // Now we see if the result has yeiled correct response.
        cy.get("#ResultDiv").contains("Item has been added!");
        
    })
})