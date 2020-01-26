const Class = require('./Class');
const Student = require('./Student')

class School {
  constructor() {
    this.classes = {
      // className: Class Object
      //   physics: {} 
    }
  }

  /**
   * Add class to classes
   * 
   * @param {string} name - Name of the class
   * @param {string} teacher - Name of instructor 
   * @return {Class} Class object
   */
  addClass(name, teacher) {
    if(!this.classes[name]){
      let newClass = new Class(name, teacher);
      this.classes[name] = newClass;
  
      return this.classes;
    } else {
      console.log("Class already exist")
      return false
    }
   
  }

  /**
   * Enroll student in class
   * 
   * @param {string} className - Name of the class
   * @param {Student} student - Student object
   * @return {Student} Enrolled student
   */
  enrollStudent(className, student) {
    // Your code here
    
    if(!this.classes[className] || student.name === "" || student.age === "" || student.city === ""|| student.grade === ""){
      console.log("Class does not Exist!!")
      return false
    }else {
        this.classes[className].students.forEach(stu => {
          if(stu.name === student.name){
            stu.age = student.age
            stu.city = student.city
            stu.grade = student.grade
            this.classes[className].students.pop()
          }
        });  
  
      this.classes[className].students.push(student)
      console.log(this.classes[className].students);
      return this.classes[className].students
    }
    
    

  }




  /**
   * Get all students enrolled in a class
   * 
   * @param {string} className - Name of the class
   * @return {Student[]} Array of Student objects
   */
  getStudentsByClass(className) {
    // Your code here
    if(!this.classes[className]){
      return false
    } else {
      console.log(this.classes[className].students)
      return this.classes[className].students
    }
    
  }




  /**
   * Get all students and apply filters. If failing = true
   * return all students that are failing the class, 
   * that is all students whose grade is less than 70.
   * If a city is passed return students whose city match
   * the city passed. If both failing and city are passed
   * return students that are failing and that live in the
   * specified city
   * 
   * @param {string} className - Name of the class
   * @param {boolean} failing - Whether to return students that are failing the class or not
   * @param {string} city - Name of the city to match against students
   * @return {Student[]} Array of Student objects
   */
  getStudentsByClassWithFilter(className, failing, city) {
    // Your code here
   let student = this.getStudentsByClass(className)
   if(student){
     if(failing && city){
      return student.filter(stu => { return stu.grade <= 70 && stu.city === city})
    } else if(failing){
      return student.filter(stu => {return stu.grade <= 70})
     } else if(city){
     return student.filter(stu => {return stu.city <= city})
     }
   } else {
     return this.getStudentsByClass(className)
   }
  }

}

// let mySchool = new School();
// mySchool.addClass('physics', 'Henry Roman');

module.exports = School;
