document.addEventListener("DOMContentLoaded", async () => {
    let showTeachers = document.querySelector("#showTeachers");

    let res = await axios.get("http:/localhost:3000/teacher");
    let data = res.data;

    if(data.error) {
        let error = document.createElement("p");
        error.innerText = data.error;
        showTeachers.appendChild(error);
    } else {
        let {teachers} = data;
        teachers.forEach(teacher => {
            let teacherInfo = document.createElement("p");
            teacherInfo.innerHTML = `<b>ID</b>: ${teacher.id} <b>Name</b>: ${teacher.first_name} ${teacher.last_name}`;
            showTeachers.appendChild(teacherInfo);
        })
    }
})