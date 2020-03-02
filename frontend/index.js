document.addEventListener("DOMContentLoaded", () => {
    // console.log("hello world")
    let select = document.querySelector("#populateClasses");

    const populateClasses = async () => {
            let res = await axios.get("http://localhost:3000/class/");
            let displayClasses = Object.keys(res.data.class);
            displayClasses.forEach((el) => {
                let option = document.createElement("option");
                option.innerText = el; 
                select.appendChild(option)
            })
        }

    // in = index
    // of = value
    
    const getAllStudentsInClass = async (className) => {
        try {

            let studentsByClassDiv = document.querySelector("#studentsByClassDiv")
            let res = await axios.get(`http://localhost:3000/class/${className}`);
            debugger
            let grabClass = res.data.allStudents;
                grabClass.forEach((showStudent) => {
                let {name, city, age, grade, house} = showStudent
                const listStudent = `Name: ${name} City: ${city} Age: ${age} Grade: ${grade} House: ${house}`
                let p1 = document.createElement("p");
                p1.innerText = listStudent;
                studentsByClassDiv.appendChild(p1)
    })
} catch(error) {
    console.log(error)
    }
}

populateClasses()
select.addEventListener("change", (event) => {
    document.querySelector("#studentsByClassDiv").innerHTML = getAllStudentsInClass(event.target.value)
  
})


let mainDiv = document.querySelector("#mainDiv")
// let populateClasses = document.querySelector("#populateClasses")
// let populateStudents = document.querySelector("#populateStudents")
let addClassDivHead = document.querySelector("#addClassDivHead")
let addClassDivMain = document.querySelector("#addClassDivMain")
let className = document.querySelector("#className")
let teacherName = document.querySelector("#teacherName")
let addClassBtn = document.querySelector("#addClassBtn")
let newClassDisplay = document.querySelector("#newClassDisplay")
let newClassDisplayUL = document.querySelector("#newClassDisplayUL")
let enrollStudentDiv = document.querySelector("#enrollStudentDiv")
let addClassForm = document.querySelector("#addClassForm")
let enrollStudentForm = document.querySelector("#enrollStudentForm")
let sClassName = document.querySelector("#sClassName")
let studentName = document.querySelector("#studentName")
let studentAge = document.querySelector("#studentAge")
let studentCity = document.querySelector("#studentCity")
let studentGrade = document.querySelector("#studentGrade")
let studenetEnrollBtn = document.querySelector("#studenetEnrollBtn")
let newStudentDisplay = document.querySelector("#newStudentDisplay")
let newStudentDisplayUL = document.querySelector("#newStudentDisplayUL")
let failingForm = document.querySelector("#failingForm")
let enterClass = document.querySelector("#enterClass")
let addCity = document.querySelector("#addCity")
let displayFailing = document.querySelector("#displayFailing")
let fsBtn = document.querySelector("#fsBtn")
let failingStudentList = document.querySelector("#failingStudentList")
let failingStudentListUL = document.querySelector("#failingStudentListUL")




addClassForm.addEventListener("submit", async (event) => {
    event.preventDefault()
    let className = document.querySelector("#className").value
    let teacherName = document.querySelector("#teacherName").value
try {
    newClassDisplayUL.innerHTML = "";
    let res = await axios.post(`http://localhost:3000/class/add`, {name: className, teacher: teacherName})
    let h3 = document.createElement("h3");
    h3.innerText = res.data.message
    newClassDisplay.appendChild(h3)
} catch (error) {
    console.log(error)

} 
  })

  enrollStudentForm.addEventListener("submit", async (event) => {
    event.preventDefault()
    let sClassName = document.querySelector("#sClassName").value
    let name = document.querySelector("#studentName").value
    let age = document.querySelector("#studentAge").value
    let city = document.querySelector("#studentCity").value
    let grade = document.querySelector("#studentGrade").value
    let house = document.querySelector("#studentHouse").value
try {
    newStudentDisplayUL.innerHTML = "";
    let res = await axios.post(`http://localhost:3000/class/${sClassName}/enroll`,{class: sClassName, name: name, age: age, grade: grade, city: city, house: house})
    let h3 = document.createElement("h3")
    h3.innerText = res.data.message
    newStudentDisplay.appendChild(h3)
} catch (error){
    console.log(error)
}
  })

})

    
    