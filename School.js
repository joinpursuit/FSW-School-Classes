const Course = require('./Course').default;
const Student = require('./Student')

class School {
  constructor() {
    this.courses = {
      Art: {
        courseName: "Art",
        teacher: "Ms. Adler",
        students: [
          {name: "Jhenya",
           age: 15,
           city: "Syracuse",
           grade: 98,     
          },
          {name: "Jennifer",
          age: 14,
          city: "Oswego",
          grade: 53
          }
        ]
      },
      
      English: {
      courseName: "English",
      teacher: "Mr. Griffin",
      students: [
        {name: "Carol",
        age: 16,
        city: "Ithaca",
        grade: 99
        },
        {name: "Anna",
        age: 15,
        city: "New York",
        grade: 60
        }
      ]
      },
      
      PE: {
        courseName: "PE",
        teacher: "Ms. Baptista",
        students: [
        {name: "Carol",
        age: 17,
        city: "Buffalo",
        grade: 40
        },
        {name: "Anna",
        age: 15,
        city: "Elmira",
        grade: 90
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
  addCourse(name, teacher) {
    let newCourse = new Course(name, teacher);
    this.courses[name] = newCourse;
  }

  /**
   * Enroll student in class
   * 
   * @param {string} courseName - Name of the class
   * @param {Student} student - Student object
   * @return {Student} Enrolled student
   */
  enrollStudent(courseName, student) {
    let newStudent = new Student(student.name, student.age, student.city, student.grade)
    this.courses[courseName].students.push(newStudent)
  }

  /**
   * Get all students enrolled in a class
   * 
   * @param {string} courseName - Name of the class
   * @return {Student[]} Array of Student objects
   */
  getStudentsByCourse(courseName) {
    return this.courses[courseName].students
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
   * @param {string} courseName - Name of the class
   * @param {boolean} failing - Whether to return students that are failing the class or not
   * @param {string} city - Name of the city to match against students
   * @return {Student[]} Array of Student objects
   */
  getStudentsByCourseWithFilter(courseName, failing, city) {
    if(failing && city){
      return this.getStudentsByCourse(courseName).filter((student)=>{
        return student.grade < 70 && student.city === city
      })
    } else if(failing){
      return this.getStudentsByCourse(courseName).filter((student)=>{
        return student.grade < 70
      })
    } else if(city){
      return this.getStudentsByCourse(courseName).filter((student)=>{
        return student.city === city
      })
    }
  }
}

module.exports = School;
