let ids = JSON.parse(sessionStorage.getItem("ids"));
let teacher = ids[1];

document.addEventListener("DOMContentLoaded", () => {
    fillShowStudents();
    let updateForm = document.querySelector("#updateForm");
    let showCity = document.querySelector("#showCity");
    let showFailing = document.querySelector("#showFailing");

    updateForm.addEventListener("submit", (e) => {
        e.preventDefault();
        updateStudent();
    })

    showCity.addEventListener("change", () => {
        // Live change the list of students
        // Get through axios the list of students matching the city as it's being changed
        // Will check showFailing.checked and use that query as well
    })

    showFailing.addEventListener("change", () => {
        // Live change the list of students
        // Get through axios the list of students matching the city as it's being changed
        // Will check showCity value and use that query as well
    })
}) // End of DOMContentLoaded

const fillShowStudents = async () => {
    let res = await axios.get(`http://localhost:3000/teachers/${teacher}/classes`);
    let students = document.querySelector("#students");
    students.innerHTML = "";

    if(res.data.error) {
        let error = document.createElement("p");
        error.innerText = res.data.error;
        student.appendChild(error);
    } else {
        let classes = res.data.classes;
        classes.forEach(async (foundClass) => {
            let classUl = document.createElement("ul");
            let foundLi = document.createElement("li");
            foundLi.className = "foundClass";
            foundLi.innerText = foundClass.class_name;
            let foundUl = document.createElement("ul");
            classUl.appendChild(foundLi);
            classUl.appendChild(foundUl);
    
            let studentRes = await axios.get(`http://localhost:3000/classes/${foundClass.id}/students`);
            if(studentRes.data.error) {
                let error = document.createElement("li");
                error.innerText = studentRes.data.error;
                error.className = "student";
                foundUl.appendChild(error);
            } else {
                let classStudents = studentRes.data.students;
                classStudents.forEach(student => {
                    let studentInfo = document.createElement("li");
                    studentInfo.innerHTML = `<b>Name</b>: ${student.first_name} ${student.last_Name} <b>City</b>: ${student.city} <b>Age</b>: ${student.age} <b>Grade</b>: ${student.grade}`;
                    studentInfo.className = "student";
                    foundUl.appendChild(studentInfo);
                })
            }
            students.appendChild(classUl);
        })
    }
} // End of fillShowStudents() function

const updateStudent = async () => {
    // Will patch into the class_enrollments table
    let classId = document.querySelector("#updateClass");
    let studentId = document.querySelector("#updateStudent");
    let grade = document.querySelector("#updateGrade");
    let updateResponse = document.querySelector("#updateResponse");
    if(!classId.value || !studentId.value || !grade.value) {
        let error = document.createElement("p");
        error.innerText = "Please fill out all information";
        updateResponse.appendChild(error);
    } else {
        classId = classId.value;
        studentId = studentId.value;
        grade = grade.value;

        let res = await axios.patch(`http://localhost:3000/class/${classId}/${studentId}`, {grade});
        debugger;
    }
    // Gets the class ID inputted, student ID
    // Updates the grade at both of those inputs when match in the table
    // If no class by that ID then send an error "No class found by that ID"
    // If no student by that ID then send an error "No student found by that ID"
    // If class found and no student found then send an error "No student found by that ID in that class"
    // If both are found then send updated student, and display it
} // End of updateStudent() function