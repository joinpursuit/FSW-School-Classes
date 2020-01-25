let ids = JSON.parse(sessionStorage.getItem("ids"));
let student = ids[2];

document.addEventListener("DOMContentLoaded", async () => {
    let res = await axios.get(`http://localhost:3000/students/${student}/classes`);
    populateClasses(res.data);
}) // End of DOMContentLoaded

const populateClasses = (data) => {
    let classesSection = document.querySelector("#classes");
    if(data.error) {

    } else {
        let classes = data.classes;
        classes.forEach(foundClass => {
            let classInfo = document.createElement("p");
            classInfo.innerHTML = `<b>Class</b>: ${foundClass.class_name} <b>Teacher</b>: ${foundClass.first_name} ${foundClass.last_name} <b>Grade</b>: ${foundClass.grade}`;
            classesSection.appendChild(classInfo);
        });

    }

} // End of populateClasses() function