document.addEventListener("DOMContentLoaded", () => {
  let className1 = document.querySelector("#className1");
  let teacher = document.querySelector("#teacher");
  let select = document.querySelector("#selectOptions");

  let formClass = document.querySelector("#formClass");
  formClass.style.display = "none";
  let formClassRes = document.querySelector("#formClassRes");

  let formEnroll = document.querySelector("#formEnroll");
  formEnroll.style.display = "none";
  let formEnrollRes = document.querySelector("#formEnrollRes");

  let formList = document.querySelector("#formList");
  formList.style.display = "none";
  let formListRes = document.querySelector("#formListRes");

  select.addEventListener("change", e => {
    if (e.target.value === "addClass") {
      formClass.style.display = "block";
      formEnroll.style.display = "none";
      formList.style.display = "none";
    } else if (e.target.value === "enroll") {
      formEnroll.style.display = "block";
      formClass.style.display = "none";
      formList.style.display = "none";
    } else if (e.target.value === "list") {
      formList.style.display = "block";
      formClass.style.display = "none";
      formEnroll.style.display = "none";
    } else {
      formClass.style.display = "none";
      formEnroll.style.display = "none";
      formEnroll.style.display === "none";
    }
  });

  formClass.addEventListener("submit", e => {
    e.preventDefault();
    formClassRes.innerHTML = "";
    formEnrollRes.innerHTML = "";
    formListRes.innerHTML = "";
    axios
      .post(`http://localhost:3000/class`, {
        name: className1.value,
        teacher: teacher.value
      })
      .then(res => {
        const { error, message } = res.data;
        let display = document.createElement("p");
        if (error) {
          display.innerText = `Error: ${error} \n Timestamp: ${new Date().toString()}`;
        } else {
          display.innerText = `Class: ${res.data.class.name} \n Teacher: ${
            res.data.class.teacher
          } \n Students: ${res.data.class.students.join(
            ", "
          )} \n Message: ${message} \n Timestamp: ${new Date().toString()}`;
        }
        formClassRes.appendChild(display);
        className1.value = "";
        teacher.value = "";
      });
  });

  let className2 = document.querySelector("#className2");
  let name = document.querySelector("#name");
  let age = document.querySelector("#age");
  let city = document.querySelector("#city");
  let grade = document.querySelector("#grade");

  formEnroll.addEventListener("submit", e => {
    e.preventDefault();
    formClassRes.innerHTML = "";
    formEnrollRes.innerHTML = "";
    formListRes.innerHTML = "";
    let display = document.createElement("p");
    if (!className2.value) {
      display.innerText = `Please enter a class name ...`;
    }
    axios
      .post(`http://localhost:3000/class/${className2.value}/enroll`, {
        name: name.value,
        age: age.value,
        city: city.value,
        grade: grade.value
      })
      .then(res => {
        const { error, student, className, message } = res.data;
        if (error) {
          display.innerText = `Error: ${error} \n Timestamp: ${new Date().toString()}`;
        } else {
          display.innerText = `Student name: ${student.name} \n Age: ${
            student.age
          } \n City: ${student.city} \n Grade: ${
            student.grade
          } \n Class Name: ${className} \n Message: ${message} \n Timestamp: ${new Date().toString()}`;
        }
        name.value = "";
        age.value = "";
        city.value = "";
        grade.value = "";
        formEnrollRes.appendChild(display);
      });
    formEnrollRes.appendChild(display);
    name.value = "";
    age.value = "";
    city.value = "";
    grade.value = "";
  });

  let className3 = document.querySelector("#className3");
  let cityList = document.querySelector("#cityList");
  let failing = document.querySelector("#failing");
  formList.addEventListener("submit", e => {
    e.preventDefault();
    formClassRes.innerHTML = "";
    formEnrollRes.innerHTML = "";
    formListRes.innerHTML = "";
    let url;
    if (failing.checked && cityList.value) {
      url = `http://localhost:3000/class/${className3.value}/students?failing=${failing.checked}&city=${cityList.value}`;
    } else if (failing.checked) {
      url = `http://localhost:3000/class/${className3.value}/students?failing=${failing.checked}`;
    } else if (cityList.value) {
      url = `http://localhost:3000/class/${className3.value}/students?city=${cityList.value}`;
    } else {
      url = `http://localhost:3000/class/${className3.value}/students`;
    }
    if (!className3.value) {
      let routeError = document.createElement("p");
      routeError.innerText = `Please enter a class name!`;
      formListRes.appendChild(routeError);
    }
    axios
      .get(url, {
        name: className3.value,
        failing: failing.checked,
        city: cityList.value
      })
      .then(res => {
        const { error, message } = res.data;
        let display2 = document.createElement("p");
        if (error) {
          display2.innerText = `Error: ${error} \n Timestamp: ${new Date().toString()}`;
        } else {
          res.data.students.forEach(student => {
            let studentEl = document.createElement("p");
            studentEl.innerText = `Student name: ${student.name}, Age: ${student.age}, City: ${student.city}, Grade: ${student.grade}`;
            formListRes.appendChild(studentEl);
          });
          display2.innerText = `Message: ${message} \n Timestamp: ${new Date().toString()}`;
        }
        formListRes.appendChild(display2);
      });
  });
});
