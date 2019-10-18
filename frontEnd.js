let url;

document.addEventListener('DOMContentLoaded', () => {
    let addForm = document.querySelector('#addClass')
    addForm.addEventListener('submit',(event) =>{
        event.preventDefault()
        displayClass()
    })

    let enrollmentForm = document.querySelector('#enrollmentContainer')
    enrollmentForm.addEventListener('submit', (event) => {
        event.preventDefault()
        loadStudentEnrollment()
    })
    let checker = document.querySelector('#showFailing')
    // checker.addEventListener('CheckedChanged', failingOrNot)
    

})


const loadAddClassData = async () => {
    let className = document.querySelector('.classname').value
    let teacher = document.querySelector('#teacher').value
    url = `http://localhost:8000/class?name=${className}&teacher=${teacher}`
    const {
        data
    } = await axios.post(url);
 
    return data
}

const getResultsContainer = () => document.querySelector('#creationResults')

const displayClass = async () => {
    const container = getResultsContainer();
    
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

    // lecture.innerText = `Class Name: ${data.class.name}`;
    // professor.innerText = `Assigned professor: ${data.class.teacher}`;
    // message.innerText = `Status: ${data.message}`;
    // timeStamp.innerText = `Timestamp: ${data.timeStamp}`;
    // err.innerText = data.error




    // lecture.append(professor,message,timeStamp)
    
    // data.class === undefined ? lecture.append(err) : lecture.append(professor, message, timeStamp)
    container.append(lecture)
    console.log(data);


    document.querySelector('.classname').value =''
    document.querySelector('#teacher').value =''
}

const loadStudentEnrollment = async () =>{
    let className = document.querySelector('.classname').value
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

// const failingOrNot = () =>{
//     let checkBox = document.querySelector('#showFailing')
//     checkBox.checked === true ? console.log('hello') :console.log('bye');
//     ;
    
// }