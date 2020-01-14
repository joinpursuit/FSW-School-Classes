const qs = require('qs');

document.addEventListener("DOMContentLoaded", () => {
    console.log("index.js is working");
    let className = document.querySelector("#class");
    let teacher = document.querySelector("#teacher");
    let addClassBtn = document.querySelector("#addClassBtn");

    let formClass = document.querySelector("#formClass");
    formClass.style.display = "none";
    let select = document.querySelector("#selectOptions")

    select.addEventListener("change", (e) => {
        if(e.target.value === "addClass"){
            formClass.style.display = "block"
        } else {
            formClass.style.display = "none"
        }
    })

    formClass.addEventListener("submit", async (e) => {
        e.preventDefault();
        debugger
        await axios.post(`http://localhost:3000/school/add`, { name: className.value, teacher: teacher.value })

    })
})