let url;

document.addEventListener('DOMContentLoaded', () => {
    let addForm = document.querySelector('#addClass')
    addForm.addEventListener('submit',(event) =>{
        event.preventDefault()
        displayNewClass()
    })

    let enrollmentForm = document.querySelector('#enrollmentContainer')
    enrollmentForm.addEventListener('submit', (event) => {
        event.preventDefault()
        displayEnrollment()
    })
    let checker = document.querySelector('#showFailing')
    // checker.addEventListener('CheckedChanged', failingOrNot)
    

})


const loadAddClassData = async () => {
    let className = document.querySelector('#createClass').value
    let teacher = document.querySelector('#teacher').value
    url = `http://localhost:8000/class?name=${className}&teacher=${teacher}`
    const {
        data
    } = await axios.post(url);
 
    return data
}

const getClassResultsContainer = () => document.querySelector('#creationResults')

const displayNewClass = async () => {
    const container = getClassResultsContainer();
    const data = await loadAddClassData();

    let lecture = document.createElement('div');
    lecture.className = 'classCard';
    let professor = document.createElement('p');
    let message = document.createElement('p');
    let timeStamp = document.createElement('p');
    let err = document.createElement('p')

    if (data.class === undefined){
        err.innerText = data.error
        lecture.append(err)
    } else {
        lecture.innerText = `Class Name: ${data.class.name}`;
        professor.innerText = `Assigned professor: ${data.class.teacher}`;
        message.innerText = `Status: ${data.message}`;
        timeStamp.innerText = `Timestamp: ${data.timeStamp}`;
        lecture.append(professor, message, timeStamp)
    }
    container.append(lecture)
    document.querySelector('.classname').value =''
    document.querySelector('#teacher').value =''
}

const loadStudentEnrollment = async () =>{
    let className = document.querySelector('#enrollClass').value
    let studentName = document.querySelector('#studentName').value
    let age = document.querySelector('#age').value
    let city = document.querySelector('#city').value
    let grade = document.querySelector('#grade').value

    url = `http://localhost:8000/class/${className}/enroll?name=${studentName}&city=${city}&age=${age}&grade=${grade}`

    const {
        data
    } = await axios.post(url)

    console.log(data);
    
    return data
}

const getEnrollSubContainer = () => document.querySelector('#enrollSubContainer')

const displayEnrollment =  async() =>{
    const container = getEnrollSubContainer();
    const data = await loadStudentEnrollment();

    let student = document.createElement('div');
    student.className ='student';

    let clsName, name, age ,city ,grade
    clsName = document.createElement('p');
    name = document.createElement('p');
    age = document.createElement('p');
    city = document.createElement('p');
    grade = document.createElement('p');

    student.innerText = data.student.name
    clsName.innerText = `This is student enrolled in: ${data.classname}`;
    city.innerText = `This student is from: ${data.student.city}`
    age.innerText = `Age : ${data.student.age}`
    grade.innerText = `Current grade is: ${data.student.grade}`

    student.append(age,city,age,grade, clsName)
    container.append(student)

    document.querySelector('#enrollClass').value = '';
    document.querySelector('#studentName').value = '';
    document.querySelector('#age').value = ''; 
    document.querySelector('#city').value = '';
    document.querySelector('#grade').value = '';
}

// const failingOrNot = () =>{
//     let checkBox = document.querySelector('#showFailing')
//     checkBox.checked === true ? console.log('hello') :console.log('bye');
//     ;
    
// }