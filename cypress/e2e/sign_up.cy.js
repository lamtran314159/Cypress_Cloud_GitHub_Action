const extractLink = (text) => {
  const startString = "Xác thực email";
  const endString =
    "Nếu bạn gặp phải bất kỳ vấn đề gì, vui lòng liên hệ tới ban quản trị CafeFinz";

  const startIndex = text.indexOf(startString) + startString.length;
  const endIndex = text.indexOf(endString);

  const subText = text.slice(startIndex, endIndex);

  // Regular expression to find the link
  const urlRegex = /https?:\/\/[^\s]+/;
  const match = subText.match(urlRegex);

  return match ? match[0] : null;
};
const ChanceJS = require("chance");
const chance = new ChanceJS();
const TAG = chance.string({
  length: 6,
  pool: "abcdefghijklmnopqrstuvwxyz0123456789",
});
const TESTEMAIL = `${Cypress.env(
  "TESTMAIL_NAMESPACE"
)}.${TAG}@inbox.testmail.app`;
const NameSpace = Cypress.env("TESTMAIL_NAMESPACE");
const apiKey = Cypress.env("TESTMAIL_APIKEY");
describe("Sign up scenario", () => {
  before(() => {});
  const TempEmail = TAG;
  let resetPasswordLink = "";
  //   const TESTEMAIL = `${Cypress.env("TESTMAIL_NAMESPACE")}.${TAG}@gmail.com`;

  it("empty_email", function () {
    cy.visit("https://dev-cfz.skydev.vn/");
    cy.get(".btnDisable--tL1m").click();
    cy.get(
      ".ant-form-item-control-input-content > .ant-btn > :nth-child(1)"
    ).click();
    cy.get(".ant-form-item-explain-error").should(
      "have.text",
      "Vui lòng nhập Email"
    );
  });

  it("invalid_email", function () {
    cy.visit("https://dev-cfz.skydev.vn/");
    cy.get(".btnDisable--tL1m").click();
    cy.get("#basic_email").click();
    cy.get("#basic_email").type("tester01");
    cy.get(".ant-form-item-explain-error").should(
      "have.text",
      "Email không đúng định dạng, vui lòng kiểm tra lại"
    );
  });

  it("existing_email", function () {
    cy.visit("https://dev-cfz.skydev.vn/");
    cy.get(".btnDisable--tL1m").click();
    cy.get("#basic_email").click();
    cy.get("#basic_email").type("tester01@gmail.com");
    cy.get(
      ".ant-form-item-control-input-content > .ant-btn > :nth-child(1)"
    ).click();
    cy.get(".errorMessage--zUTV > p").should(
      "have.text",
      "Email đã tồn tại trong hệ thống, vui lòng chọn Email khác"
    );
  });

  it("non_existing_email", function () {
    cy.visit("https://dev-cfz.skydev.vn/");
    cy.get(".btnDisable--tL1m").click();
    cy.get("#basic_email").click();
    cy.get("#basic_email").type("wqw6y.ahihi@inbox.testmail.app");
  });

  it("signup_flow", function () {
    cy.visit("https://dev-cfz.skydev.vn/");
    cy.get(".btnDisable--tL1m").click();
    cy.get("#basic_email").click();
    cy.get("#basic_email").type(TESTEMAIL);
    cy.get(".ant-form-item-control-input-content > .ant-btn").click();
    cy.get(".titleHeading--pzOQ").should("have.text", "Đăng ký");
    cy.get("#basic_password").type("12345");
    cy.get("#basic_password_help > .ant-form-item-explain-error").should(
      "have.text",
      "Mật khẩu phải có tối thiểu 8 kí tự"
    );
    cy.get("#basic_password").clear();
    cy.get("#basic_password").type("clgslsm216");
    cy.get("#basic_confirmPassword").type("123456");
    cy.get(".ant-form-item-explain-error").should(
      "have.text",
      "Xác nhận mật khẩu phải giống với mật khẩu đã nhập"
    );
    cy.get(".contentModal--M4O_").click();
    cy.get("#basic_confirmPassword").clear();
    cy.get("#basic_confirmPassword").type("clgslsm216");
    cy.get("#basic_uniqueUrl").type("tester01");
    cy.get(
      ".ant-form-item-control-input-content > .ant-btn > :nth-child(1)"
    ).click();
    cy.get(".ant-message-custom-content > :nth-child(2)").should(
      "have.text",
      "Username đã tồn tại trong hệ thống, vui lòng chọn Username khác"
    );
    cy.get("#basic_uniqueUrl").clear("tester01");
    cy.get("#basic_uniqueUrl").type("wqw6y.signup@inbox.testmail.app");
    cy.get("#basic_uniqueUrl_help > :nth-child(1)").should(
      "have.text",
      "Không được sử dụng khoảng trắng hoặc ký tự đặc biệt."
    );
    cy.get(".contentModal--M4O_").click();
    cy.get("#basic_uniqueUrl").click();
    cy.get("#basic_uniqueUrl").type("wqw6y");
    cy.get(".ant-form-item-control-input-content > .ant-btn").click();
    cy.get("#basic_uniqueUrl").click();
    cy.get(".ant-form-item-explain-error").should(
      "contain",
      "Username phải từ 6 - 18 kí tự"
    );
    cy.get("#basic_uniqueUrl").clear();
    cy.get("#basic_uniqueUrl").type(TAG);
    cy.get(".ant-form-item-control-input-content > .ant-btn").click();
    cy.get(".ant-form-item-control-input-content > .ant-btn").click();
    cy.get(".blockContent--21EG > .titleXlHeadingCenter--MoHZ").should(
      "contain",
      TAG
    );
    cy.get(".contentStep--FiAQ > .ant-btn > :nth-child(1)").click({
      timeout: 100000,
    });
    cy.get(".btnSubmit--j_YF").click();
    cy.get(".ant-form-item-explain-error").should(
      "have.text",
      "Vui lòng chọn giới tính!"
    );
    cy.get(".ant-btn-loading-icon").should("not.exist");
    cy.get('[name="Nam"]').click();
    cy.get(".btnSubmit--j_YF").click();
    //
    cy.get(".contentStep--FiAQ > :nth-child(3) > .ant-btn", {
      timeout: 100000,
    }).click();
    cy.get(".errorMessage--zUTV").should(
      "have.text",
      "Vui lòng chọn ít nhất 5 tags để tiếp tục"
    );
    cy.get(":nth-child(2) > .tagItemContainer--gpLo > .text-xs").click();
    cy.get(":nth-child(3) > .tagItemContainer--gpLo > .text-xs").click();
    cy.get(":nth-child(4) > .tagItemContainer--gpLo > .text-xs").click();
    cy.get(":nth-child(5) > .tagItemContainer--gpLo > .text-xs").click();
    cy.get(":nth-child(6) > .tagItemContainer--gpLo > .text-xs").click();
    cy.get(".contentStep--FiAQ > :nth-child(3) > .ant-btn", {
      timeout: 100000,
    }).click();
    cy.get(":nth-child(1) > .ant-btn > :nth-child(1) > .icon-in")
      .should("be.visible")
      .click();
    cy.get(".icon-out").click();
    cy.get(".btnSubmitMargin--y7kf").click();
    cy.get(".uploadImageFile--h4b8").click();
    cy.get("input[type=file]").selectFile("cypress/upload/example.json", {
      force: true,
    });
    cy.get(".ant-notification-notice-message").should(
      "contain",
      "Lỗi định dạng"
    );
    cy.get(".ant-notification-notice-description").should(
      "contain",
      "Định dạng file không được hỗ trợ. Vui lòng chọn file ảnh (png, jpeg, jpg)."
    );
    // cy.get('#uploadFile').click();
    cy.get(".uploadImageFile--h4b8").click();
    cy.get("input[type=file]").selectFile("cypress/upload/example.jpg", {
      force: true,
    });
    // Move the focus to slider, by clicking on the slider's circle element
    cy.get(".ant-slider-handle").click({ multiple: true, force: true });
    // Press right arrow two times
    cy.get(".ant-slider-handle").type(
      "{rightarrow}{rightarrow}{rightarrow}{rightarrow}"
    );
    cy.get(".reactEasyCrop_Container").trigger(
      "mousedown",
      { which: 1 },
      { force: true }
    );
    cy.get(".reactEasyCrop_Container").trigger(
      "mousemove",
      { clientX: 1125, clientY: 675 },
      { force: true }
    );
    cy.get(".reactEasyCrop_Container").trigger("mouseup", { force: true });

    cy.get(".contentStepUploadAvatar--LGcG > .ant-btn-primary").click();
  });

  it(
    "Gets a verify registration email link",
    {
      defaultCommandTimeout: 100000,
    },
    () => {
      cy.request(
        "GET",
        `https://api.testmail.app/api/json?apikey=${apiKey}&namespace=${NameSpace}&livequery=true&pretty=true&tag=${TempEmail}`
      ).then((res) => {
        const email = res.body.emails[0]; // Filter the lastest Email
        cy.log(email.text);
        expect(email.subject).to.include("Xác thực email đăng ký ✔");
        const text = email.text;
        // Check text has the change password string
        expect(text).to.include(TAG);
        resetPasswordLink = extractLink(text).slice(0, -1);
        cy.log("Extracted Link:", resetPasswordLink);
      });
    }
  );

  // Validate the reset password link
  it("Validate the verify registration email link", () => {
    cy.visit(resetPasswordLink);
    cy.get(".titleXlHeadingCenter--MoHZ").should(
      "contain",
      "Xác thực email thành công"
    );
    cy.get(".contentStep--FiAQ > .ant-btn").click();
  });
});
