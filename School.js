const Class = require('./Class');
const Student = require('./Student')

class School {
  constructor() {
    this.classes = {
      biology: {
        name: "Biology", 
        teacher: "Sky s", 
        students: [{
          name: "Danielle",
          age: 15,
          city: "Brooklyn",
          grade: 100
        },
        {
          name: "Christina",
          age: 15,
          city: "Manhattan",
          grade: 79
        },
        {
          name: "Ashely",
          age: 14,
          city: "Queens",
          grade: 88
        },
        {
          name: "Shayna",
          age: 14,
          city: "Brooklyn",
          grade: 90
        },
        {
          name: "Zaria",
          age: 15,
          city: "Manhattan",
          grade: 89
        }
      ]
      },
      philosphy: {
          name: "Philosphy", 
          teacher: "Herdella C", 
          students: [{
            name: "Udakabasi",
            age: 13,
            city: "Brooklyn",
            grade: 98
          },
          {
            name: "Kayla",
            age: 13,
            city: "Bronx",
            grade: 47
          },
          {
            name: "Kaiden",
            age: 14,
            city: "Queens",
            grade: 100
          },
          {
            name: "Marcus",
            age: 14,
            city: "Bronx",
            grade: 92
          }
      ]
      },
      mathematics: {
        name: "Mathematics",
        teacher: "Deshawnta",
        students: [{
          name: "Shanna",
          age: 15,
          city: "Queens",
          grade: 99
        },
        {
          name: "David",
          age: 14,
          city: "Brooklyn",
          grade: 78
        },
        {
          name: "Mike",
          age: 15,
          city: "Queens",
          grade: 66
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
    this.classes[name] = newClass;

  }

  /**
   * Enroll student in class
   * 
   * @param {string} className - Name of the class
   * @param {Student} student - Student object
   * @return {Student} Enrolled student
   */
  // enrollStudent(className, student) {
  //   let newStudent = new Student(name, age, city, grade);
  //   this.enrolledStudent = 
  // }




  /**
   * Get all students enrolled in a class
   * 
   * @param {string} className - Name of the class
   * @return {Student[]} Array of Student objects
   */
  getStudentsByClass(className) {
    // Your code here
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
  }

}

let mySchool = new School()

module.exports = mySchool;
