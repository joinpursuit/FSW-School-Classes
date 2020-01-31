// import Axios from "axios";

// const bodyParser = require("body-parser");
let url = "http://localhost:3000/class";

document.addEventListener("DOMContentLoaded", () => {
    let button = document.querySelector("#showAllClasses");
    let description = document.querySelector("#description")

    button.addEventListener("click", async () => {
        // debugger
        let schoolH1 = document.createElement('h1');
        
        try {
            let res = await axios.get(url);
            console.log("THIS IS RES: " + res)
            debugger
            schoolH1.innerHTML = JSON.stringify(res.data.allClasses)
            description.appendChild(schoolH1);

        } catch(error) {
            console.log(error)
        }

        


    })
})