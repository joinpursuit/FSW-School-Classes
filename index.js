document.addEventListener("DOMContentLoaded",()=>{
    let addButton = document.querySelector("#addButton")
    addButton.addEventListener("click",addClass)
    let enrollButton = document.querySelector("#enrollButton")
    enrollButton.addEventListener("click",enrollStudent)
    let updateButton = document.querySelector("#updateButton")
    updateButton.addEventListener("click",updateStudent)
    let listButton = document.querySelector("#listButton")
    listButton.addEventListener("click", listStudents)
})
const addClass = async(event)=>{
    event.preventDefault()
    let nameOfClass = document.querySelector("#className")
    let nameOfTeacher = document.querySelector("#teacherName")
    let nameOfClassInput = nameOfClass.value
    let teacherNameInput = nameOfTeacher.value
    let classInfo = {
        teacher:teacherNameInput,
        class:nameOfClassInput

    }
    try{
        let response = axios.post(`http://localhost:4000/routes/classes ${classInfo}`)
        debugger
        let p = document.createElement("p")
       
        p.innerText = response
        let classAdd = document.querySelector("#classAdd")
        classAdd.appendChild(p)

    }catch(err){
        console.log(err)
    }


}
const enrollStudent = async(event)=>{
    let nameOfClass = document.querySelector("#class")
    let name = document.querySelector("#name")
    let age = document.querySelector("#age")
    let city = document.querySelector("#city")
    let grade = document.querySelector("#grade")
    event.preventDefault()
    let classInput = nameOfClass.value
    let nameInput = name.value
    let ageInput = age.value
    let cityInput = city.value
    let gradeInput = grade.value
    // classInput.value = ""
    // nameInput.value = ""
    // ageInput.value = ""
    // cityInput.value = ""
    // gradeInput.value = ""
    let studentInfo = {
        name: nameInput,
        class: classInput,
        age: ageInput,
        city: cityInput,
        grade:gradeInput
    }
    try{
     let response= axios.post(`http://localhost:4000/${studentInfo.value}/enroll`)
     debugger
        console.log(response)
   
        let p = document.createElement("p")
        p.innerText = studentInfo
        let studentEnroll = document.querySelector("#studentEnroll")
        studentEnroll.appendChild(p)
    }catch(err){
console.log(err)
    }




}
const updateStudent = (event)=>{
event.preventDefault()

}
const listStudents = (event)=>{
event.preventDefault()
let nameOfClass = document.querySelector("#classList")
let name = document.querySelector("#nameList")
let city = document.querySelector("#cityList")
let fail = document.querySelector("#fail")
name.value =""
city.value = ""
fail.checked = false
}

