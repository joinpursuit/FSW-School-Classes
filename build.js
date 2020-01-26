const Class = require('./Class');
const Student = require('./Student')

class School {
  constructor() {
    this.classes = {
     // className: Class Object
      //   physics: {} 
}
  }
  addClassToClasses(name,teacher){
        this.addClass(name,teacher);
        return this.classes[name];
  }
  addClass(name, teacher) {
    let newClass = new Class(name, teacher);
    this.classes[name] = newClass;
  }

  enrollStudent(className,student) {
     let studentsarr = this.classes[className].students;
     let newStudent = new Student(student,0,"",0);
     studentsarr.push(newStudent);
     return student;
  }

  getStudentsByClass(className) {
    return this.classes[className].students
  }

  getStudentsByClassWithFilter(className, failing, city) {
    let studentsarr = this.classes[className].students
    
    return studentsarr.filter(student => {
       if(failing && student.grade < 70 && city === student.city){
         return student
       }
       else if(failing && student.grade < 70) { 
           return student
       }
       else if(city){
           return student
       }
    })
  }


}

// let andrewJackson = new School();
// andrewJackson.addClass("english","jon");
// andrewJackson.addClass("math","Danny");
// andrewJackson.enrollStudent("math","boe");
// andrewJackson.enrollStudent("math","joe");
// // console.log(andrewJackson.getStudentsByClass("math"));
// console.log(andrewJackson.getStudentsByClassWithFilter("math",false,"ny"))
// // console.log(andrewJackson);


// let today = new Date()

// let year = today.getFullYear();
// let month = today.getMonth() + 1;
// let date = today.getDate();
 
// const addZero = (num) => {
//   return num < 10 ? `0${num}`:num;
// }

// let hours = addZero(today.getHours());
// let minutes = addZero(today.getMinutes());
// let seconds = addZero(today.getSeconds());


// let currentDate = `${month}/${date}/${year}`;
// let currentTime = `${hours}:${minutes}:${seconds}`;

// console.log(`current Date Is:${currentDate} & Current Time is ${currentTime}` );

const displayTime = () =>{
  let today = new Date()

  let year = today.getFullYear();
  let month = today.getMonth() + 1;
  let date = today.getDate();

  const addZero = (num) => {
    return num < 10 ? `0${num}`:num;
  }
  
  const checkHours = (num) => {
    return num > 12? num - 12: num;
  }

  let hours = checkHours(addZero(today.getHours()));
  let minutes = addZero(today.getMinutes());
  let seconds = addZero(today.getSeconds());
  
  
  let currentDate = `${month}/${date}/${year}`;
  let currentTime = `${hours}:${minutes}:${seconds}`;

  
   return `${currentDate} ${currentTime}`
}

// console.log(displayTime());

module.exports = displayTime;


