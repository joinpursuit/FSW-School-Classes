const Class = require('./Class');
const Student = require('./Student')

class School {
  constructor() {
    this.classes = {
      Gym: { name: 'Gym', teacher: 'Brandon', students: [] }
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
    let newClass = new Class(name, teacher);
    this.classes[name] = newClass
    // console.log("the new class", this.classes);
    return this.classes;
    

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
      // console.log("student array", this.classes[className].students);
      
      this.classes[className].students.forEach((el) => { //checks to see if student exists
        if(el.name === student.name) {
          foundStudent = true
          console.log("Student already exists");
          this.classes[className].students.pop()  
        }
      }) 
      this.classes[className].students.push(student)
      
      return this.classes[className].students.filter(el => {
        return el.name === student.name
      })
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
      console.log("This class doesnt exist");
      
    } else {
      console.log("students array for entered class", this.classes[className].students)
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
    let filterArr = []
    // let grade = this.classes[className]["students"]["grade"]
    let cityName = this.classes[className]["students"]["city"]

    let student = this.getStudentsByClass(className)
    if(student) {
      if(failing && city){
        return student.filter(el => { return el.grade <= 70 && el.city === city})
      } else if(failing){
        return student.filter(el => {return el.grade <= 70})
       } else if(city){
       return student.filter(el => {return el.city === city})
       } else {
         return student
       }
      }else {
        return student
      }
   } 

    // filterArr = this.classes.filter(el => {
    //   return el["students"]
    // } )
    // if(failing === "true" && city !== ""){
    //   return filterArr.filter(student => {
    //     if(city === student.city && student.grade < 70  ) {
    //       return student
    //     }
    //   })
    // }else if(failing === "true") {
    //   return filterArr.filter(student => {
    //     if(student.grade < 70) {
    //       return student
    //     }
    //   })
    // }else if(city !== ""){
    //   return filterArr.filter(student => {
    //     if(city === student.city) {
    //       return student
    //     }
    //   })
    // }

  // }

}



module.exports = School;
