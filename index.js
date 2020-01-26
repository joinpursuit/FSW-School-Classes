

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
    let classes = document.querySelector("#className")
    let teacher = document.querySelector("#teacherName")
    let classesInput = classes.value
    let teacherInput = teacher.value
    classes.value = ""
    teacher.value = ""
    let p = document.createElement("p")
    let classAdd = document.querySelector("#classAdd")
    let host = "http://localhost:4000/classes"
 
    let classInfo = {
        classes:classesInput,
        teacher:teacherInput
 }
 console.log(classInfo)
 axios.post(host,classInfo).then(response=>{
     console.log(response)
    p.innerText = response.data.message
    classAdd.appendChild(p)
 })

    
    
}
const enrollStudent = async(event)=>{
    event.preventDefault()
    let classes = document.querySelector("#class")
    let student = document.querySelector("#student")
    let age = document.querySelector("#age")
    let city = document.querySelector("#city")
    let grade = document.querySelector("#grade")
    let classInput = classes.value
    let nameInput = student.value
    let ageInput = age.value
    let cityInput = city.value
    let gradeInput = grade.value
    classes.value = ""
    student.value = ""
    age.value = ""
    grade.value =""
    let p = document.createElement("p")
    let studentEnroll = document.querySelector("#studentEnroll")
    let host = "http://localhost:4000/classes/enroll"
    
    let studentInfo = {
        student: nameInput,
        classes: classInput,
        age: ageInput,
        city: cityInput,
        grade:gradeInput
    }

    console.log(studentInfo)
    axios.post(host,studentInfo).then(response=>{
        console.log(studentInfo)
        p.innerText = response.data.message
        studentEnroll.appendChild(p)
     })
    
}

const listStudents = async(event)=>{
    event.preventDefault()
    let nameList = document.querySelector("#nameList")
    let classList =document.querySelector("#classList")
    let cityList = document.querySelector("#cityList")
    let nameListInput = nameList.value
    let classListInput = classList.value
    let cityListInput = cityList.value
    nameList.value = ""
    classList.value=""
    nameList.value = ""
    let listInfo = {
        name: nameListInput, 
        classes:classListInput,
        city: cityListInput
    }
    let host = `http://localhost:4000/classes/lists`
    axios.get(host,listInfo).then(response=>{
        debugger
        p.innerText = response.data
        list.appendChild(p)
        // let ul = document.createElement("ul")
        // let listStudents = document.querySelector("#listStudents")
        // let li = document.createElement("li")
        // li.innerText = nameListInput

    })

}
