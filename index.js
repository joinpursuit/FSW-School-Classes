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
    try{
        let response = await axios.post(host, classInfo)
        console.log(response)
p.innerText = response.data.message
classAdd.appendChild(p)
    }catch(error){
console.log(error)
    }

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
    city.value = ""
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
    try{
        let response = await axios.post(host, studentInfo)
        p.innerText = response.data.message
        studentEnroll.appendChild(p)
    }catch(error){
console.log(error)
    }



}

const getStudentsByClass = async (event) => {
    event.preventDefault()
    let className = document.querySelector("#classList")
    let classNameInput = className.value;
    className.value = ""
    let failing = document.querySelector("#fail")
    let host = `http://localhost:4000/classes/${classNameInput}/lists`
    let response = await axios.post(host, className)
    let ul = document.querySelector("ul")
    let li = document.createElement("li")
    
    try{
        if(failing.checked === false){
            let result = axios.get(response)
            let students = classNameInput
            for(let el of result.data){
                students += el
                
                li.innerText = students.message
                ul.appendChild(li)
            }

        }else{
            
        }

    }catch(error){
        console.log(error)
    }
}

