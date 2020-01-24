let typeOfUser;
let user;

document.addEventListener("click", () => {
    document.querySelector("audio").play();
})

document.addEventListener("DOMContentLoaded", () => {
    let loginButton = document.querySelector("#loginButton");
    let signUpButton = document.querySelector("#signUpButton");
    let logSign = document.querySelector("#logSign");
    let login = document.querySelector("#login");
    let loginForm = document.querySelector("#loginForm");
    let signUp = document.querySelector("#signUp");
    let signUpForm = document.querySelector("#signUpForm");
    let h1 = document.querySelector("h1");
    let isValidUser = document.querySelector("#isValidUser");
    let validUserForm = document.querySelector("#validUserForm");

    loginButton.addEventListener("click", () => {
        h1.innerText = "Login";
        logSign.style.display = "none";
        login.style.display = "inline";
    })

    signUpButton.addEventListener("click", () => {
        h1.innerText = "Sign Up";
        logSign.style.display = "none";
        isValidUser.style.display = "inline";
    })

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        loginAttempt();
    })

    validUserForm.addEventListener("submit", (e) => {
        e.preventDefault();
        isValidUserAttempt();
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
    let isValidUser = document.querySelector("#isValidUser");
    h1.innerText = "School Records";
    logSign.style.display = "inline";
    login.style.display = "none";
    signUp.style.display = "none";
    isValidUser.style.display = "none";
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
        let res = await axios.post(`http://localhost:3000/login?username=${username.value}&password=${password.value}&userType=${typeOfUser}&userId=${user.id}`);
        signUp(res.data);
    }
} // End of signUpAttempt() function

const isValidUserAttempt = async () => {
    let firstName = document.querySelector("#validFirst");
    let lastName = document.querySelector("#validLast");
    let id = document.querySelector("#validId");
    let userType = document.querySelector("#userType");
    let validUserResponse = document.querySelector("#validUserResponse");
    let isValidUser = document.querySelector("#isValidUser");
    let signUp = document.querySelector("#signUp");
    validUserResponse.innerHTML = "";

    if(!firstName.value || !lastName.value || !id.value || userType.value === "disabled") {
        let error = document.createElement("p");
        error.innerText = "Please fill out all information";
        validUserResponse.appendChild(error);
    } else {
        let res = await axios.get(`http:/localhost:3000/login/${userType.value}/${id.value}/${firstName.value}/${lastName.value}`)
        let data = res.data;

        if(data.error) {
            let error = document.createElement("p");
            error.innerText = data.error;
            validUserResponse.appendChild(error);
        } else {
            user = data.person;
            typeOfUser = userType.value;
            isValidUser.style.display = "none";
            signUp.style.display = "inline";
        }
    }
} // End of isValidUserAttempt

const login = async (data) => {
    // on fail show incorrect user/pass error
    if(data.error) {
        let loginResponse = document.querySelector("#loginResponse");
        loginResponse.innerHTML = "";
        let error = document.createElement("p");
        error.innerText = "Incorrect username/password";
        loginResponse.appendChild(error);
    } else {
        // on success take to home page (changes depending on typeOfUser)
        window.location.pathname = "./Users/isaiah/Desktop/Pursuit/Unit3/Pursuit-Core-Web-Express-Project/index.html";
    }

} // End of login() function

const signUp = async (data) => {
    document.querySelector("#signUpResponse").innerHTML = "";
    if(data.error) {
        let error = document.createElement("p");
        error.innerText = data.error;
        document.querySelector("#signUpResponse").appendChild(error);
    } else {
        document.querySelector("#signUp").style.display = "none";
        document.querySelector("#login").style.display = "inline";
        document.querySelector("h1").innerText = "Login";

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
    }
    
    // on successful sign up take to login page with prefilled data from what was entered.
    // reset the inputs, show signup success on the login response 

    

} // End of signUp() function