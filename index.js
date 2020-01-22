const playAudio = () => {
    let audio = document.querySelector("audio");
    audio.play();
    document.removeEventListener("click", playAudio)
} // End of playAduio() function

document.addEventListener("click", playAudio) // End of audio.play() click listener

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
}) // End of DOMContentLoaded

const postData = async (url, data, callback) => {
    try {
        let res = await axios.post(url, data);
        callback(res.data);
    } catch (err) {
        console.log(err);
    }
} // End of postData() function

const addClass = async () => {
    let className = document.querySelector("#className");
    let classTeacher = document.querySelector("#classTeacher");
    let classSection = document.querySelector("#classResponse");
    // Grab the needed class tags

    // Check if either of the inputs are empty
    if(!className.value || !classTeacher.value) { 
        // If true then add an error display
        classSection.innerHTML = "";
        let p = document.createElement("p");
        p.innerText = "Please fill out all information.";
        classSection.appendChild(p);
    } else {
        // If all data was entered then post it to the DB
        let newClass = {name: className.value, teacher: classTeacher.value};
        postData("http://localhost:3000/class", newClass, appendClassResponse);
    }
    
} // End of addClass() function

const appendClassResponse = (data) => {
    let classSection = document.querySelector("#classResponse");
    classSection.innerHTML = "";
    // Reset the classSection section

    let newClass = data.class;

    // Check if there is an error
    if(data.error) {
        // Display an error if so
        let err = document.createElement("p");
        err.innerText = "Class already exists.";
        classSection.appendChild(err);
    } else {
        // Display the information of the class added if no error
        let status = document.createElement("p");
        status.innerText = "Class Added";
        let p = document.createElement("p");
        p.innerHTML = `<b>Class Name</b>: ${newClass.name} <b>Teacher</b>: ${newClass.teacher}`;
        classSection.appendChild(status);
        classSection.appendChild(p);

        // Reset the input tags
        document.querySelector("#className").value = "";
        document.querySelector("#classTeacher").value = "";
    }
} // End of appendClassResponse() function

const addStudent = () => {
    let studentClass = document.querySelector("#studentClass");
    let studentFirst = document.querySelector("#studentFirst");
    let studentLast = document.querySelector("#studentLast");
    let studentAge = document.querySelector("#studentAge");
    let studentCity = document.querySelector("#studentCity");
    let studentGrade = document.querySelector("#studentGrade");
    let studentSection = document.querySelector("#studentResponse");
    // Grab all needed student tags

    // Check if any info was empty
    if(!studentClass.value || !studentFirst.value || !studentLast.value || !studentAge.value || !studentCity.value || !studentGrade.value){
        // If any inputs are empty then display an error
        studentSection.innerHTML = "";
        let p = document.createElement("p");
        p.innerText = "Please fill out all information.";
        studentSection.appendChild(p);
    } else {
        // Post the data if all data is entered
        let student = {
            firstName: studentFirst.value,
            lastName: studentLast.value,
            age: studentAge.value,
            city: studentCity.value,
            grade: studentGrade.value
        }
        
        postData(`http://localhost:3000/class/${studentClass.value}/enroll`, student, appendStdResponse);
    }
} // End of addStudent() function

const appendStdResponse = (data) => {
    let studentSection = document.querySelector("#studentResponse");
    studentSection.innerHTML = "";
    // Reset the studentSection

    let student = data.student;

    // Check if for an error
    if(data.error) {
        // Display it if so
        let err = document.createElement("p");
        err.innerText = data.error;
        studentSection.appendChild(err);
    } else if(data.message === "Enrolled Student") {
        // If student was fully enrolled then display
        let status = document.createElement("p");
        status.innerText = "Student Enrolled";
        studentSection.appendChild(status);

    } else if(data.message === "Updated Student") {
        // If student info was update then display 

        let status = document.createElement("p");
        status.innerText = "Student Updated";
        studentSection.appendChild(status);
    }

    if(!data.error) {
        // Display info for the student
        let p = document.createElement("p");
        p.innerHTML = `<b>Name</b>: ${student.name} <b>Age</b>: ${student.age} <b>City</b>: ${student.city} <b>Grade</b>: ${student.grade}`;
        studentSection.appendChild(p);

        // Reset the input tags
        document.querySelector("#studentClass").value = "";
        document.querySelector("#studentFirst").value = "";
        document.querySelector("#studentLast").value = "";
        document.querySelector("#studentCity").value = "";
        document.querySelector("#studentAge").value = "";
        document.querySelector("#studentGrade").value = "";
    }
} // End of appendStdResponse() function

const listStudents = async () => {
    let listClass = document.querySelector("#listClass");
    let listCity = document.querySelector("#listCity");
    let listFailing = document.querySelector("#listFailing");
    let listResponse = document.querySelector("#listResponse");
    // Grab all needed list tags

    // Check if no class was entered
    if(!listClass.value) {
        // Display an enter class error if so
        listResponse.innerHTML = "";
        let p = document.createElement("p");
        p.innerText = "Please enter a class.";
        listResponse.appendChild(p);
    } else {
        let res;
    
        // Depending on the if the user wants failing students, students from a city or both get diff data
        if(listFailing.checked && listCity.value) {
            res = await axios.get(`http://localhost:3000/class/${listClass.value}/students?failing=true&city=${listCity.value}`);
        } else if(listFailing.checked) {
            res = await axios.get(`http://localhost:3000/class/${listClass.value}/students?failing=true`);
        } else if(listCity.value) {
            res = await axios.get(`http://localhost:3000/class/${listClass.value}/students?city=${listCity.value}`);
        } else {
            res = await axios.get(`http://localhost:3000/class/${listClass.value}/students`);
        }

        // Reset input tags
        listClass.value = "";
        listCity.value = "";
        listFailing.checked = false;

        // Post list data
        appendListResponse(res.data);
    }
} // End of listStudents() function

const appendListResponse = (data) => {
    let listResponse = document.querySelector("#listResponse");
    listResponse.innerHTML = "";
    let students = data.students;
    // Reset listResponse section and grab data.student

    // Check if any students are returned
    if(!students) {
        // If not then display "No students found"
        let noStudents = document.createElement("p");
        noStudents.innerText = "No students found.";
        listResponse.appendChild(noStudents);
    } else {
        // If yes then display each student
        let studentList = document.createElement("ul");
        let classHeading = document.createElement("h3");
        classHeading.innerText = data.className;

        students.forEach(student => {
            let li = document.createElement("li");
            li.innerHTML = `<b>Studend ID</b>: ${student.id} <b>Name</b>: ${student.first_name} ${student.last_name} <b>Age</b>: ${student.age} <b>City</b>: ${student.city} <b>Grade</b>: ${student.grade}`;
            studentList.appendChild(li);
        })
        listResponse.appendChild(classHeading);
        listResponse.appendChild(studentList);
    }
} // End of appendListResponse() function