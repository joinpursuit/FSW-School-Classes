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
let filterCIty = document.querySelector("#filterCity")
let filterFailStudents = document.querySelector("#filterFailStudents")
let submitFilter = document.querySelector("#submitFilter")
let filterError = document.querySelector("#filterError")
let studentFilterList = document.querySelector("#studentFilterList")


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


const renderData = (className, data) => {
    studentFilterList.innerHTML = ""
    h2 = document.createElement("h2")
    ul = document.createElement("ul")
    h2.innerText = className
    studentFilterList.appendChild(h2)
    data.forEach(student => {
        let li = document.createElement("li")
        li.innerText = `${student.name} \n ${student.city} \n ${student.grade}`
        ul.appendChild(li)
    })
}

filterForm.addEventListener("submit", async event => {
    event.preventDefault()
    try {
        let res = await axios.get(`http://localhost:3000/class?className=${filterClass.value}&city=${filterCity.value}&fail=${filterFailStudents.value}`);
        renderData(filterClass.value, res.data)
    } catch (error) {  
        filterError.innerText = error
    }
    filterForm.reset()
})