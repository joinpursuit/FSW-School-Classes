// const qs = require('querystring');

document.addEventListener("DOMContentLoaded", () => {
    console.log("index.js is working");

    let className = document.querySelector(".className");
    let teacher = document.querySelector("#teacher");
    let select = document.querySelector("#selectOptions")

    let formClass = document.querySelector("#formClass");
    formClass.style.display = "none";
    let formClassRes = document.querySelector("#formClassRes")

    let formEnroll = document.querySelector("#formEnroll");
    formEnroll.style.display = "none";
    let formEnrollRes = document.querySelector("#formEnrollRes")

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

    formClass.addEventListener("submit", (e) => {
        e.preventDefault();
        formClassRes.innerHTML = "";
        if(className.value === "" || teacher.value === ""){
            formClassRes.innerText = "Please enter a valid class and teacher!";
        } else {
            axios.post(`http://localhost:3000/class`, {name: className.value, teacher: teacher.value}).then(res => {
                debugger
                formClassRes.innerHTML = JSON.stringify(res.data, null, 4);
            })
        }
    })

    formEnroll.addEventListener("submit", async (e) => {
    })


})