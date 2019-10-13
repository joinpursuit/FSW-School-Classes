let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let port = 3000;
let cors = require('cors');
let School = require('./School');
let Student = require('./Student');

let mySchool = new School();

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

mySchool.addClass('WebDev', 'Alejo');
mySchool.addClass('Accounting', 'Chuck');
let jrJang = new Student('jrJang', 1000, 'new york');
mySchool.enrollStudent([{'class': 'WebDev', 'grade': 69}, {'class': 'Accounting', 'grade': 100}], jrJang);



app.use(cors());

app.post('/class', (req, res) => {

} )


app.listen(port, () => {
	console.log('I am the app, and I await your command');
	console.log(mySchool.getStudentsByClassWithFilter('WebDev', false));
})

