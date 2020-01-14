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

  /**
   * Get all students enrolled in a class
   * 
   * @param {string} className - Name of the class
   * @return {Student[]} Array of Student objects
   */
  getStudentsByClass(className) {
    return this.classes[className].students
  }

}

let andrewJackson = new School();
andrewJackson.addClass("english","jon");
andrewJackson.addClass("math","Danny");
andrewJackson.enrollStudent("math","boe");
andrewJackson.enrollStudent("math","joe");
console.log(andrewJackson.getStudentsByClass("math"));
// console.log(andrewJackson);



