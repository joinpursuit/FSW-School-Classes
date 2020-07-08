document.addEventListener("DOMContentLoaded", () => {
  let newUser = document.querySelector("#newUser");

  let newUserForm = document.querySelector("#signUpForm");

  newUser.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "../../landing/index.html";
  });

  console.log("hello");
});

const clearResults = () => {
  let container = getContainer();
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
};
