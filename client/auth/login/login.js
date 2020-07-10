document.addEventListener("DOMContentLoaded", () => {
  let studentLogin = document.querySelector("#studentLogin");
  // let studentLoginForm = document.querySelector("#studentLoginForm");

  // studentLoginForm.addEventListener("submit", (e) => {
  //   console.log("hello");
  // });
  studentLogin.addEventListener("click", (e) => {
    e.preventDefault();
    loadLoginForm();
  });
});

const loadLoginForm = async () => {
  let username = document.querySelector("#username").value;
  let password = document.querySelector("#password").value;

  console.log("user:", username);
  console.log("pass:", password);

  if (username !== "" && password !== "") {
    window.location.href = "../../landing/index.html";
  }

  clearResults();
};

const clearResults = () => (document.querySelector("#username").value = "");
