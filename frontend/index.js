let select = document.querySelector("select");

let addClass = document.querySelector("#addClass");
addClass.style.display = "none";
let className = document.querySelector("#className");
let teacher = document.querySelector("#teacher");
let displayAddClass = document.querySelector("#displayAddClass");

let addStudents = document.querySelector("#addStudents");
addStudents.style.display = "none";
let name = document.querySelector("#name");
let age = document.querySelector("#age");
let city = document.querySelector("#city");
let grade = document.querySelector("#grade");
let displayAddstudents = document.querySelector("#displayAddStudents");

let listStudents = document.querySelector("#listStudents");
listStudents.style.display = "none";
let displayListStudents = document.querySelector("#displayListStudents");

select.addEventListener("change", e => {
  if (e.target.value === "addClass") {
    addClass.style.display = "block";
    addStudents.style.display = "none";
    listStudents.style.display = "none";
  } else if (e.target.value === "enroll") {
    addStudents.style.display = "block";
    addClass.style.display = "none";
    listStudents.style.display = "none";
  } else if (e.target.value === "list") {
    listStudents.style.display = "block";
    addClass.style.display = "none";
    addStudents.style.display = "none";
  } else {
    addClass.style.display = "none";
    listStudents.style.display = "none";
    addStudents.style.display === "none";
  }
});

addClass.addEventListener("submit", async e => {
  e.preventDefault();

  try {
    let res = await axios.post("http://localhost:3000/rhdb/class", {
      name: className.value,
      teacher: teacher.value
    });
    // const { name , teacher } = res.data.class
    displayAddClass.innerText = res.data.message;
    debugger;
    // console.log(res)


    // let res = await axios.get(`http://localhost:3000/class/?failing=${failing.value}&$city=${city.value}`);

    //check res
    //key into it to use res values
    //use values to append to divs or p tags
  } catch (error) {
    console.log(error);
  }
});

addStudents.addEventListener("submit", async e => {
  e.preventDefault();
  try {
    let res = await axios.post("http://localhost:3000/rhbd/:className/enroll", {
      student: 
    });
    displayAddstudents.innerText = res.data.class
    // debugger
  } catch (err) {
    console.log(err);
  }
});
