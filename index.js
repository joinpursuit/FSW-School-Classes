document.addEventListener("DOMContentLoaded", () => {
    let classButton = document.getElementById("classButton");
    classButton.addEventListener("click", makeClass);

    let enrollButton = document.getElementById("enrollButton");
    enrollButton.addEventListener("click", enrollStudent);

    let updateButton = document.getElementById("updateButton");
    updateButton.addEventListener("click", updateStudent);

    let getButton = document.getElementById("getButton");
    getButton.addEventListener("click", getStudents);
})

function makeClass() {
    console.log("clicked")
    let className = document.getElementById("name");
    let inputClass = className.value;
    console.log("inputClass", inputClass)
    let teacherName = document.getElementById("teacher");
    let inputTeacher = teacherName.value;

    axios.post("http://localhost:3000/class", {"className": inputClass, "teacherName": inputTeacher })
    .then(result => {
        let p = document.createElement("p");
        p.innerText = result.data.message;

        let classDiv = document.getElementById("makeClass");
        classDiv.append(p);
    })
}

function enrollStudent() {
    let className = document.getElementById("className");
    let inputClass = className.value;

    let studentName = document.getElementById("studentName");
    let inputStudentName = studentName.value;

    let studentAge = document.getElementById("studentAge");
    let inputAge = studentAge.value;

    let studentCity = document.getElementById("studentCity");
    let inputCity = studentCity.value;

    let studentGrade = document.getElementById("studentGrade");
    let inputGrade = studentGrade.value;

    axios.post(`http://localhost:3000/class/${inputClass}/enroll`, {studentName: inputStudentName, studentAge: inputAge, studentCity: inputCity, studentGrade: inputGrade})
    .then(result => {
        console.log(result.data)
        let p = document.createElement("p");
        p.innerText = result.data.message;

        let enrollDiv = document.getElementById("enroll");
        enrollDiv.append(p);

    })
}

function updateStudent() {
    let className = document.getElementById("classUpdate");
    let inputClass = className.value;
    console.log(inputClass)

    let studentName = document.getElementById("studentNameUp");
    let inputStudentName = studentName.value;

    let studentGrade = document.getElementById("studentGradeUp");
    let inputGrade = studentGrade.value;

    axios.patch(`http://localhost:3000/class/${inputClass}/update`, {studentName: inputStudentName, studentGrade: inputGrade})
    .then(result => {
        console.log(result.data)
        let p = document.createElement("p");
        p.innerText = result.data.message;

        let updateDiv = document.getElementById("update");
        updateDiv.append(p);
    })
}

function getStudents() {
    let className = document.getElementById("classNameGet");
    let inputClass = className.value;
    console.log(inputClass)

    let checkbox = document.getElementById("failing");
    console.log(checkbox.checked)

    if(checkbox.checked === false) {
        axios.get(`http://localhost:3000/class/${inputClass}/students`)
        .then(result => {
            console.log("hi")
            console.log(result.data)
            let newStr = `Students in ${inputClass}: `
            for(let i in result.data) {
                newStr += `${i}, `;
            }

        let p = document.createElement("p");
        p.innerText = newStr;

        let studentsDiv = document.getElementById("getStudents");
        studentsDiv.append(p);

        })
    } else {
        axios.get(`http://localhost:3000/class/${inputClass}/students/1`)
        .then(result => {
            let newStr = `Students failing ${inputClass}: `
            for(let i of result.data) {
                newStr += `${i}, `
            }

        let p = document.createElement("p");
        p.innerText = newStr;

        let studentsDiv = document.getElementById("getStudents");
        studentsDiv.append(p);
        })
    }
}