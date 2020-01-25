document.addEventListener("DOMContentLoaded", async () => {
    let showStudents = document.querySelector("#showStudents");

    let res = await axios.get("http:/localhost:3000/students");
    let data = res.data;

    if(data.error) {
        let error = document.createElement("p");
        error.innerText = data.error;
        showStudents.appendChild(error);
    } else {
        let {students} = data;
        students.forEach(student => {
            let studentInfo = document.createElement("p");
            studentInfo.innerHTML = `<b>ID</b>: ${student.id} <b>Name</b>: ${student.first_name} ${student.last_name} <b>City</b>: ${student.city} <b>Age</b>: ${student.age}`;
            showStudents.appendChild(studentInfo);
        })
    }
})