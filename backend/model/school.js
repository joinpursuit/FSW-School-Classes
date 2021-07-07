const Student = require("./student");
const Class = require("./Class")




class School {
  constructor() {
    this.classes ={
      
    }
   
    
  }


   addClass(name, teacher) {
    let newClass = new Class(name, teacher);
    this.classes[name] = newClass;
    return newClass
  }


  enrollStudent(className, student) {
    let newStudent = new Student(student.name, student.age, student.city, student.grade)
    if(this.classes[className]){
      let enroll = this.classes[className]
      enroll.students.push(newStudent)
    }
    let allStudents = this.classes[className]["students"]
    allStudents.push(newStudent)
  }


  getStudentsByClass(className) {
    return this.class[className]["students"]
  }


  getStudentsByClassWithFilter(className, failing, city = "") {
    
    let presentClass = this.class[className]["student"]
    if(failing === true && city){
      presentClass.filter(stud=>{
        return stud.city === city
      })
    } else if(failing === true){
      presentClass.filter(stud =>{
        return stud.grade
      })
   }
  }
}
module.exports = School




