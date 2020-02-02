const Class = require('./Class');
const Student = require('./Student')

class School {
  constructor() {
    this.classes = {
      // className: Class Object
        physics: {
          name: "Physics",
          teacher: "Jon A",
          students: [
            {
            name: "Sihame B",
            age: 15,
            city: "Queens",
            grade: 100
            },
            {name: "Jhenya E",
            age: 14,
            city: "Brooklyn",
            grade: 98
             },
             {
              name: "Ben F",
              age: 15,
              city: "Queens",
              grade: 64
             },
             {
              name: "Jess T",
              age: 15,
              city: "Queens",
              grade: 61
             }
            ]
         },
        biology: {
          name: "Biology",
          teacher: "Sam Markson",
          students: [
            {
            name: "Max R",
            age: 15,
            city: "Brooklyn",
            grade: 64
            },
            {name: "Alex E",
            age: 14,
            city: "Brooklyn",
            grade: 89
             },
             {
              name: "Ben R",
              age: 14,
              city: "LIC",
              grade: 63
             },
             {
              name: "Lola V",
              age: 15,
              city: "LIC",
              grade: 87
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
    return newClass
  }


  /**
   * Enroll student in class
   * 
   * @param {string} className - Name of the class
   * @param {Student} student - Student object
   * @return {Student} Enrolled student
   */
  enrollStudent(className, student) {
    console.log('classname...', className)
    console.log('student...', student)
    // Your code here
     let newStudent = new Student(student.name, student.age, student.city, student.grade)
    //return this.Classes[className].students.push(newStudent)
    if(this.classes[className].students[student.name]){
      return "This student is already enrolled in this class"
    }else{
      this.classes[className].students.push(newStudent);
      return newStudent
      
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
    return this.classes[className].students
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
    let arrayStudent = this.classes[className].students.filter(student => {
   console.log(this.classes[className])
      if (failing === "true" && city !== "") {
        if (city === student.city)
        if (student.grade < 70)
        return student
      }
      else if (failing === "true") {
        if (student.grade < 70)
          return student

      }
      else if (city == student.city) {
        return student
      }
    })

    return arrayStudent
  }
}

module.exports = School;
