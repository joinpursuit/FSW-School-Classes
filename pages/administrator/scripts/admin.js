const playAudio = () => {
    let audio = document.querySelector("audio");
    audio.play();
    document.removeEventListener("click", playAudio)
} // End of playAduio() function

document.addEventListener("click", playAudio) // End of audio.play() click listener

document.addEventListener("DOMContentLoaded", () => {
    populateTeacherSelect();
    let studentForm = document.querySelector("#studentForm");
    let teacherForm = document.querySelector("#teacherForm");
    let classForm = document.querySelector("#classForm");

    studentForm.addEventListener("submit", (e) => {
        e.preventDefault();
        addStudent();
    });

    teacherForm.addEventListener("submit", (e) => {
        e.preventDefault();
        addTeacher();
    });

    classForm.addEventListener("submit", (e) => {
        e.preventDefault();
        addClass();
    })
}) // End of DOMContentLoaded

const postData = async (url, data, callback) => {
    try {
        let res = await axios.post(url, data);
        callback(res.data);
    } catch (err) {
        console.log(err);
    }
} // End of postData() function

const populateTeacherSelect = async () => {
    let classTeacher = document.querySelector("#classTeacher");
    try {
        let res = await axios.get("http://localhost:3000/teachers");
        let teachers = res.data.teachers;
        teachers.forEach(teacher => {
            let option = document.createElement("option");
            option.innerText = `${teacher.first_name} ${teacher.last_name}`;
            classTeacher.appendChild(option);
        })
    } catch(err) {
        console.log(err);
    }
} // End of populateTeacherSelect() function

const addStudent = () => {
    let studentFirst = document.querySelector("#studentFirst");
    let studentLast = document.querySelector("#studentLast");
    let studentCity = document.querySelector("#studentCity");
    let studentAge = document.querySelector("#studentAge");
    let studentResponse = document.querySelector("#studentResponse");
    // Grab all needed student tags

    // Check if any info was empty
    if(!studentFirst.value || !studentLast.value || !studentCity.value || !studentAge.value) {
        // If any inputs are empty then display an error
        studentResponse.innerHTML = "";
        let p = document.createElement("p");
        p.innerText = "Please fill out all information.";
        studentSection.appendChild(p);
    } else {
        // Post the data if all data is entered
        let student = {
            firstName: studentFirst.value,
            lastName: studentLast.value,
            city: studentCity.value,
            age: studentAge.value
        }
        
        postData(`http://localhost:3000/students/`, student, appendStdResponse);
    }
} // End of addStudent() function

const appendStdResponse = (data) => {
    let studentSection = document.querySelector("#studentResponse");
    studentSection.innerHTML = "";
    // Reset the studentSection

    let student = data.student;

    let message = document.createElement("p");
    message.innerText = "Added student";

    let studentInfo = document.createElement("p");
    studentInfo.innerHTML = `<b>Name</b>: ${student.first_name} ${student.last_name} <b>City</b>: ${student.city} <b>Age</b>: ${student.age}`;

    studentSection.appendChild(message);
    studentSection.appendChild(studentInfo);

    document.querySelector("#studentFirst").value = "";
    document.querySelector("#studentLast").value = "";
    document.querySelector("#studentCity").value = "";
    document.querySelector("#studentAge").value = "";

} // End of appendStdResponse() function

const addTeacher = () => {
    let teacherFirst = document.querySelector("#teacherFirst");
    let teacherLast = document.querySelector("#teacherLast");
    let teacherResponse = document.querySelector("#teacherResponse");

    if(!teacherFirst.value || !teacherLast.value) {
        teacherResponse.innerHTML = "";
        let error = document.createElement("p");
        error.innerText = "Please fill out all information.";
        teacherResponse.appendChild(error);
    } else {
        let teacher = {
            first: teacherFirst.value,
            last: teacherLast.value
        }
        postData("http://localhost:3000/teachers", teacher, appendTchResponse);
    }
} // End of addTeacher() function

const appendTchResponse = (data) => {
    let teacherResponse = document.querySelector("#teacherResponse");
    teacherResponse.innerHTML = "";

    if(data.error) {
        let error = document.createElement("p");
        error.innerText = data.error;
        teacherResponse.appendChild(error);
    } else {
        let added = data.added;
        
        let message = document.createElement("p");
        message.innerText = "Added teacher";

        let teacherInfo = document.createElement("p");
        teacherInfo.innerHTML = `<b>Name</b>: ${added.first_name} ${added.last_name}`;

        teacherResponse.appendChild(message);
        teacherResponse.appendChild(teacherInfo);

        document.querySelector("#teacherFirst").value = "";
        document.querySelector("#teacherLast").value = "";
    }
} // End of appendTchResponse() function

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
        postData("http://localhost:3000/classes", newClass, appendClassResponse);
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