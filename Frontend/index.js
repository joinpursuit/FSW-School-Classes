document.addEventListener("DOMContentLoaded", () => {
   let classEntry = document.querySelector("#classEntry");
   classEntry.addEventListener("submit", addClass);

   let studentEntry = document.querySelector("#studentEntry");
   studentEntry.addEventListener("submit", addStudent);

   let displayAllStudents = document.querySelector("#finalForm");
   displayAllStudents.addEventListener("submit", displayRoster);

})

const addClass = async (e) => {
   e.preventDefault()
   let className = document.querySelector("#className");
   let teacherName = document.querySelector("#teacher");

   let classInput = className.value;
   let teacherInput = teacherName.value;

   let displayClass = document.querySelector("#classPrint");

   try {
      let res = await axios.post(`http://localhost:4000/class`, { name: classInput, teacher: teacherInput })

      displayClass.innerText = classInput + ": " + JSON.stringify(res.data.class)


   } catch (err) {
      console.log(err)
   }
}

const addStudent = async (e) => {
   e.preventDefault()
   let courseName = document.querySelector("#courseName")
   let inputCourseName = courseName.value

   let studentName = document.querySelector("#studentName");
   let inputStudentName = studentName.value;

   let studentCity = document.querySelector("#city");
   let inputCity = studentCity.value;

   let studentAge = document.querySelector("#age");
   let inputAge = studentAge.value;

   let studentGrade = document.querySelector("#grade");
   let inputGrade = studentGrade.value;

   let displayStudent = document.querySelector("#studentPrint");
   try {
      let result = await axios.post(`http://localhost:4000/class/${inputCourseName}/enroll`, { name: inputStudentName, city: inputCity, age: inputAge, grade: inputGrade });

      displayStudent.innerText = JSON.stringify(result.data.student);

   } catch (err) {
      console.log(err)
   }
}

const displayRoster = async (e) => {
   e.preventDefault()
   let classData = document.querySelector("#classList");
   let classNameInput = classData.value;

   let checkbox = document.querySelector("#checkbox");
   let showStudents = document.querySelector("#rosterPrint");
   
   if(checkbox.checked === false) {
      try {
         let res = await axios.get(`http://localhost:4000/class/${classNameInput}/students`)
         
         showStudents.innerText = "student(s): " + JSON.stringify(res.data.student)

      } catch (err) {
         console.log(err)
      }
   }
   else {
      displayFailingStudents(classNameInput);
   }
}
//displays all students in classVal input field

const displayFailingStudents = async (classNameInput) => {
   let classData = document.querySelector("#rosterPrint");
   
      try {
         let res = await axios.get(`http://localhost:4000/class/${classNameInput}/students/failing`)
         let failingStudentArr = res.data.student;

         classData.innerText = JSON.stringify(failingStudentArr)

      } catch (err) {
         console.log("there was an error with display failing students frontend ", err)
      }
   }
