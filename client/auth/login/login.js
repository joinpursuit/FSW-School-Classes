document.addEventListener("DOMContentLoaded", () => {
  let studentLogin = document.querySelector("#studentLogin");

  studentLogin.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "../../landing/index.html";
  });

  // newUser.addEventListener("click", (event) => {
  //   let studentLoginForm = (document.querySelector(
  //     "#studentLoginForm"
  //   ).style.display = "none");
  //   event.preventDefault();
  //   newUserForm.style.display = "initial";
  // });

  console.log("hello");
});

const clearResults = () => {
  let container = getContainer();
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
};
