// const qs = require('querystring');

document.addEventListener("DOMContentLoaded", () => {
    console.log("index.js is working");

    let className = document.querySelector(".className");
    let teacher = document.querySelector("#teacher");
    let select = document.querySelector("#selectOptions")

    let formClass = document.querySelector("#formClass");
    formClass.style.display = "none";

    let formEnroll = document.querySelector("#formEnroll");
    formEnroll.style.display = "none";

    select.addEventListener("change", (e) => {
        if(e.target.value === "addClass"){
            formClass.style.display = "block";
            formEnroll.style.display = "none";
        } else if(e.target.value === "enroll"){
            formEnroll.style.display = "block";
            formClass.style.display = "none"
        } else if(e.target.value === "list"){
            formEnroll.style.display === "block"
        }
        else {
            formClass.style.display = "none";
            formEnroll.style.display = "none";
            formEnroll.style.display === "none";
        }
    })

    formClass.addEventListener("submit", async (e) => {
        e.preventDefault();
        if(className.value === "" || teacher.value === ""){
            alert("Please enter a valid class and teacher");
        } else {
            await axios.post(`http://localhost:3000/class`, {name: className.value, teacher: teacher.value})
        }
    })

    formEnroll.addEventListener("submit", async (e) => {
    })


})