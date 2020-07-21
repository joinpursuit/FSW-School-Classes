let baseURL = 'http://localhost:3000/class'

document.addEventListener("DOMContentLoaded", () => {
    // FORMS:
    let addClassForm = document.querySelector('#addClass');
    let addStudentForm = document.querySelector('#addStudent');
    let listStudentForm = document.querySelector('#listStudent');

    // addClassForm INPUTS:
    let classNameInput = document.querySelector("#className");
    let classTeacherInput = document.querySelector("#classTeacher");

    // addStudentForm INPUTS:
    let studentClassInput = document.querySelector("#studentClass");
    let studentNameInput = document.querySelector("#studentName");
    let studentAgeInput = document.querySelector("#studentAge");
    let studentCityInput = document.querySelector("#studentCity");
    let studentGradeInput = document.querySelector("#studentGrade");
    let failingCheckBoxInput = document.querySelector("#failing");
    

    // listStudentForm INPUTS:
    let searchStudentByClassInput = document.querySelector("#searchStudentByClass");
    let searchStudentByCityInput = document.querySelector("#searchStudentByCity");


    // FEEDBACK
    let feedbackDiv = document.querySelector("#feedbackDiv");
    let feedbackText = document.querySelector("#feedbackText");
    let feedbackDetails = document.querySelector("#details");
    let closeDiv = document.querySelector("#close");

    feedbackDiv.style.visibility = "hidden";

    closeDiv.addEventListener('click', (event) => {
        if (event.target.parentNode.parentNode === feedbackDiv) {
            feedbackDiv.style.visibility = "hidden";
        }
    })
    document.addEventListener('keydown', event => {
        if (event.code === 'Escape') {
            feedbackDiv.style.visibility = "hidden";
        }
    })

    // SUBMITTING FORMS
    addClassForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        let className = classNameInput.value;
        let teacherName = classTeacherInput.value;

        try {
            let response = await axios.post(baseURL, {name: className, teacher: teacherName})
            handleServerResponse(feedbackDiv, feedbackText, feedbackDetails, response.data)
        } catch (err) {
            console.log(err)
        }

        classNameInput.value = '';
        classTeacherInput.value = '';
    })


    addStudentForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        let studentClass = studentClassInput.value;
        let studentName = studentNameInput.value;
        let studentAge = studentAgeInput.value;
        let studentCity = studentCityInput.value;
        let studentGrade = studentGradeInput.value;

        let studentObject = {
            name: studentName,
            age: studentAge,
            city: studentCity,
            grade: studentGrade
        }

        try {
            let response = await axios.post(`${baseURL}/${studentClass}`, studentObject)
            handleServerResponse(feedbackDiv, feedbackText, feedbackDetails, response.data)
        } catch (err) {
            console.log(err)
        }

        studentClassInput.value = '';
        studentNameInput.value = '';
        studentAgeInput.value = '';
        studentCityInput.value = '';
        studentGradeInput.value = '';
    })

    
    listStudentForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        let className = searchStudentByClassInput.value;
        if (!className) {
            className = '---';
        }
        let city = searchStudentByCityInput.value;

        let failingChecked = failingCheckBoxInput;
        
        if (failingChecked.checked) {
            failingChecked = 'true';
        } else {
            failingChecked = 'false';
        }
        try {
            let response = await axios.get(`${baseURL}/${className}/students?failing=${failingChecked}&city=${city}`);
            handleServerResponse(feedbackDiv, feedbackText, feedbackDetails, response.data)
        } catch (err) {
            console.log(err)
        }

        searchStudentByClassInput.value = '';
        searchStudentByCityInput.value = '';
    })

})


const handleServerResponse = (div, container, details, data) => {
    div.style.visibility = 'visible'
    if (data.error) {
        container.innerText = data.error;
        details.innerText = "";
    } else if (data.message){
        container.innerText = data.message;
        details.innerText = ''; 
        if (data.class) {
            details.innerText = `${data.timestamp}
            Class: ${data.class.name}
            Teacher: ${data.class.teacher}`
        }
        if (data.student) {
            details.innerText = `${data.timestamp}
            Class: ${data.class}
            Name: ${data.student.name}
            Age: ${data.student.age}
            City: ${data.student.city}
            Grade: ${data.student.grade}`
        }
        if (data.students) {
            let list = '';
            (data.students).forEach(std => {
                list += "Name: " + std.name + " Age: " + std.age + " city: " + std.city + " Grade: " + std.grade + "\n"
            }) 
            details.innerText = list;
        } 
    } else {
        container.innerText = 'Unexpected Error';
    }
}