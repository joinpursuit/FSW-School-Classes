let url;

document.addEventListener('DOMContentLoaded', () => {
    let addForm = document.querySelector('#addClass')
    addForm.addEventListener('submit',(event) =>{
        event.preventDefault()
      loadAddClassData()
    })

    let enrollmentForm = document.querySelector('#enrollmentContainer')
    enrollmentForm.addEventListener('submit', (event) => {
        event.preventDefault()
        loadStudentEnrollment()
    })


    let searchForm = document.querySelector('#listStudents')
    searchForm.addEventListener('submit', (event) => {
        event.preventDefault()
        loadStudentByClass()
    })

    let checker = document.querySelector('#showFailing')
    // checker.addEventListener('CheckedChanged', failingOrNot)
    

})


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
 
    displayNewClass(data)
}

const getClassResultsContainer = () => document.querySelector('#creationResults')

const displayNewClass = async (data) => {
    const container = getClassResultsContainer();
   

    let lecture = document.createElement('div');
    lecture.className = 'classCard';
    let professor = document.createElement('p');
    let message = document.createElement('p');
    let timeStamp = document.createElement('p');
    let err = document.createElement('p');

    timeStamp.innerText = `Timestamp: ${data.timeStamp}`;

    if (data.class === undefined){
        err.innerText = data.error
        lecture.append(err,timeStamp)
    } else {
        lecture.innerText = `Class Name: ${data.class.name}`;
        professor.innerText = `Assigned professor: ${data.class.teacher}`;
        message.innerText = `Status: ${data.message}`;
        lecture.append(professor, message, timeStamp)
    }
    container.append(lecture)
    emptyInput()
}

const loadStudentEnrollment = async () =>{
    let className = document.querySelector('#enrollClass').value
    let name = document.querySelector('#studentName').value
    let age = document.querySelector('#age').value
    let city = document.querySelector('#city').value
    let grade = document.querySelector('#grade').value

    url = `http://localhost:8000/class/${className}/enroll?name=${name}&city=${city}&age=${age}&grade=${grade}`

    let studentObj = {
        name,
        age,
        city,
        grade
    }
    const {
        data
    } = await axios.post(url,studentObj)

    console.log(data);
    
    displayEnrollment(data)
}

const getEnrollSubContainer = () => document.querySelector('#enrollSubContainer')

const displayEnrollment =  async(data) =>{
    const container = getEnrollSubContainer();
    // const data = await loadStudentEnrollment();

    let student = document.createElement('div');
    student.className ='student';

    let clsName, name, age ,city ,grade, timeStamp
    clsName = document.createElement('p');
    name = document.createElement('p');
    age = document.createElement('p');
    city = document.createElement('p');
    grade = document.createElement('p');
    timeStamp = document.createElement('p')


    student.innerText = data.student.name
    clsName.innerText = `This is student enrolled in: ${data.classname}`;
    city.innerText = `This student is from: ${data.student.city}`
    age.innerText = `Age : ${data.student.age}`
    grade.innerText = `Current grade is: ${data.student.grade}`
    timeStamp.innerText = data.timeStamp

    student.append(age,city,age,grade, clsName,timeStamp)
    container.append(student)
    emptyInput()
}

const emptyInput = () =>{
    document.querySelector('.classname').value = ''
    document.querySelector('#teacher').value = ''
    document.querySelector('#enrollClass').value = '';
    document.querySelector('#studentName').value = '';
    document.querySelector('#age').value = '';
    document.querySelector('#city').value = '';
    document.querySelector('#grade').value = '';
}

const loadStudentByClass = async () => {
    let className = document.querySelector('#searchClass').value
    url = `http://localhost:8000/class?name=${className}/students`

    const {
        data
    } = axios.get(url)

    displayEnrollment(data)
}

const displayStudentsByClass = () => {

}

// const failingOrNot = () =>{
//     let checkBox = document.querySelector('#showFailing')
//     checkBox.checked === true ? console.log('hello') :console.log('bye');
//     ;
    
// }