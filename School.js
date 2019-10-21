const Class = require('./Class');
const Student = require('./Student')

class School {
  constructor() {
    this.classes = {

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
    // console.log("classes", this.classes[name].name)

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
    let studentsArray = this.classes[className].students;
    let {
      name,
      age,
      city,
      grade
    } = student
    let newStudent = new Student(name, age, city, grade);

    studentsArray.push(student)
    // console.log("classes", this.classes[className])

    return newStudent;
  }




  /**
   * Get all students enrolled in a class
   * 
   * @param {string} className - Name of the class
   * @return {Student[]} Array of Student objects
   */
  getStudentsByClass(className) {
    let arr = this.classes[className].students

    const dupes = {};
    const out = [];

    for (let i = 0; i < arr.length; i++) {
      let key = arr[i].name
      if (!dupes[key]) {
        out.push(arr[i])
      }
      dupes[key] = true
    }
    return out
    return arr
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
    this.name = this.classes[className];

    let fail = [];
    this.failing = failing;
    let studentArr = this.classes[className].students;
    console.log("hi", this.failing)

    if (this.failing) {
      let filtered = studentArr.filter(el => {
        console.log("el grade", typeof el.grade)
        if (el.grade < 70) {
          fail.push(el)
        }
      })
    }


    return fail
  }


}

module.exports = School;