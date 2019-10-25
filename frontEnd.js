let url;
let clsName, name, age, city, grade, timeStamp;
document.addEventListener('DOMContentLoaded', () => {
    emptyInput()
    let addForm = document.querySelector('#addClass')
    addForm.addEventListener('submit', (event) => {
        event.preventDefault()
        addingClassToDom()
    })

    let enrollmentForm = document.querySelector('#enrollmentContainer')
    enrollmentForm.addEventListener('submit', (event) => {
        event.preventDefault()
        addingStudentToDom()
    })

    let searchForm = document.querySelector('#listStudents')
    searchForm.addEventListener('submit', (event) => {
        event.preventDefault()
        classFilterChoiceToDOM()
    })
    checker()
})

// this function uses axios to create the information of a class
const loadAddClassData = async () => {
    let className = document.querySelector('#createClass').value
    let teacher = document.querySelector('#teacher').value
    url = `http://localhost:8000/class?name=${className}&teacher=${teacher}`

    let classObj = {
        className,
        teacher
    }

    const {
        data
    } = await axios.post(url, classObj);
    console.log(data);
    return data
}

// retrieving the container to display class creation results
const getContainer = () => document.querySelector('#results')

//this function adds the class information to the screen
const addingClassToDom = async () => {
    const classData = await loadAddClassData()
    displayNewClass(classData)
}

// creating cards for the class information created
const displayNewClass = async (data) => {

    const container = getContainer();
    clearResults()
    let lecture = document.createElement('div');
    lecture.className = 'classCard';
    let professor = document.createElement('p');
    let message = document.createElement('p');
    let err = document.createElement('p');
    timeStamp = document.createElement('p').innerText = `Timestamp: ${data.timeStamp}`;

    if (data.class === undefined) {
        err.innerText = data.error
        lecture.append(err, timeStamp)
    } else {
        lecture.innerText = `Class Name: ${data.class.name}`;
        professor.innerText = `Assigned professor: ${data.class.teacher}`;
        message.innerText = `Status: ${data.message}`;
        lecture.append(professor, message, timeStamp)
    }
    container.append(lecture)
    emptyInput()
}


// function to post the information about the students from user input
const loadStudentEnrollment = async () => {
    let className = document.querySelector('#enrollClass').value
    let name = document.querySelector('#studentName').value
    let age = document.querySelector('#age').value
    let city = document.querySelector('#city').value
    let grade = document.querySelector('#grade').value

    url = `http://localhost:8000/class/${className}/enroll?name=${name}&city=${city}&age=${parseInt(age)}&grade=${parseFloat(grade)}`

    let studentObj = {
        name,
        age,
        city,
        grade
    }
    const {
        data
    } = await axios.post(url, studentObj)

    console.log(data);
    return data
}

//grabbing the students enrollment container
// const getEnrollSubContainer = () => document.querySelector('#enrollSubContainer');

//displaying the new student information to the screen 
const addingStudentToDom = async () => {
    const studentData = await loadStudentEnrollment()
    clearResults()
    displayEnrollment(studentData)
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
    timeStamp = document.createElement('p').innerText = `Timestamp: ${data.timeStamp}`;

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
            student.append(age, city, grade, clsName, timeStamp)
            container.append(student)
        } else {
            student.innerText = data.student.name
            city.innerText = `This student is from: ${data.student.city}`
            age.innerText = `Age : ${data.student.age}`
            grade.innerText = `Current grade is: ${data.student.grade}`
            student.append(age, city, grade, clsName, timeStamp);
            container.append(student)
        }
    }
    console.log("student", student)
    // container.append(student)
    emptyInput()
}

//this function sets the eventListener to the check-box 
const checker = () => {
    let check = document.querySelector('#showFailing')
    check.addEventListener('change', () => {
        // check.checked === true ? console.log('hello') : console.log('bye');
        console.log(check.checked);
    })
    return check.checked
}

//grabbing the student information by filter
const loadStudentByClass = async () => {
    let className = document.querySelector('#searchClass').value

    let checkBox = checker()
    url = `http://localhost:8000/class/${className}/students?failing=${checkBox}`

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
    classFilterData.student === undefined ? displayError(classFilterData) : classFilterData.student.forEach(el => displayEnrollment(classFilterData, el));
}

const displayError = (data) => {
    const container = getContainer();
    let err = document.createElement('p')
    err.innerText = `Error: ${data.error}`
    let timeStamp = document.createElement('p')
    timeStamp.innerText = `Timestamp: ${data.timeStamp}`;
    container.append(err, timeStamp)
}

//this function empties the the user input
const emptyInput = () => {
    document.querySelector('.classname').value = ''
    document.querySelector('#teacher').value = ''
    document.querySelector('#enrollClass').value = '';
    document.querySelector('#studentName').value = '';
    document.querySelector('#age').value = '';
    document.querySelector('#city').value = '';
    document.querySelector('#grade').value = '';
    document.querySelector('#searchClass').value = '';
    document.querySelector('#showFailing').checked = false;
}

const clearResults = () => {
    let container = getContainer()
    while (container.firstChild) {
        container.removeChild(container.firstChild)
    }
}