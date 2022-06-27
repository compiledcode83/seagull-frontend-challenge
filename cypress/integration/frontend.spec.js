import { map, uniq, countBy, pickBy, sample } from "lodash";
describe("Frontend Test Spec", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  // it('should visit index', () => {
  // 	cy.visit('/');
  // });

  it("should contain pictures on mount", () => {
    console.log(cy.get("img"));
    cy.get("img").should("have.length", 10);
  });

  it("should delete when image is clicked", () => {
    cy.get("img").should("have.length", 10);
    cy.get("img").eq(0).click();
    cy.get("img").should("have.length", 9);
  });

  it("should add a new record when the add button is clicked", () => {
    cy.get("img").should("have.length", 10);
    cy.get("button#addition").click();
    cy.get("img").should("have.length", 11);
  });

  it("should not crash when all images are deleted", () => {
    cy.get("img")
      .click({ multiple: true })
      .then(() => {
        cy.contains("No persons...");
      });
  });

  it("should change to table view and still have no persons", () => {
    cy.get("img")
      .click({ multiple: true })
      .then(() => {
        cy.contains("No persons...");
      });

    cy.get("button#switcher").then(($button) => {
      const content = $button.text();
      $button.click();
      cy.get("button#switcher").should(($btn2) => {
        expect($btn2.text()).to.not.eq(content);
        $btn2.click();
      });

      cy.contains("No persons...");
    });
  });

  // add ten new records
  it("should be able to add 10 new records", () => {
    cy.get("img").should("have.length", 10);
    cy.get("img")
      .click({ multiple: true })
      .then(() => {
        cy.contains("No persons...");
      });
    for (let i = 0; i < 10; i++) {
      cy.get("button#addition").click();
      cy.wait(350);
    }
    cy.get("img").should("have.length", 10);
  });

  it("should switch to table view and contain ten rows", () => {
    cy.get("button#switcher").click();
    // cy.get('img').should('have.length', 0).or('not.exist');
    cy.get("img").should("not.exist");
    cy.get("table")
      .should("have.length", 1)
      .and(($table) => {
        expect($table.find("tbody tr").length).to.eq(10);
      });
  });

  it("should be able to delete from a table", () => {
    cy.get("img").should("have.length", 10);
    cy.get("button#switcher").click();
    cy.get("table tbody tr").eq(0).click();
    cy.get("table tbody tr").should("have.length", 9);
  });

  it("should be able add to a table", () => {
    cy.get("img").should("have.length", 10);
    cy.get("button#switcher").click();
    cy.get("table").should("have.length", 1);
    cy.get("button#addition").click();
    cy.get("table tbody tr").should("have.length", 11);
  });

  it("should be able to switch back to pics and then table again", () => {
    cy.get("img").should("have.length", 10);
    cy.get("button#switcher").click();
    cy.get("table").should("have.length", 1);
    cy.get("table tbody tr").should("have.length", 10);
    cy.get("img").should("not.exist");
    cy.get("button#switcher").click();
    cy.get("img").should("have.length", 10);
    cy.get("table").should("not.exist");
  });

  // it('should be able to filter by name for pictures', () => {
  // 	cy.get('img')
  // 		.should('have.length', 10)
  // 		.and(($list) => {
  // 			const values = countBy(map($img, 'alt'));
  // 			const uniq = pickBy(values, (value) => value === 1);
  // 			const randomLast = sample(uniq);
  // 			cy.get('input').type(randomLast);
  // 			cy.get('img').should('have.length', 1);
  // 		});
  // });
});
