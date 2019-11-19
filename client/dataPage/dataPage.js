let url;
let clsName;
document.addEventListener('DOMContentLoaded', () => {
    emptyInput()

    let searchForm = document.querySelector('#listStudents')
    searchForm.addEventListener('submit', (event) => {
        event.preventDefault()
        classFilterChoiceToDOM()
    })
    checker()
})


// retrieving the container to display class creation results
const getContainer = () => document.querySelector('#results')

//displaying the new student information to the screen 
const addingStudentToDom = async () => {
    const studentData = await loadStudentEnrollment()
    clearResults()
    studentData.error ? displayError(studentData) : displayEnrollment(studentData);
}

//creating cards for student information to be added to the screen
const displayEnrollment = async (data, el) => {
    const container = getContainer();

    let student = document.createElement('div');
    student.className = 'student';

    clsName = document.createElement('p');
    name = document.createElement('p');
    age = document.createElement('p');
    city = document.createElement('p');
    grade = document.createElement('p');
    timeStamp = document.createElement('p')
    timeStamp.innerText = `Timestamp: ${data.timestamp}`;

    // if (!data.student) {
    //     city.innerText = data.city;
    //     age.innerText = data.age;
    //     grade.innerText = data.grade
    // } else {
    //     if (el) {
    //         student.innerText = el.name
    //         city.innerText = `This student is from: ${el.city}`
    //         age.innerText = `Age : ${el.age}`
    //         grade.innerText = `Current grade is: ${el.grade}`
    //         student.append(age, city, grade, timeStamp)
    //         container.append(student)
    //     } else {
    student.innerText = data.studentname
    city.innerText = `This student is from: ${data.city}`
    age.innerText = `Age : ${data.age}`
    grade.innerText = `Current grade is: ${data.grade}`
    clsName.innerText = `Enrolled in ${data.classname}`
    student.append(age, city, grade, clsName, timeStamp);
    container.append(student)
    // }
    // }
    console.log("student", student)
    emptyInput()
}

//this function sets the eventListener to the check-box 
const checker = () => {
    let check = document.querySelector('#showFailing')
    check.addEventListener('change', () => {})
    return check.checked
}

//grabbing the student information by filter
const loadStudentByClass = async () => {
    let className = document.querySelector('#searchClass').value
    let checkBox = checker()
    url = `http://localhost:3100/class/${className}/students?failing=${checkBox}`

    const {
        data
    } = await axios.get(url)
    console.log(data);
    return data
}

const classFilterChoiceToDOM = async () => {
    const classFilterData = await loadStudentByClass()
    clearResults()
    console.log("This is class filter", classFilterData);
    classFilterData.error ? displayError(classFilterData) : classFilterData.payload.forEach(el => displayEnrollment(classFilterData, el));
}

//this function handles displaying the error message
const displayError = (data) => {
    emptyInput()
    const container = getContainer();
    clearResults()
    let errorDiv = document.createElement('div')
    errorDiv.className = 'error'
    let err = document.createElement('p')
    err.innerText = `Error: ${data.error}`
    let timeStamp = document.createElement('p')
    timeStamp.innerText = `Timestamp: ${data.timeStamp}`;

    errorDiv.append(err, timeStamp)
    container.append(errorDiv)
}

//this function empties the the user input
const emptyInput = () => {
    document.querySelector('#searchClass').value = '';
    document.querySelector('#showFailing').checked = false;
}

const clearResults = () => {
    let container = getContainer()
    while (container.firstChild) {
        container.removeChild(container.firstChild)
    }
}