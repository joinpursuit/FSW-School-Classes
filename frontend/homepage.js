document.addEventListener("DOMContentLoaded", () => {
    const addClassForm = document.querySelector("#form1");
    addClassForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        let addClassName = document.querySelector("#class1");
        let addTeacherName = document.querySelector("#teacherName");
        let res = await axios.post("http://localhost:4000/class", {name: addClassName.value, teacher: addTeacherName.value});
        console.log(res.data);
        let ul = document.querySelector("ul");
        let li = document.createElement("li");
        li.innerText = res.data.message;
        ul.appendChild(li);
    });
    
    const enrollStudentForm = document.querySelector("#form2");
    enrollStudentForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        let enrollClassName = document.querySelector("#class2");
        let enrollStudentName = document.querySelector("#studentName");
        let enrollAge = document.querySelector("#age");
        let enrollCity = document.querySelector("#city2");
        let enrollGrade = document.querySelector("#grade");
        let res = await axios.post("http://localhost:4000/class/%{enrollClassName.value}/enroll", {class: enrollClassName.value, name: enrollStudentName.value, age: enrollAge.value, city: enrollCity.value, grade: enrollGrade.value});
    });
    
    // const listStudentForm = document.querySelector("#form3");
    // listStudentForm.addEventListener("submit", async (event) => {
    //         event.preventDefault();
    //         let listStudentClass = document.querySelector("#class3");
    //         let listStudentCity = document.querySelector("#city3");
        
    //         let res = await axios.get("http://localhost:4000/class/%{listStudentClass.value}/students", {})
    //     })
})