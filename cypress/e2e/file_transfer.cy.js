describe("file_transfer_flow", () => {
  // Define the number of files to test
  const numberOfFiles = 10;

  for (let i = 1; i <= numberOfFiles; i++) {
    it(`log_in_success for file_${i}.json`, function () {
      cy.visit("https://products.groupdocs.app/conversion/json-to-txt");
      cy.get('[class="js-fileinput gd-upload__fileinput"]').click();
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(1000);
      cy.get("input[type=file]").selectFile(`cypress/upload/file_${i}.json`, {
        force: true,
      });
      cy.get("#convertBtn", { timeout: 60000 }).should("be.visible").click();
      cy.get(":nth-child(1) > .convert-result__header", {
        timeout: 60000,
      }).should("be.visible");
      cy.get(":nth-child(1) > .convert-result__header").should(
        "contain",
        "Your file has been converted successfully"
      );
      cy.get("#convertDownload").click();
      cy.readFile(`cypress/downloads/file_${i}.txt`).should("exist");
      cy.exec(
        `python -u cmp.py txt_files/file_${i}.txt cypress/downloads/file_${i}.txt`,
        { failOnNonZeroExit: false }
      ).then((result) => {
        expect(result.code).to.eq(0);
        expect(result.stdout).to.not.contain("NOT IDENTICAL");
        cy.log(result.stdout);
      });
    });
  }
});
