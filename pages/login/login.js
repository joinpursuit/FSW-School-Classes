document.addEventListener("DOMContentLoaded", () => {
    let loginButton = document.querySelector("#loginButton");
    let signUpButton = document.querySelector("#signUpButton");
    let logSign = document.querySelector("#logSign");
    let login = document.querySelector("#login");
    let loginForm = document.querySelector("#loginForm");
    let signUp = document.querySelector("#signUp");
    let signUpForm = document.querySelector("#signUpForm");

    loginButton.addEventListener("click", () => {
        logSign.style.display = "none";
        login.style.display = "inline";
    })

    signUpButton.addEventListener("click", () => {
        logSign.style.display = "none";
        signUp.style.display = "inline";
    })

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        loginAttempt();
    })

    signUpForm.addEventListener("submit", (e) => {
        e.preventDefault();
        signUpAttempt();
    })
})

const goBack = () => {
    let logSign = document.querySelector("#logSign");
    let login = document.querySelector("#login");
    let signUp = document.querySelector("#signUp");
    logSign.style.display = "inline";
    login.style.display = "none";
    signUp.style.display = "none";
} // End of goBack() function

const loginAttempt = async () => {
    const username = document.querySelector("#loginUser");
    const password = document.querySelector("#loginPass");
    const loginResponse = document.querySelector("#loginResponse");
    loginResponse.innerHTML = "";

    if(!username.value && !password.value) {
        let error = document.createElement("p");
        error.innerText = "No username or password were inputted";
        loginResponse.appendChild(error);
    } else if(!username.value) {
        let error = document.createElement("p");
        error.innerText = "No username was inputted";
        loginResponse.appendChild(error);
    } else if(!password.value) {
        let error = document.createElement("p");
        error.innerText = "No password was inputted";
        loginResponse.appendChild(error);
    } else {
        let res = await axios.get(`http://localhost:3000/login?username=${username.value}&password=${password.value}`);
        debugger;
    }
} // End of loginAttempt() function

const signUpAttempt = async () => {
    let username = document.querySelector("#signUpUser");
    let password = document.querySelector("#signUpPass");
    let signUpResponse = document.querySelector("#signUpResponse");
    signUpResponse.innerHTML = "";

    if(!username.value && !password.value) {
        let error = document.createElement("p");
        error.innerText = "No username or password were inputted";
        signUpResponse.appendChild(error);
    } else if(!username.value) {
        let error = document.createElement("p");
        error.innerText = "No username was inputted";
        signUpResponse.appendChild(error);
    } else if(!password.value) {
        let error = document.createElement("p");
        error.innerText = "No password was inputted";
        signUpResponse.appendChild(error);
    } else {
        let res = await axios.post(`http://localhost:3000/login?username=${username.value}&password=${password.value}`);
        debugger;
    }
}