document.addEventListener("DOMContentLoaded", () => {
  console.log("index.js is working");

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
        formClassRes.innerHTML = JSON.stringify(res.data, null, 4);
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
    axios
      .post(`http://localhost:3000/class/${className2.value}/enroll`, {
        name: name.value,
        age: age.value,
        city: city.value,
        grade: grade.value
      })
      .then(res => {
        formEnrollRes.innerHTML = JSON.stringify(res.data, null, 4);
      });
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
    axios
      .get(url, {
        name: className3.value,
        failing: failing.checked,
        city: cityList.value
      })
      .then(res => {
        debugger;
        formListRes.innerHTML = JSON.stringify(res.data, null, 4);
      });
  });

  // let failing = document.querySelector("#failing");
  // axios.post(`..../class/${className.value}/students`, {params:{failing: failing.value}).then(res => {

  // })
});
