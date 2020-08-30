let url = "https://sdm-backend.herokuapp.com";

let clsName;
document.addEventListener("DOMContentLoaded", () => {
  if (window.location.href.includes("file")) {
    url = `http://localhost:8283`;
  }

  emptyInput();

  let searchForm = document.querySelector("#listStudents");
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    classFilterChoiceToDOM();
    document.querySelector("#bodyContainer").style.display = "flex";
  });
  checker();
});

// retrieving the container to display class creation results
const getContainer = () => document.querySelector(".results");

//grabbing the student information by filter
const loadStudentByClass = async () => {
  let className = document.querySelector("#searchClass").value;
  let checkBox = checker();
  let params = `/classData/${className}/information?failing=${checkBox}`;

  try {
    console.log(params);
    const { data } = await axios.get(url + params);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

//creating cards for student information to be added to the screen
const displayEnrollment = async (data, el) => {
  console.log("this is display", data.payload[0].studentname);

  const container = getContainer();

  // container.style.visibility = "";

  let student = document.createElement("div");
  student.className = "student";

  clsName = document.createElement("p");
  name = document.createElement("p");
  age = document.createElement("p");
  city = document.createElement("p");
  grade = document.createElement("p");
  timeStamp = document.createElement("p");
  timeStamp.innerText = `Timestamp: ${el.timestamp}`;

  student.innerText = el.studentname;
  city.innerText = `This student is from: ${el.city}`;
  age.innerText = `Age : ${el.age}`;
  grade.innerText = `Current grade is: ${el.grade}`;
  clsName.innerText = `Enrolled in ${el.classname}`;
  student.append(age, city, grade, clsName, timeStamp);
  container.append(student);

  console.log("student", student);
  emptyInput();
};

//this function sets the eventListener to the check-box
const checker = () => {
  let check = document.querySelector("#showFailing");
  check.addEventListener("change", () => {});
  return check.checked;
};

const classFilterChoiceToDOM = async () => {
  const classFilterData = await loadStudentByClass();
  clearResults();
  console.log("This is class filter", classFilterData);
  try {
    classFilterData.status === "failed"
      ? displayError(classFilterData)
      : classFilterData.payload.forEach((el) =>
          displayEnrollment(classFilterData, el)
        );
  } catch (error) {
    console.log(error);
  }
};

//this function handles displaying the error message
const displayError = (data) => {
  emptyInput();
  const container = getContainer();
  clearResults();
  let errorDiv = document.createElement("div");
  errorDiv.className = "error";
  let err = document.createElement("p");
  err.innerText = `${data.message}`;

  errorDiv.append(err);
  container.append(errorDiv);
};

//this function empties the the user input
const emptyInput = () => {
  document.querySelector("#searchClass").value = "";
  document.querySelector("#showFailing").checked = false;
};

const clearResults = () => {
  let container = getContainer();
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
};
