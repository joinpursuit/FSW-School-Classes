const Class = require('./Class');
const Student = require('./Student')

class School {
  constructor() {
    this.classes = {
      physics:{
        name:"Physics",
        teacher:"Mr.Winks",
        students:[]
      }
    }
  }

  addClass(name, teacher) {
    let newClass = new Class(name, teacher);
    this.classes[name] = newClass;
    return newClass
  }

  enrollStudent(className, student) {
   let newStudent = new Student (student.name, student.age, student.city, student.grade)
   this.classes[className]["students"].push(newStudent)
   return newStudent
  }

  getStudentsByClass(className) {
    return this.classes[className]["students"]
  }

  getStudentsByClassWithFilter(className, failing = false, city = "") {
    let students = this.classes[className]["students"]
    if(failing === true && city){
      return students.filter((stu) => {
        return (stu.grade < 70) && (stu.city.toLowerCase()) === city.toLowerCase()
      })
    }else if (failing){
      return students.filter((stu) => {
        return stu.grade < 70
      })
    }
  }   

}

module.exports = School;
