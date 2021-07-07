const School = require('./school')
const Student = require('./student')


let PS95 = new School()

PS95.addClass("Math", "Ms. Brown")

let John = new Student("John Jones", 9, "Jamaica", 95)
let Sue = new Student("Sue Smith", 10, "Forest Hills", 98)
let Bill = new Student("Bill Bob", 6, "Hollis", 65)
let Jill = new Student("Jill Cob", 7, "Hollis", 68)
let Jack = new Student("Jack Inthebox", 8, "Jamaica", 75)
let Matt = new Student("Matt Black", 12, "Jamaica", 55)

PS95.enrollStudent("Math", John)
PS95.enrollStudent("Math", Sue)
PS95.enrollStudent("Math", Bill)
PS95.enrollStudent("Math", Jack)
PS95.enrollStudent("Math", Jill)
PS95.enrollStudent("Math", Matt)


console.log(PS95.getStudentsByClassWithFilter("Math", true, "Jamaica"))


// console.log(John);

