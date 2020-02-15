let addClassForm = document.querySelector("#addClassForm")
let className = document.querySelector("#className")
let classTeacherName = document.querySelector("#classTeacherName")
let submitClass = document.querySelector("#submitClass")
let addClassError = document.querySelector("#addClassError")

let enrollStudentForm = document.querySelector("#enrollStudentForm")
let studentName = document.querySelector("#studentName")
let studentClass = document.querySelector("#studentClass")
let studentAge = document.querySelector("#studentAge")
let studentCity = document.querySelector("#studentCity")
let studentGrade = document.querySelector("#studentGrade")
let submitStudent = document.querySelector("#submitStudent")
let enrollStudentError = document.querySelector("#enrollStudentError")

let filterForm = document.querySelector("#filterForm")
let filterClass = document.querySelector("#filterClass")
let filterFailStudents = document.querySelector("#filterFailStudents")
let submitFilter = document.querySelector("#submitFilter")
let filterError = document.querySelector("#filterError")

addClassForm.addEventListener("submit", async event => {
    event.preventDefault()
    try {
        let res = await axios.post("http://localhost:3000/class", {
        name: className.value, 
        teacher: classTeacherName.value,
        });
    } catch (error) {  
        addClassError.innerText = error
    }
    addClassForm.reset()
})

enrollStudentForm.addEventListener("submit", async event => {
    event.preventDefault()
    try {
        let res = await axios.post("http://localhost:3000/enroll", {
        name: className.value, 
        class: studentClass.value,
        age: studentAge.value,
        city: studentCity.value,
        grade: studentGrade.value
        });
    } catch (error) {  
        enrollStudentError.innerText = error
    }
    enrollStudentForm.reset()
})

filterForm.addEventListener("submit", async event => {
    event.preventDefault()
    try {
        let res = await axios.get("http://localhost:3000/class", {
        
        });
    } catch (error) {  
        enrollStudentError.innerText = error
    }
    enrollStudentForm.reset()
})