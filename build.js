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

let andrewJackson = new School();
andrewJackson.addClass("english","jon");
andrewJackson.addClass("math","Danny");
andrewJackson.enrollStudent("math","boe");
andrewJackson.enrollStudent("math","joe");
// console.log(andrewJackson.getStudentsByClass("math"));
console.log(andrewJackson.getStudentsByClassWithFilter("math",false,"ny"))
// console.log(andrewJackson);



// let arr = [
//     {class: "math",name:"danny",grade:70,city:"Ny"},
//     {class: "math",name:"jon",grade:70,city:"Ny"}
// ];

// let arr2 = ["danny","danny","mike"];

// const filter = (arr) => {
//     return arr.filter(el => {
//      if (el === "danny"){
//          return el
//      }
//     })
// }

// console.log(filter(arr2));


