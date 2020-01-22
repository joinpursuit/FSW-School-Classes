import Axios from "axios";

document.addEventListener("DOMContentLoaded", () => {

    let className = document.querySelector("#className");
    let teacherName = document.querySelector("#teacherName");
    let addClass = document.querySelector("#addClass");
    let studentClass = document.querySelector("#studentClass");
    let studentName = document.querySelector("#studentName");
    let studentAge = document.querySelector("#studentAge");
    let studenCity = document.querySelector("#studentCity");
    let studentGrade = document.querySelector("#studentGrade");
    let studentSubmit = document.querySelector("#studentSubmit");
    let classList = document.querySelector("#classList");
    let cityList = document.querySelector("#cityList");
    let checkFailing = document.querySelector("#checkFailing");
    let listSubmit = document.querySelector("#listSubmit")

    addClass.addEventListener("submit", (e) => {
        e.preventDefault();
        axios.post(`http://localhost:3000/route/${className}/${teacherName}`).then(res => {
            let p = document.createElement("p");
            p.innerText = res.data
        }) catch (err){
            
        }
    })

    studentSubmit.addEventListener("Submit", (e) => {
        e.preventDefault();

    })

})