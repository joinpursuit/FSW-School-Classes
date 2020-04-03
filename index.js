let classAdd = document.querySelector("#classAdd");
let addClass = document.querySelector("#addClass");
let studentEnroll = document.querySelector("#studentEnroll");
let addStudent = document.querySelector("#addStudent");
let list = document.querySelector("#list");
let listStudents = document.querySelector("#listStudents");
addClass.addEventListener("submit", async e => {
  e.preventDefault();
  let name = document.querySelector("#className").value;
  let teacher = document.querySelector("#teacherName").value;
  let p = document.createElement("p");
  let h4 = document.createElement("h4")
  try {
    let host = await axios.post(`http://localhost:4000/class`, {
      teacher: teacher,
      name: name
    });

    h4.innerText = host.data.body.name;
    p.innerText = host.data.body.teacher;
    
    classAdd.appendChild(p);
  } catch (error) {}
});
addStudent.addEventListener("submit", async e => {
  e.preventDefault();
  let className = document.querySelector("#class").value;
  let name = document.querySelector("#student").value;
  let age = document.querySelector("#age").value;
  let city = document.querySelector("#city").value;
  let grade = document.querySelector("#grade").value;
  className.value = "";
  name.value = "";
  age.value = "";
  grade.value = "";
  city.value = "";
  let p = document.createElement("p");
  try {
    let host = await axios.post(`http://localhost:4000/class/${className.value}`, {
      class: className,
      name,
      age,
      grade,
      city
    });
    debugger;
    p.innerText = host.config.data;
    studentEnroll.appendChild(p);
  } catch (error) {
    console.log(error);
  }
});
listStudents.addEventListener("submit", async e => {
  e.preventDefault();
  let className = document.querySelector("#classList").value;
  let city = document.querySelector("#cityList").value;
  className.value = "";
  city.value = "";
  let failing = document.querySelector("#fail");
  let ul = document.querySelector("ul");
  let li = document.createElement("li");
  if (failing.checked) {
    failing = "true";
  } else {
    failing = "false";
  }
  try {
    let host = await axios.post(
      `http://localhost:4000/class/${className}/students?failing=${failing}&city=${city}`,
      { className: className, failing: failing }
    );
    debugger;
    host.forEach(el => {
      li.innerText = el.name + el.age + el.city + el.grade;
      ul.appendChild(li);
    });
  } catch (error) {
    console.log(error);
  }
});
