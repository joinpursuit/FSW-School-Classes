document.addEventListener("DOMContentLoaded", () => {
    let addButton = document.querySelector("#addButton")
    addButton.addEventListener("click", addClass)
    let enrollButton = document.querySelector("#enrollButton")
    enrollButton.addEventListener("click", enrollStudent)
    let listButton = document.querySelector("#listButton")
    listButton.addEventListener("click", getStudentsByClass)
})

const addClass = async (event) => {
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
        classes: classesInput,
        teacher: teacherInput
    }
    console.log(classInfo)
    axios.post(host, classInfo).then(response => {
        console.log(response)
        p.innerText = response.data.message
        classAdd.appendChild(p)
    })

}
const enrollStudent = async (event) => {
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
    grade.value = ""
    let p = document.createElement("p")
    let studentEnroll = document.querySelector("#studentEnroll")
    let host = "http://localhost:4000/classes/enroll"

    let studentInfo = {
        student: nameInput,
        classes: classInput,
        age: ageInput,
        city: cityInput,
        grade: gradeInput
    }

    console.log(studentInfo)
    axios.post(host, studentInfo).then(response => {
        console.log(studentInfo)
        p.innerText = response.data.message
        studentEnroll.appendChild(p)
    })

}

const getStudentsByClass = async (event) => {
    event.preventDefault()
    let className = document.querySelector("#classList").value
    className.value = ""
    let host = `http://localhost:4000/classes/lists`
    axios.get(host, className).then(response => {
        console.log(response)
        let ul = document.querySelector("ul")
        let li = document.createElement("li")
        li.innerText = response.data.message
        ul.appendChild(li)
    })

}
