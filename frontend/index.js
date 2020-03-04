let select = document.querySelector("select");
let addClass = document.querySelector("#addClass");
let teacher = document.querySelector("#teacher");
let addStudents = document.querySelector("#addStudents");
let name = document.querySelector("#name");
let age = document.querySelector("#age");
let city = document.querySelector("#city");
let grade = document.querySelector("#grade");
let listStudents = document.querySelector("#listStudents");
let displayAddClass = document.querySelector("#displayAddClass");
let displayAddstudents = document.querySelector("#displayAddStudents");
let displayListStudents = document.querySelector("#displayListStudents");

select.addEventListener("change", e => {
  if (e.target.value === "addClass") {
    addClass.style.display = "block";
    formEnroll.style.display = "none";
    listStudents.style.display = "none";
  } else if (e.target.value === "enroll") {
    addStudents.style.display = "block";
    addClass.style.display = "none";
    listStudents.style.display = "none";
  } else if (e.target.value === "list") {
    listStudents.style.display = "block";
    addClass.style.display = "none";
    formEnroll.style.display = "none";
  } else {
    formClass.style.display = "none";
    formEnroll.style.display = "none";
    formEnroll.style.display === "none";
  }
});
