let baseURL = 'http://localhost:3000/class'

document.addEventListener("DOMContentLoaded", () => {
    // FORMS:
    let addClassForm = document.querySelector('#addClass');
    let addStudentForm = document.querySelector('#addStudent');
    let listStudentForm = document.querySelector('#listStudent');

    // addClassForm INPUTS:
    let classNameInput = document.querySelector("#className");
    let classTeacherInput = document.querySelector("#classTeacher");
    let addClassBtn = document.querySelector("#addClassBtn");

    // addStudentForm INPUTS:
    let studentClassInput = document.querySelector("#studentClass");
    let studentNameInput = document.querySelector("#studentName");
    let studentAgeInput = document.querySelector("#studentAge");
    let studentCityInput = document.querySelector("#studentCity");
    let studentGradeInput = document.querySelector("#studentGrade");
    let failingCheckBoxInput = document.querySelector("#failing");
    let addStudentBtn = document.querySelector("#addStudentBtn");
    

    // listStudentForm INPUTS:
    let searchStudentByClassInput = document.querySelector("#searchStudentByClass");
    let searchStudentByCityInput = document.querySelector("#searchStudentByCity");
    let listStudentBtn = document.querySelector("#listStudentBtn");


    // FEEDBACK
    let feedbackText = document.querySelector("#feedbackText");
    let feedbackDetails = document.querySelector("#details");


    addClassForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        let className = classNameInput.value;
        let teacherName = classTeacherInput.value;

        try {
            let response = await axios.post(baseURL, {data: {name: className, teacher: teacherName}})
            handleServerResponse(feedbackText, feedbackDetails, response.data)
        } catch (err) {
            console.log(err)
        }
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
            let response = await axios.post(`${baseURL}/${studentClass}`, {data: studentObject})
            handleServerResponse(feedbackText, feedbackDetails, response.data)
        } catch (err) {
            console.log(err)
        }
    })

    
    listStudentForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        let className = searchStudentByClassInput.value;
        if (!className) {
            className = 'noClass';
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
            handleServerResponse(feedbackText, feedbackDetails, response.data)
        } catch (err) {
            console.log(err)
        }
    })

})


const handleServerResponse = (container, details, data) => {
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
            console.log(data.students)
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