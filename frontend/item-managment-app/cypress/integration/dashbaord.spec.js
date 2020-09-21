const { createYield } = require("typescript")

describe("First test", () =>{
    it("Should visit the dashboard page", () =>{
        cy.visit("localhost:4200");
        
    })
})