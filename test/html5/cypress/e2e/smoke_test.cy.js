Cypress.on("window:before:load", (win) => {
  cy.spy(win.console, "error");
  cy.spy(win.console, "warn");
  cy.spy(win.console, "log");
});

describe("GodotXterm HTML5 export", () => {
  it("Loads and runs without error", () => {
    cy.visit("http://localhost:3000");
    cy.compareSnapshot("menu", 0.9, {
      limit: 100,
      delay: 200,
      timeout: 20000,
    });
    cy.get("body").type("{downArrow}{enter}");
    cy.get("body").type('window.console.log("It works!"){enter}');
    cy.window().then((win) => {
      cy.expect(win.console.error).to.have.callCount(0);
      cy.expect(win.console.warn).to.have.callCount(0);
      cy.expect(win.console.log).to.be.calledWith("It works!");
    });
  });
});
