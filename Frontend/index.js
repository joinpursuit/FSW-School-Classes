document.addEventListener("DOMContentLoaded", () => {
   let classEntry = document.querySelector("#classEntry");
   classEntry.addEventListener("submit", addClass);

   let studentEntry = document.querySelector("#studentEntry");
   studentEntry.addEventListener("submit", addStudent);

   let displayAllStudents = document.querySelector("#finalForm");
   displayAllStudents.addEventListener("submit", displayRoster);
   
   getAllClasses('#classList');
   getAllClasses('#classList2');
   
})

const addClass = async (e) => {
   e.preventDefault()
   console.log(e)
   let className = document.querySelector("#className");
   let teacherName = document.querySelector("#teacher");
   
   let classInput = className.value;
   let teacherInput = teacherName.value;

   let displayClass = document.querySelector("#classPrint");
   
   try {
      let res = await axios.post(`http://localhost:4000/class`, { name: classInput, teacher: teacherInput })
      
      displayClass.innerText = `${res.data.message} called ${res.data.body.name}`
   
   getAllClasses('#classList')
   getAllClasses('#classList2')

   } catch (err) {
      
      console.log(err)
   }
}

const getAllClasses = async (id) => {
   try {
      let classList = document.querySelector(id);
      
      classList.innerHTML = "";
      let res = await axios.get("http://localhost:4000/class")
      let classes = res.data.body
      for (let key in classes) {
         let option = document.createElement('option');
         option.innerText = key;
         option.value = key;
         classList.append(option)
      }
   } catch (err) {
      console.log(err)
   }

}

const addStudent = async (e) => {
   e.preventDefault()
   let courseName = document.querySelector("#classList");
   let inputCourseName = courseName.value;

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
      let res = await axios.post(`http://localhost:4000/class/${inputCourseName}/enroll`, { name: inputStudentName, city: inputCity, age: inputAge, grade: inputGrade });
      console.log(res.data)
      displayStudent.innerText = res.data.message;

   } catch (err) {
      console.log(err)
   }
}

const displayRoster = async (e) => {
   e.preventDefault()
   let classData = document.querySelector("#classList2");
   let classNameInput = classData.value;

   let checkbox = document.querySelector("#checkbox");
   let showStudents = document.querySelector("#rosterPrint");
   
   if(checkbox.checked === false) {
      try {
         let res = await axios.get(`http://localhost:4000/class/${classNameInput}/students`)
         
         showStudents.innerText = "student(s): " + JSON.stringify(res.data.body)

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
         let failingStudentArr = res.data.body;

         classData.innerText = JSON.stringify(failingStudentArr)

      } catch (err) {
         console.log("there was an error with display failing students frontend ", err)
      }
   }
