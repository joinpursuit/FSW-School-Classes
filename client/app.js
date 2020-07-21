document.addEventListener('DOMContentLoaded', () => {
    addEventListeners()
})


const addEventListeners = () => {
    let classForm = document.querySelector("#classForm")
    let studentForm = document.querySelector("#studentForm")
    let listofStudentsForm = document.querySelector('#listofStudentsForm')

    classForm.addEventListener('submit', addClass)
    studentForm.addEventListener('submit', addStudent)
    listofStudentsForm.addEventListener('submit', getStudents)
}

const addClass = async () => {
    event.preventDefault()
    let name = document.querySelector('#className').value
    let teacher = document.querySelector('#teacherName').value
    let response = document.querySelector('#newClass')

    let { data } = await axios.post(`http://localhost:3000/class`, { name, teacher })
    response.innerText = data.message
    console.log(data)
}

const addStudent = async () => {
    event.preventDefault()
    let className = document.querySelector('#className2').value
    let name = document.querySelector('#studentName').value
    let age = document.querySelector('#studentAge').value
    let city = document.querySelector('#studentCity').value
    let grade = document.querySelector('#studentGrade').value
    let response = document.querySelector('#newStudent')

    let { data } = await axios.post(`http://localhost:3000/class/${className}/enroll`, { name, age, city, grade })
    response.innerText = data.message
    console.log(data)
}

const getStudents = async () => {
    event.preventDefault()
    let className = document.querySelector('#className3').value
    let city = document.querySelector('#city').value
    let failing = document.querySelector('#failing')
    let response = document.querySelector('#message')

    if (failing.checked === true && city) {
        let { data } = await axios.get(`http://localhost:3000/class/${className}/students?failing=true&city=${city}`)
        response.innerText = data.message
        displayStudents(data.students)
    } else if (failing.checked === true) {
        let { data } = await axios.get(`http://localhost:3000/class/${className}/students?failing=true`)
        response.innerText = data.message
        displayStudents(data.students)
    } else if (city) {
        let { data } = await axios.get(`http://localhost:3000/class/${className}/students?city=${city}`)
        response.innerText = data.message
        displayStudents(data.students)
    } else {
        let { data } = await axios.get(`http://localhost:3000/class/${className}/students`)
        response.innerText = data.message
        displayStudents(data.students)
    }
}

const displayStudents = (arr) => {
    let namesList = document.querySelector("#studentsList")
    arr.forEach(el => {
        let newLi = document.createElement("li")
        newLi.innerText = `${el.name}, ${el.age}, ${el.city}, Grade: ${el.grade}`
        namesList.append(newLi)
    })
}