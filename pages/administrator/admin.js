document.addEventListener("DOMContentLoaded", () => {
    let studentForm = document.querySelector("#studentForm");
    let teacherForm = document.querySelector("#teacherForm");

    studentForm.addEventListener("submit", (e) => {
        e.preventDefault();
        addStudent();
    });

    teacherForm.addEventListener("submit", (e) => {
        e.preventDefault();
        addTeacher();
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
        
        postData(`http://localhost:3000/student/`, student, appendStdResponse);
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
        postData("http://localhost:3000/teacher", teacher, appendTchResponse);
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
}