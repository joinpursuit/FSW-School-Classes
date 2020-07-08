document.addEventListener("DOMContentLoaded", () => {
  let studentLogin = document.querySelector("#studentLogin");
  // let studentLoginForm = document.querySelector("#studentLoginForm");

  // studentLoginForm.addEventListener("submit", (e) => {
  //   console.log("hello");
  // });
  loadLoginForm();
  studentLogin.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "../../landing/index.html";
  });
});

const loadLoginForm = async () => {
  let username = document.querySelector("#username").value;
  let password = document.querySelector("#password").value;

  console.log("user:", username);
  console.log("pass:", password);
};

const clearResults = () => {
  let container = getContainer();
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
};
