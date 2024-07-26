describe("Login scenario", () => {
  it("log_in_success", function () {
    cy.visit("https://dev-cfz.skydev.vn/");
    cy.get(
      ".contentHeader--Cfhj > :nth-child(3) > :nth-child(1) > span"
    ).click();
    cy.get("#basic_email").type("tester01@gmail.com");
    cy.get("#basic_password").type("tester01@gmail.com");
    cy.get(
      ".ant-form-item-control-input-content > .ant-btn > :nth-child(1)"
    ).click();
    cy.get(".headerRight__userName--R4Y9").should("contain", "u/tester01");
  });
  
  it("Empty_field", function () {
    cy.visit("https://dev-cfz.skydev.vn/");
    cy.get(
      ".contentHeader--Cfhj > :nth-child(3) > :nth-child(1) > span"
    ).click();
    cy.get(".ant-form-item-control-input-content > .ant-btn").click();
    cy.get("#basic_email_help").should("contain", "Vui lòng nhập email");
    cy.get("#basic_password_help").should("contain", "Vui lòng nhập Mật khẩu");
  });

  it("Invalid_email", function () {
    cy.visit("https://dev-cfz.skydev.vn/");
    cy.get(
      ".contentHeader--Cfhj > :nth-child(3) > :nth-child(1) > span"
    ).click();
    cy.get("#basic_email").type("tester01");
    cy.get("#basic_email_help").should(
      "contain",
      "Email không đúng định dạng, vui lòng kiểm tra lại"
    );
  });

  it("Non_existing_account", function () {
    cy.visit("https://dev-cfz.skydev.vn/");
    cy.get(
      ".contentHeader--Cfhj > :nth-child(3) > :nth-child(1) > span"
    ).click();
    cy.get("#basic_email").type("tester00@gmail.com");
    cy.get("#basic_password").type("tester00@gmail.com");
    cy.get(
      ".ant-form-item-control-input-content > .ant-btn > :nth-child(1)"
    ).click();
    cy.get(".errorMessage--zUTV").should(
      "contain",
      "Không tìm thấy tài khoản!"
    );
  });

  it("Wrong_password", function () {
    cy.visit("https://dev-cfz.skydev.vn/");
    cy.get(
      ".contentHeader--Cfhj > :nth-child(3) > :nth-child(1) > span"
    ).click();
    cy.get("#basic_email").type("tester01@gmail.com");
    cy.get("#basic_password").type("tester00@gmail.com");
    cy.get(
      ".ant-form-item-control-input-content > .ant-btn > :nth-child(1)"
    ).click();
    cy.get(".errorMessage--zUTV").should(
      "contain",
      "Email hoặc Mật khẩu chưa chính xác, vui lòng kiểm tra lại!"
    );
  });
});
