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
    let res = await axios.get(`http://localhost:3000/class/${teacher}`);
    let students = document.querySelector("#students");
    let classes = res.data.classes;
    classes.forEach(foundClass => {
        let classUl = document.createElement("ul");
        let className = document.createElement("li");
        className.innerText = foundClass.class_name;

        let studentRes = await axios.get(`http://`)
    })
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