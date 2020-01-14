const Class = require('./Class');
const Student = require('./Student')

class School {
  constructor() {
    this.classes = {
      
    }
  }
  addClassToClasses(name,teacher){
    this.addClass(name,teacher);
    return this.classes[name]
  }
  addClass(name, teacher) {
    let newClass = new Class(name, teacher);
    this.classes[name] = newClass;
  }

  enrollStudent(className,student) {
    let studentsarr = this.classes[className].students;
    let newStudent = new Student(student,0,"Ny",0);
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

let mySchool = new School();
mySchool.addClassToClasses()









module.exports = School;
