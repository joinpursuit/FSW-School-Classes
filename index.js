
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
    let nameOfTeacherInput = nameOfTeacher.value
    let p = document.createElement("p")
    let classAdd = document.querySelector("#classAdd")
    let host = "http://localhost:4000/classes"
    let classInfo = {
        nameOfClass:nameOfClassInput,
        nameOfTeacher:nameOfTeacherInput
 }
 console.log(classInfo)
 axios.post(host,classInfo).then(response=>{
    p.innerText = response.data.message
    classAdd.appendChild(p)
 })

    
    
}
const enrollStudent = async(event)=>{
    event.preventDefault()
    let nameOfClass = document.querySelector("#class")
    let name = document.querySelector("#name")
    let age = document.querySelector("#age")
    let city = document.querySelector("#city")
    let grade = document.querySelector("#grade")
    let classInput = nameOfClass.value
    let nameInput = name.value
    let ageInput = age.value
    let cityInput = city.value
    let gradeInput = grade.value
    let p = document.createElement("p")
    let studentEnroll = document.querySelector("#studentEnroll")
    let host = "http://localhost:4000/classes"
    let studentInfo = {
        name: nameInput,
        class: classInput,
        age: ageInput,
        city: cityInput,
        grade:gradeInput
    }
    console.log(studentInfo)
    axios.post(host,studentInfo).then(response=>{
        p.innerText = response.data.message
        studentEnroll.appendChild(p)
     })
    
}
const updateStudent = async(event)=>{
    
}
const listStudents = async(event)=>{
    event.preventDefault()
    let nameOfClass = document.querySelector("#classList")
    let fail = document.querySelector("#fail")
    let list = document.querySelector("#list")
    let nameOfClassInput = nameOfClass.value
    let p = document.createElement("p")
    let host = `http://localhost:4000/classes/`
    axios.get(host,nameOfClassInput).then(response=>{
        p.innerText = response.data
        list.appendChild(p)

    })

}
