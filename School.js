const Class = require('./Class');
const Student = require('./Student')

class School {
  constructor() {
    this.classes = {
          physics: {
          name: "Physics",
          teacher: "Jon A",
          students: [
            {name: "Jhenya",
            age: 14,
            city: "Brooklyn",
            grade: 98
            }
          ]
        } 
    }
  }
  addClassToClasses(name,teacher){
    this.addClass(name,teacher);
    return this.classes[name]
  }
  addClass(name, teacher) {
    let newClass = new Class(name, teacher);
    this.classes[name] = newClass;
    return this.classes[name]
  }

  enrollStudent(className,student,age,city) {
    let studentsarr = this.classes[className].students;
    let newStudent = new Student(student,age,city,"N/A");
    studentsarr.push(newStudent);
    return newStudent;
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


module.exports = mySchool;
