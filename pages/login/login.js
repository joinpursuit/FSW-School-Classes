document.addEventListener("DOMContentLoaded", () => {
    let loginButton = document.querySelector("#loginButton");
    let signUpButton = document.querySelector("#signUpButton");
    let logSign = document.querySelector("#logSign");
    let login = document.querySelector("#login");
    let loginForm = document.querySelector("#loginForm");
    let signUp = document.querySelector("#signUp");
    let signUpForm = document.querySelector("#signUpForm");
    let h1 = document.querySelector("h1");

    loginButton.addEventListener("click", () => {
        h1.innerText = "Login";
        logSign.style.display = "none";
        login.style.display = "inline";
    })

    signUpButton.addEventListener("click", () => {
        h1.innerText = "Sign Up";
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
}) // End of DOMContentLoaded listener

const goBack = () => {
    let h1 = document.querySelector("h1");
    let logSign = document.querySelector("#logSign");
    let login = document.querySelector("#login");
    let signUp = document.querySelector("#signUp");
    h1.innerText = "School Records";
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
        login(res.data);
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
        signUp(res.data);
    }
} // End of signUpAttempt() function

const login = async (data) => {
    // on success take to home page
    // on fail show incorrect user/pass error

    if(data.error) {
        let loginResponse = document.querySelector("#loginResponse");
        loginResponse.innerHTML = "";
        let error = document.createElement("p");
        error.innerText = "Incorrect username/password";
        loginResponse.appendChild(error);
    } else {
        window.location.pathname = "./Users/isaiah/Desktop/Pursuit/Unit3/Pursuit-Core-Web-Express-Project/index.html";
    }

} // End of login() function

const signUp = async (data) => {
    document.querySelector("#signUp").style.display = "none";
    document.querySelector("#login").style.display = "inline";

    let username = document.querySelector("#signUpUser");
    let password = document.querySelector("#signUpPass");

    document.querySelector("#loginUser").value = username.value;
    document.querySelector("#signUpUser").value = password.value;

    username.value = "";
    password.value = "";

    let loginResponse = document.querySelector("#loginResponse");
    let success = document.createElement("p");
    success.innerText = "Sign Up Successful";
    loginResponse.appendChild(success);
    // on successful sign up take to login page with prefilled data from what was entered.
    // reset the inputs, show signup success on the login response 

    // on fail say if id and name check didnt match (maybe have id and name check with no user/pass inputs)
    // then after match success show the inputs 

} // End of signUp() function