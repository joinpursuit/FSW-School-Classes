const Class = require('./Class.js');
const Student = require('./Student.js')

class School {
  constructor() {
    this.classes = {
      // className: Class Object
        physics: {name: "Physics", teacher: "Jon A", students: [{name: "Ashya Manning", age: 17, city: "Brooklyn", grade: 86}, {name: "Danielle Cherry", age: 16, city: "Queens", grade: 67}, {name: "Uduakabasi Abasiurua", age: 15, city: "Central Islip", grade: 70}]},
        english: {name: "English", teacher: "Corey L", students: [{name: "Samantha Jiminez", age: 17, city: "Brooklyn", grade: 92}, {name: "Jay Fowler", age: 18, city: "NYC", grade: 100}, {name: "Maria Martinez", age: 16, city: "Brentwood", grade: 59}]} 
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
    this.name = name;
    this.teacher = teacher;
    this.classes[name] = newClass;
    
    return newClass;
  }

  /**
   * Enroll student in class
   * 
   * @param {string} className - Name of the class
   * @param {Student} student - Student object
   * @return {Student} Enrolled student
   */
  enrollStudent(className, student) {
    let studentArr = this.classes[className]["students"]
    // let {
    //   name,
    //   age,
    //   city,
    //   grade
    // } = student
    
    let newStudent = new Student(student.studentName, student.age, student.city, student.grade);
    studentArr.push(newStudent);

    return newStudent;

  }




  /**
   * Get all students enrolled in a class
   * 
   * @param {string} className - Name of the class
   * @return {Student[]} Array of Student objects
   */
  getStudentsByClass(className) {
    return this.classes[className]["students"];
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
    // let currentClass = this.classes[className];
    // console.log('failing',typeof failing)
    // console.log('failing',failing)

    let studentArr = this.classes[className]['students'];
    let result = [];
    // console.log(mySchool.classes[className]);
    if (failing === 'true' && city) {
      console.log("first city", city)
      studentArr.forEach(student => {
        if (student.grade < 70 && student.city === city) {
          console.log("filtered city", city)
          result.push(student);
          console.log("result", result);
          
        }
        
      })
    } else if (failing === 'false' && city) {
        studentArr.forEach(student => {
          if (student.grade >= 70 && student.city === city) {
            result.push(student);
          }
      })
    } else if (failing === 'true') {
        studentArr.forEach(student => {
          if (student.grade < 70) {
            result.push(student);
          }
        })
    } else if (city) {
      console.log('city',city);
      
        studentArr.forEach(student => {
          if (student.city === city) {
            result.push(student);
          }
        })
    } else {
      studentArr.forEach(student => {
        if (student.grade >= 70) {
          result.push(student)
        }
      })
    }
    console.log('sdfgsdfg',result);
    
    return result
  }

  // getStudentsFailing(className) {
  //   let chosenClass = this.classes[className]['students'];
  //   console.log(chosenClass);
  //   let students = mySchool.chosenClass['students'];
  //   let result = [];
  //   students.forEach(student => {
  //     if (student.grade < 70) {
  //       result.push(student);
  //     }
  //     return result;
  //   })
  // }

  // getStudentsByClassWithFilter()
}

let mySchool = new School();
// console.log(mySchool.getStudentsByClassWithFilter("physics", true, "Queens"))

module.exports = School;

