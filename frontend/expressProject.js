document.addEventListener('DOMContentLoaded', ()=>{
    console.log('DOM loaded')
    setUpClassForm();
    enrollStudentForm();
    listStudentsForm();
})

const addNewClass = async () =>{
    let url = `http://localhost:3030/class`
    let classname = document.querySelector('#className').value;
    let teacher = document.querySelector('#teacherName').value;
        let data ={
            name: classname,
            teacher: teacher
        }
    try{
        let response = await axios.post(url, data)
        displayClass(data)
    }catch(error){
        console.log(error)
    }
}

const studentInfo = () =>{
let studentName = document.querySelector('#student-name').value;
let studentCity = document.querySelector('#student-city').value;
let studentAge = document.querySelector('#student-age').value;
let studentGrade = document.querySelector('#student-grade').value;
    let data = {
        name: studentName,
        age: studentAge,
        city:studentCity,
        grade: studentGrade
    }
    return data
}
const enrollStudent = async () => {
    let studentClass = document.querySelector('#student-class').value;
    let url = `http://localhost:3030/class/${studentClass}/enroll`
    console.log('enroll student working i guess')
    let reqBody= studentInfo()
    try{
        let response = await axios.post(url, reqBody)
        console.log(response.data)
        let className= response.data.className.name
        let student= response.data.student
        displayNewStudent(className, student)
    }catch(error){
        console.log(error)
    }
    
}

const getInfoListStudents = async () =>{
    let listStudentClass = document.querySelector('#list-student-class').value
    let listStudentCity = document.querySelector('#list-student-city').value
    let failingStudents = document.querySelector('#failing-students').checked

    if(listStudentClass && listStudentCity && failingStudents){
        let url =`http://localhost:3030/class/${listStudentClass}/students?city=${listStudentCity}?failing=${failingStudents}`
        try{
            let response = await axios.get(url)
            let data = response.data.students
            listStudents(data)
        } catch(error){
            console.log('err:', error)
        }
    } else if(listStudentClass && listStudentCity){
        let url =`http://localhost:3030/class/${listStudentClass}/students?city=${listStudentCity}`
        try{
            let response = await axios.get(url)
            let data = response.data.students
            listStudents(data)
        }catch(error){
            console.log('err:', error)
        }
    } else if(listStudentClass){
        let url=`http://localhost:3030/class/${listStudentClass}/students`
        try{
            let response = await axios.get(url)
            let data= response.data.students
            listStudents(data)
        }catch(error){
            console.log('err:', error)
        }
    }
}

const setUpClassForm = () =>{
    let classForm = document.querySelector('#addClass');
    classForm.addEventListener('submit', (event) => {
        event.preventDefault();
        addNewClass();
    })  
}

const enrollStudentForm = () => {
    let enrollForm = document.querySelector('#addStudent');
    enrollForm.addEventListener('submit', (event) =>{
        event.preventDefault();
        enrollStudent();
    })
}

const listStudentsForm = () =>{
    let listStudents = document.querySelector('#listStudents');
    listStudents.addEventListener('submit', (event)=>{
        event.preventDefault();
        getInfoListStudents()
    })
}

const listStudents = (students) =>{
    let actualList = document.querySelector('#list-students')
    students.forEach((el)=>{
        let li = document.createElement('li')
        li.innerText=`Student name: ${el.name}, Age:${el.age}, City: ${el.city}, Grade:${el.grade} `
        actualList.append(li);
    })  
}

const displayClass = (newClass) =>{
    let classUl = document.querySelector('#new-class')
    classUl.innerText = `Classname: ${newClass.name} has been added and the teacher is ${newClass.teacher}`
}

const displayNewStudent = (className, newStudent) =>{
    let studentP = document.querySelector('#student-added')
    studentP.innerText = ` ${newStudent.name} has been added to ${className}`
}