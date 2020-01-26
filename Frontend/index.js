document.addEventListener("DOMContentLoaded", () => {
   let classEntry = document.querySelector("#classEntry");
   classEntry.addEventListener("submit", addClass);

   let studentEntry = document.querySelector("#studentEntry");
   studentEntry.addEventListener("submit", addStudent);

   let displayAllStudents = document.querySelector("#finalForm");
   displayAllStudents.addEventListener("submit", displayRoster)
})
let url = "http://localhost:4000/class";

const addClass = async (e) => {
   e.preventDefault()
   let className = document.querySelector("#className");
   let classInput = className.value;

   let teacherName = document.querySelector("#teacher");
   let teacherInput = teacherName.value;

   let displayClass = document.querySelector("#classPrint")
   try {
      let result = await axios.post(url, { name: classInput, teacher: teacherInput })
      
      displayClass.innerText = classInput+": "+JSON.stringify(result.data.class)
      
      classInput = "";
      teacherInput = "";
   } catch (err) {
      console.log(err)
   }
}

const addStudent = async (e) => {
   e.preventDefault()
   let courseName = document.querySelector("#courseName")
   let inputCourseName = courseName.value

   let studentName = document.querySelector("#studentName")
   let inputStudentName = studentName.value

   let studentCity = document.querySelector("#city")
   let inputCity = studentCity.value

   let studentAge = document.querySelector("#age")
   let inputAge = studentAge.value

   let studentGrade = document.querySelector("#grade")
   let inputGrade = studentGrade.value

   let displayStudent = document.querySelector("#studentPrint")
   try {
      let result = await axios.post(url +"/"+ inputCourseName + "/enroll", {name: inputStudentName, city: inputCity, age: inputAge, grade: inputGrade})
      
      displayStudent.innerText = JSON.stringify(result.data.student)

   } catch (err) {
      console.log(err)
   }
}

const displayRoster = async (e) => {
   e.preventDefault()
   let classData = document.querySelector("#classList");
   let classVal = classData.value;
   let showStudents = document.querySelector("#rosterPrint")
   try{
      let res = await axios.get(url+"/"+classVal+"/students")
      
      showStudents.innerText = "student(s): " + JSON.stringify(res.data.student)
   } catch (err) {
      console.log(err)
   }
}