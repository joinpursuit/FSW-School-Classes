document.addEventListener('DOMContentLoaded', () => {
    let addForm = document.querySelector('#addClass')
    addForm.addEventListener('submit',(event) =>{
        event.preventDefault()
        displayClass()
    })

    let checker = document.querySelector('#showFailing')
    // checker.addEventListener('CheckedChanged', failingOrNot)
    

})


const loadAddClassData = async () => {
    let className = document.querySelector('.className').value
    let teacher = document.querySelector('#teacher').value
    let url = `http://localhost:8000/class?name=${className}&teacher=${teacher}`
    const {
        data
    } = await axios.post(url);
 
    return data
}

const getResultsContainer = () => document.querySelector('#searchResults')

const displayClass = async () => {
    const container = getResultsContainer();
    
    const data = await loadAddClassData();

    let lecture = document.createElement('div');
    lecture.className = 'classCard';
    let professor = document.createElement('p');
    let message = document.createElement('p');
    let timeStamp = document.createElement('p');

    lecture.innerText = `Class Name: ${data.class.name}`;
    professor.innerText = `Assigned professor: ${data.class.teacher}`;
    message.innerText = `Status: ${data.message}`;
    timeStamp.innerText = `Timestamp: ${data.timeStamp}`;


    lecture.append(professor,message,timeStamp)
    container.append(lecture)
    console.log(data);
    
}

// const failingOrNot = () =>{
//     let checkBox = document.querySelector('#showFailing')
//     checkBox.checked === true ? console.log('hello') :console.log('bye');
//     ;
    
// }