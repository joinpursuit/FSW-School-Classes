const addClassForm = document.querySelector(".form1");
addClassForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    let className = document.querySelector("#class1");
    let teacherName = document.querySelector("#teacherName");
    await axios.post("http://localhost:3000/class", {name: className.value, teacher: teacherName.value, students: []});
    console.log(res.data);
    debugger;
})