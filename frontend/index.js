document.addEventListener("DOMContentLoaded", () => {
  let addClassDiv = document.querySelector("#addClassDiv");
  let addClassForm = document.querySelector("#addClassForm");
  let classNameInput = document.querySelector("#classNameInput");
  let teacherNameInput = document.querySelector("#teacherNameInput");
  let select = document.querySelector("#select");

  const populateSelect = async () => {
    let res = await axios.get("http://localhost:3000/class");
    let classes = Object.keys(res.data);

    classes.forEach(className => {
      let newOption = document.createElement("option");

      newOption.innerText = className;
      newOption.value = className;
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

  let addStudentDiv = document.querySelector("#addStudentDiv");
  let addStudent = document.querySelector("#addStudent");
  let addStudentForm = document.querySelector("#addStudentForm");
  let studentNameInput = document.querySelector("#studentNameInput");
  let studentAgeInput = document.querySelector("#studentAgeInput");
  let studentCityInput = document.querySelector("#studentCityInput");
  let studentGradeInput = document.querySelector("#studentGradeInput");

  let currentVal;

  select.addEventListener("change", e => {
    currentVal = e.target.value;
  });

  addStudentForm.addEventListener("submit", async e => {
    e.preventDefault();

    let res = await axios.post(
      `http://localhost:3000/class/${currentVal}/enroll`,
      {
        name: studentNameInput.value,

        age: studentAgeInput.value,
        city: studentCityInput.value,
        grade: studentGradeInput.value
      }
    );

    alert(res.data.message);
  });

  let listStudentForm = document.querySelector("#listStudentForm");
  let studentListClassInput = document.querySelector("#studentListClassInput");
  let studentListCityInput = document.querySelector("#studentListCityInput");
  let checkbox = document.querySelector("#checkbox");
  let failing;
  let modalUl = document.querySelector("#modalUl");
  let modal = document.querySelector("#modal");
  let exitButton = document.querySelector("#exitButton");

  exitButton.addEventListener("click", () => {
    modal.close();
  });

  checkbox.addEventListener("click", () => {
    if (checkbox.checked) {
      failing = true;
    } else {
      failing = false;
    }
  });

  const populateUl = studentsArr => {
    modalUl.innerHTML = "";
    studentsArr.forEach(student => {
      let li = document.createElement("li");
      li.innerText = student.name;
      modalUl.appendChild(li);
    });
  };

  listStudentForm.addEventListener("submit", async e => {
    e.preventDefault();

    if (failing) {
      let res = await axios.get(
        `http://localhost:3000/class/${studentListClassInput.value}/students?failing=${failing}`
      );
      populateUl(res.data.students);
      modal.showModal();
    } else {
      let res = await axios.get(
        `http://localhost:3000/class/${studentListClassInput.value}/students`
      );
      populateUl(res.data.students);
      modal.showModal();
    }
  });
});
