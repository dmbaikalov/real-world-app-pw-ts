//page.click(page.locator(slc.usernameInput));
export const slc = {
    usernameInput: "#username",
    passwordInput: "#password",
    rememberMeBtn: "[name='remember'][type='checkbox']",
    signInBtn: "[type='submit']",
    signUpBtn: "[href='/signup']",
    errorMsg: "//div[contains(text(), 'Username or password is invalid')]",
    firstNameInput: "#firstName",
    lastNameInput: "#lastName",
    confirmPasswordInput: "#confirmPassword",
    submitBtn: "[data-test='signup-submit']"
};