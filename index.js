// const qs = require('querystring');

document.addEventListener("DOMContentLoaded", () => {
    console.log("index.js is working");

    let className1 = document.querySelector("#className1");
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
        formEnrollRes.innerHTML = "";
        axios.post(`http://localhost:3000/class`, {name: className1.value, teacher: teacher.value}).then(res => {
            formClassRes.innerHTML = JSON.stringify(res.data, null, 4);
        })
    })

    let className2 = document.querySelector("#className2");
    let name = document.querySelector("#name");
    let age = document.querySelector("#age");
    let city = document.querySelector("#city");
    let grade = document.querySelector("#grade");
    formEnroll.addEventListener("submit", (e) => {
        e.preventDefault();
        formClassRes.innerHTML = ""
        formEnrollRes.innerHTML = "";
        axios.post(`http://localhost:3000/class/${className2.value}/enroll`, {name: name.value, age: age.value, city: city.value, grade: grade.value}).then(res => {
            formEnrollRes.innerHTML = JSON.stringify(res.data, null, 4);
        })
    })


})