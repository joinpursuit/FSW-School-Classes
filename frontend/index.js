document.addEventListener("DOMContentLoaded", () => {
  let addClassDiv = document.querySelector("#addClassDiv");
  let addClassForm = document.querySelector("#addClassForm");
  let classNameInput = document.querySelector("#classNameInput");
  let teacherNameInput = document.querySelector("#teacherNameInput");
  let select = document.querySelector("#select");

  const populateSelect = async () => {
    let res = await axios.get("http://localhost:3000/class");
    let classes = Object.keys(res.data);

    // debugger;
    classes.forEach(class_ => {
      let newOption = document.createElement("option");

      newOption.innerText = class_;
      select.appendChild(newOption);
    });
  };

  populateSelect();

  addClassForm.addEventListener("submit", async e => {
    e.preventDefault();
    select.innerHTML = " ";

    let res = await axios.post(`http://localhost:3000/class/add`, {
      name: classNameInput.value,
      teacher: teacherNameInput.value
    });
    if (res.data.status === "ok") {
      alert(`${res.data.message} ${res.data.timestamp}`);
    } else {
      alert(`${res.data.error} ${res.data.timestamp}`);
    }

    populateSelect();
    addClassForm.reset();
  });

  let addStudentP = document.querySelector("#addStudentP");
  let addStudentDiv = document.querySelector("#addStudentDiv");
  let addStudent = document.querySelector("#addStudent");
  let addStudentForm = document.querySelector("#addStudentForm");
  let StudentNameInput = document.querySelector("#StudentNameInput");
  let studentAgeInput = document.querySelector("#studentAgeInput");
  let studentCityInput = document.querySelector("#studentCityInput");
  let studentGradeInput = document.querySelector("#studentGradeInput");

  addStudentForm.addEventListener("submit", async e => {
    e.preventDefault();
  });
});
