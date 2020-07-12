document.addEventListener("DOMContentLoaded", () => {
  let logOut = document.querySelector(".log-out");

  logOut.addEventListener("click", () => {
    window.location.replace("../../index.html");
  });
});
