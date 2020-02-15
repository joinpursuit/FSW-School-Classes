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

  getStudentsByClassWithFilter(className, failing, city) {
    let filterArr = [];
    let studentArray = this.classes[`${className}`]["students"]
    if(failing === 'true' && city != ""){
      for(let i = 0; i < studentArray.length; i++){
        if(studentArray[i]["city"] === city && studentArray[i]["grade"] < 70){
          filterArr.push(studentArray[i]);
        }
      }
    } else if(failing === 'true' && city === ""){
      for(let i = 0; i < studentArray.length; i++){
        if(studentArray[i]["grade"] < 70){
          filterArr.push(studentArray[i])
          }
        }
    } else if(failing != 'true' && city != "") {
      for(let i = 0; i < studentArray.length; i++){
        if(studentArray[i]["city"] === city){
          filterArr.push(studentArray[i])
        }
      }
    }
    return filterArr
  }

}

module.exports = School;
