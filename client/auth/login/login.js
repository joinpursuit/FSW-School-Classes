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
  let url = `http://localhost:3000/api/auth`;
  let username = document.querySelector("#username").value;
  let password = document.querySelector("#password").value;

  let userDataConfig = {
    username,
    password,
  };

  let headerConfig = {
    header: {
      "Access-Control-Allow-Origin": "http://localhost:3000",
      "Content-Type": "application/x-www-form-urlencoded",
      "Access-Control-Request-Method:": "POST",
      "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
      connection: "keep-alive",
    },
  };

  try {
    const { data } = await axios.post(url, userDataConfig, headerConfig);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }

  // window.location.href = "../../landing/index.html";

  // console.log("user:", username);
  // console.log("pass:", password);

  if (username !== "" && password !== "") {
    window.location.href = "../../landing/index.html";
  }

  clearResults();
};

const clearResults = () => (document.querySelector("#username").value = "");
