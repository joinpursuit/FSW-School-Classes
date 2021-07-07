const Class = require('./Class');
const Student = require('./Student')

class School {
  constructor() {
    this.classes = {
      // className: Class Object
      Physics: {
          name: "Physics",
          teacher: "Jon A",
          students: [
            {name: "Jhenya",
            age: 15,
            city: "Brooklyn",
            grade: 98
          },
          {name: "Corey",
            age: 100,
            city: "Brooklyn",
            grade: 19
          },
          {name: "John",
            age: 60,
            city: "queens",
            grade: 60
          }
          ]
        } ,
      Gym: {
          name: "Gym",
          teacher: "Jack",
          students: [
            {name: "Peter",
            age: 17,
            city: "Queens",
            grade: 98
          },
          {name: "William",
            age: 45,
            city: "New York City",
            grade: 34
          },
          {name: "Noel",
            age: 60,
            city: "queens",
            grade: 80
          }
          ]
        } 
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
    this.classes[newClass["name"]] = newClass;
  }

  /**
   * Enroll student in class
   * 
   * @param {string} className - Name of the class
   * @param {Student} student - Student object
   * @return {Student} Enrolled student
   */
  enrollStudent( className , student) {
    let newStudent = new Student(student.name, student.age, student.city, student.grade)
    let studentList = this.classes[className]["students"]

    studentList.push(newStudent)
      
  }




  /**
   * Get all students enrolled in a class
   * 
   * @param {string} className - Name of the class
   * @return {Student[]} Array of Student objects
   */
  getStudentsByClass(className) {

    let students = this.classes[className]["students"]

    return students
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
    let studentList = this.classes[className]["students"]
    let newStudentList = []
    // let list = 

    console.log({className,newStudentList,failing,city,studentList})

    if(failing === "true" && city === "all"){
      studentList.forEach(student =>{
        if(student["grade"] <70){
          newStudentList.push(student)
        }
      })
      
    }else if(failing === "true" && city !== "all"){
      
      studentList.forEach(student =>{
        if(student["grade"] <70  && student["city"].toLowerCase() === city.toLowerCase()){
          newStudentList.push(student)
        }
      })
    } else if(failing === "false" && city !== "all"){
        studentList.forEach(student =>{
          if(student["city"].toLowerCase() === city.toLowerCase()){
            newStudentList.push(student)
          }
        })

    }

    return newStudentList

  }

}

module.exports = School;
