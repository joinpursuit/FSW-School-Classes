document.addEventListener("DOMContentLoaded", () => {
    // TODO: DONOT USE ALERTS. THEY LOOK CHEAP. Replace Alerts with showing an error
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
        postData(`http://localhost:3000/class/${studentClass.value}/enroll`, student, appendStdResponse);
    }
}

const appendStdResponse = (data) => {
    let studentSection = document.querySelector("#studentResponse");
    studentSection.innerHTML = "";

    let student = data.student;

    if(data.error) {
        let err = document.createElement("p");
        err.innerText = data.error;
        studentSection.appendChild(err);
    } else {
        let status = document.createElement("p");
        status.innerText = "Student Enrolled";
        let p = document.createElement("p");
        p.innerHTML = `<b>Name</b>: ${student.name} <b>Age</b>: ${student.age} <b>City</b>: ${student.city} <b>Grade</b>: ${student.grade}`;
        studentSection.appendChild(status);
        studentSection.appendChild(p);
    }
}

const listStudents = async () => {
    let listClass = document.querySelector("#listClass");
    let listCity = document.querySelector("#listCity");
    let listFailing = document.querySelector("#listFailing");

    if(!listClass.value) {
        alert("No Class was entered!");
    } else {
        let res;
    
        if(listFailing.checked && listCity.value) {
            res = await axios.get(`http://localhost:3000/class/${listClass.value}/students?failing=true&city=${listCity.value}`);
        } else if(listFailing.checked) {
            res = await axios.get(`http://localhost:3000/class/${listClass.value}/students?failing=true`);
        } else if(listCity.value) {
            res = await axios.get(`http://localhost:3000/class/${listClass.value}/students?city=${listCity.value}`);
        } else {
            res = await axios.get(`http://localhost:3000/class/${listClass.value}/students`);
        }

        appendListResponse(res.data);
    }
}

const appendListResponse = (data) => {
    let students = data.students;
    let listResponse = document.querySelector("#listResponse");
    listResponse.innerHTML = "";
    if(students.length === 0) {
        let noStudents = document.createElement("p");
        noStudents.innerText = "No students found.";
        listResponse.appendChild(noStudents);
    } else {
        let studentList = document.createElement("ul");
        students.forEach(student => {
            let li = document.createElement("li");
            li.innerHTML = `<b>Name</b>: ${student.name} <b>Age</b>: ${student.age} <b>City</b>: ${student.city} <b>Grade</b>: ${student.grade}`;
            studentList.appendChild(li);
        })
        listResponse.appendChild(studentList);
    }
}