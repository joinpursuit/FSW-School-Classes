document.addEventListener("DOMContentLoaded", () => {
  let studentLogin = document.querySelector("#studentLogin");

  studentLogin.addEventListener("click", (e) => {
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
