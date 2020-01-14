document.addEventListener("DOMContentLoaded", () => {
    let classForm = document.querySelector("#classForm");
    let studentForm = document.querySelector("#studentForm");
    let listForm = document.querySelector("#listForm");

    classForm.addEventListener("submit", (e) => {
        e.preventDefault();
        addClass();
    });
    
    studentForm.addEventListener("submit", (e) => {
        e.preventDefault();
        addStudent()
    });

    listForm.addEventListener("submit", (e) => {
        e.preventDefault();
        listStudents()
    });
})

const postData = async (url, data, callback) => {
    try {
        let res = await axios.post(url, data);
        callback(res.data);
    } catch (err) {
        console.log(err);
    }
}

const addClass = async () => {
    let className = document.querySelector("#className");
    let classTeacher = document.querySelector("#classTeacher");

    if(!className.value || !classTeacher.value) { 
        alert("Missing class information.");
    } else {
        let newClass = {name: className.value, teacher: classTeacher.value};
        postData("http://localhost:3000/class", newClass, appendClassResponse);
    }
    
}

const appendClassResponse = (data) => {
    let classSection = document.querySelector("#classResponse");
    classSection.innerHTML = "";

    let newClass = data.class;

    if(data.error) {
        let err = document.createElement("p");
        err.innerText = data.error;
        classSection.appendChild(err);
    } else {
        let status = document.createElement("p");
        status.innerText = "Class Added";
        let p = document.createElement("p");
        p.innerHTML = `<b>Class Name</b>: ${newClass.name} <b>Teacher</b>: ${newClass.teacher}`;
        classSection.appendChild(status);
        classSection.appendChild(p);
    }
}

const addStudent = () => {
    let studentClass = document.querySelector("#studentClass");
    let studentName = document.querySelector("#studentName");
    let studentAge = document.querySelector("#studentAge");
    let studentCity = document.querySelector("#studentCity");
    let studentGrade = document.querySelector("#studentGrade");

    if(!studentClass.value || !studentName.value || !studentAge.value || !studentCity.value || !studentGrade.value){
        alert("Missing student information.");
    } else {
        let student = {
            name: studentName.value,
            age: studentAge.value,
            city: studentCity.value,
            grade: studentGrade.value
        }
        postData(`http://localhost:3000/class/${studentClass.value}/enroll`, student, appendStdResposne);
    }
}

const appendStdResposne = (data) => {
    
}

const listStudents = () => {

}