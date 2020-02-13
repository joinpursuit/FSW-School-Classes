const Student = require("./student");
const Class = require("./Class")




class School {
  constructor() {
    this.classes = [
   
    ]
  }


   addClass(name, teacher) {
    let newClass = new Class(name, teacher);
    this.classes[name] = newClass;
    return newClass
  }


  enrollStudent(student) {
    let newStudent = new Student(student.name, student.city, student.age, student.grade)
    //console.log(className)
    this.classes.push(newStudent)
    return newStudent

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




