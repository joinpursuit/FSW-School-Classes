document.addEventListener("DOMContentLoaded", () => {
  let loginNav = document.querySelector("#studentLogin");
  let signUpNav = document.querySelector("#studentSignUp");

  loginNav.addEventListener("click", () => {
    window.location.href = "./client/auth/login/login.html";
  });

  signUpNav.addEventListener("click", () => {
    window.location.href = "./client/auth/signup/signup.html";
  });
});
