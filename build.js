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

  /**
   * Enroll student in class
   * 
   * @param {string} className - Name of the class
   * @param {Student} student - Student object
   * @return {Student} Enrolled student
   */
  enrollStudent(className,student) {
     let studentsarr = this.classes[className].students;
     let newStudent = new Student(student,0,"",0);
     studentsarr.push(newStudent);
     console.log(student);
     
  }
}

let andrewJackson = new School();
andrewJackson.addClass("english","jon");
andrewJackson.addClass("math","Danny");
andrewJackson.enrollStudent("math","boe");
console.log(andrewJackson);



