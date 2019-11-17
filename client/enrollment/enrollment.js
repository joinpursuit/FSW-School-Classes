let url;
let clsName, name, age, city, grade, timeStamp;
document.addEventListener('DOMContentLoaded', () => {
    emptyInput()

    let enrollmentForm = document.querySelector('#enrollForm')
    enrollmentForm.addEventListener('submit', (event) => {
        event.preventDefault()
        addingStudentToDom()
    })
})

// retrieving the container to display class creation results
const getContainer = () => document.querySelector('#results')

// function to post the information about the students from user input
const loadStudentEnrollment = async () => {
    let className = document.querySelector('#enrollClass').value
    let studentName = document.querySelector('#studentName').value
    let age = document.querySelector('#age').value
    let city = document.querySelector('#city').value
    let grade = document.querySelector('#grade').value

    url = `http://localhost:3100/class/${className}/enroll`

    try {
        let studentObj = {
            className,
            studentName,
            age,
            city,
            grade
        }
        const {
            data
        } = await axios.post(url, studentObj)

        console.log(data);
        return data
    } catch (error) {
        console.log(error);

    }
}

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
    timeStamp.innerText = `Timestamp: ${data.timeStamp}`;

    if (!data.student) {
        city.innerText = data.city;
        age.innerText = data.age;
        grade.innerText = data.grade
    } else {
        if (el) {
            student.innerText = el.name
            city.innerText = `This student is from: ${el.city}`
            age.innerText = `Age : ${el.age}`
            grade.innerText = `Current grade is: ${el.grade}`
            student.append(age, city, grade, timeStamp)
            container.append(student)
        } else {
            student.innerText = data.student.name
            city.innerText = `This student is from: ${data.student.city}`
            age.innerText = `Age : ${data.student.age}`
            grade.innerText = `Current grade is: ${data.student.grade}`
            clsName.innerText = `Enrolled in ${data.classname}`
            student.append(age, city, grade, clsName, timeStamp);
            container.append(student)
        }
    }
    console.log("student", student)
    emptyInput()
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
    document.querySelector('#enrollClass').value = '';
    document.querySelector('#studentName').value = '';
    document.querySelector('#age').value = '';
    document.querySelector('#city').value = '';
    document.querySelector('#grade').value = '';
}

const clearResults = () => {
    let container = getContainer()
    while (container.firstChild) {
        container.removeChild(container.firstChild)
    }
}