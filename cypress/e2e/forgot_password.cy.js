const extractLink = (text) => {
  const startString = "Đổi mật khẩu";
  const endString =
    "Nếu bạn không gửi yêu cầu đổi mật khẩu, vui lòng không nhấn vào đường dẫn trên";

  const startIndex = text.indexOf(startString) + startString.length;
  const endIndex = text.indexOf(endString);

  const subText = text.slice(startIndex, endIndex);

  // Regular expression to find the link
  const urlRegex = /https?:\/\/[^\s]+/;
  const match = subText.match(urlRegex);

  return match ? match[0] : null;
};

const NameSpace = Cypress.env("TESTMAIL_NAMESPACE");
const apiKey = Cypress.env("TESTMAIL_APIKEY");

describe("Forgot Password scenario", () => {
  
  const TempEmail = "test"; // This will act as a tag to filter Email
  // const UserEmail = `${NameSpace}.${TempEmail}@inbox.testmail.app`;
  // wqw6y.signup@inbox.testmail.app
  let resetPasswordLink = "";

  it("empty_email", function () {
    cy.visit("https://dev-cfz.skydev.vn/");
    cy.get(
      ".contentHeader--Cfhj > :nth-child(3) > :nth-child(1) > span"
    ).click();
    cy.get(".btnForgotPass--newY > a").click();
    cy.get(".ant-form-item-control-input-content > .ant-btn").click();
    cy.get("#basic_email_help").should("contain", "Vui lòng nhập email");
  });

  it("invalid_email", function () {
    cy.visit("https://dev-cfz.skydev.vn/");
    cy.get(
      ".contentHeader--Cfhj > :nth-child(3) > :nth-child(1) > span"
    ).click();
    cy.get(".btnForgotPass--newY > a").click();
    cy.get("#basic_email").type("tester01");
    cy.get(
      ".ant-form-item-control-input-content > .ant-btn > :nth-child(1)"
    ).click();
    cy.get("#basic_email_help").should(
      "contain",
      "Email không đúng định dạng, vui lòng kiểm tra lại"
    );
  });

  it("non_existing_email", function () {
    cy.visit("https://dev-cfz.skydev.vn/");
    cy.get(
      ".contentHeader--Cfhj > :nth-child(3) > :nth-child(1) > span"
    ).click();
    cy.get(".btnForgotPass--newY > a").click();
    cy.get("#basic_email").clear("te");
    cy.get("#basic_email").type("tester00@gmail.com");
    cy.get(".iconArrow--2Wa7").click();
    cy.get(".ant-message-error").should("contain", "Email không tồn tại");
  });

  it("existing_email", function () {
    cy.visit("https://dev-cfz.skydev.vn/");
    cy.get(
      ".contentHeader--Cfhj > :nth-child(3) > :nth-child(1) > span"
    ).click();
    cy.get(".btnForgotPass--newY > a").click();
    cy.get("#basic_email").clear();
    cy.get("#basic_email").type("wqw6y.test@inbox.testmail.app");
    cy.get(".iconArrow--2Wa7").click();
  });

  it("Gets a Password Reset email", () => {
    const startTimestamp = Date.now();
    cy.request(
      "GET",
      `https://api.testmail.app/api/json?apikey=${apiKey}&namespace=${NameSpace}&livequery=true&pretty=true&tag=${TempEmail}&timestamp_from=${startTimestamp}`
    ).then((res) => {
      const email = res.body.emails[0]; // Filter the lastest Email
      cy.log(email.text);
      const text = email.text;
      // Check text has the change password string
      expect(text).to.include("YÊU CẦU ĐỔI MẬT KHẨU");
      expect(text).to.include("wqw6ytest");
      resetPasswordLink = extractLink(text).slice(0, -1);
      cy.log("Extracted Link:", resetPasswordLink);
    });
  });

  // Validate the reset password link
  it("Validate the reset password link", () => {
    cy.visit(resetPasswordLink);
    cy.get("#basic_password").type("12345");
    cy.get("#basic_password_help").should(
      "contain",
      "Mật khẩu phải có tối thiểu 8 kí tự"
    );
    cy.get("#basic_password").clear("12345");
    cy.get("#basic_password").type("clgslsm216");
    cy.get("#basic_confirmPassword").type("basic_confirmPassword_help");
    cy.get("#basic_confirmPassword_help").should(
      "contain",
      "Xác nhận mật khẩu phải giống với mật khẩu đã nhập"
    );
    cy.get("#basic_confirmPassword").clear("basic_confirmPassword_help");
    cy.get("#basic_confirmPassword").type("clgslsm216");
    cy.get(
      ".ant-form-item-control-input-content > .ant-btn > :nth-child(1)"
    ).click();
    cy.contains("Mật khẩu đã được thay đổi thành công.").should("exist");
  });
});
