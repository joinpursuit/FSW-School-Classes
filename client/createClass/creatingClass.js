let url = "https://sdm-backend.herokuapp.com";

if (window.location.hostname === " ") {
  url = `http://localhost:8283`;
}
let clsName, name, age, city, grade, timeStamp;
document.addEventListener("DOMContentLoaded", () => {
  emptyInput();
  let addForm = document.querySelector("#addClass");
  addForm.addEventListener("submit", (event) => {
    event.preventDefault();
    addingClassToDom();
  });
});

// this function uses axios to create the information of a class
const loadAddClassData = async () => {
  let className = document.querySelector("#createClass").value;
  let teacher = document.querySelector("#teacher").value;

  let params = "http://localhost:8283/class/post";

  let classObj = {
    className,
    teacher,
  };

  try {
    const { data } = await axios.post(params, classObj);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

// retrieving the container to display class creation results
const getContainer = () => document.querySelector(".results");

//this function adds the class information to the screen
const addingClassToDom = async () => {
  const classData = await loadAddClassData();
  classData.error ? displayError(classData) : displayNewClass(classData);
};

// creating cards for the class information created
const displayNewClass = async (data) => {
  const container = getContainer();
  clearResults();
  let lecture = document.createElement("div");
  let name = document.createElement("div");
  let professor = document.createElement("p");
  let message = document.createElement("p");
  let err = document.createElement("p");

  name.className = "className";
  lecture.className = "classCard";
  timeStamp = document.createElement("p");
  timeStamp.innerText = `Created: ${data.payload.timestamp}`;

  name.innerText = `${data.payload.classname}`;
  professor.innerText = `Assigned professor: ${data.payload.teacher}`;
  message.innerText = `Status: ${data.message}`;
  lecture.append(name, professor, message, timeStamp);
  container.append(lecture);
  emptyInput();
};

const emptyInput = () => {
  document.querySelector(".classname").value = "";
  document.querySelector("#teacher").value = "";
};

const clearResults = () => {
  let container = getContainer();
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
};

const displayError = (data) => {
  emptyInput();
  const container = getContainer();
  clearResults();
  let errorDiv = document.createElement("div");
  errorDiv.className = "error";
  let err = document.createElement("p");
  err.innerText = `Error: ${data.message}`;
  let timeStamp = document.createElement("p");
  timeStamp.innerText = `Timestamp: ${data.timeStamp}`;

  errorDiv.append(err, timeStamp);
  container.append(errorDiv);
};
