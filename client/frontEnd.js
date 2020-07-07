document.addEventListener("DOMContentLoaded", () => {
  let studentLogin = document.querySelector("#studentLogin");
  let newUser = document.querySelector("#newUser");

  let newUserForm = document.querySelector("#signUpForm");
  newUserForm.style.display = "none";

  studentLogin.addEventListener("click", (event) => {
    event.preventDefault();
  });

  newUser.addEventListener("click", (event) => {
    let studentLoginForm = (document.querySelector(
      "#studentLoginForm"
    ).style.display = "none");
    event.preventDefault();
    newUserForm.style.display = "initial";
  });

  console.log("hello");
});

const clearResults = () => {
  let container = getContainer();
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
};
