let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let port = 3000;
let cors = require('cors');
let School = require('./School');
let Student = require('./Student');

let mySchool = new School();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


mySchool.addClass('WebDev', 'Alejo');
mySchool.addClass('Accounting', 'Chuck');
let jrJang = new Student('jrJang', 1000, 'new york', 95);
mySchool.enrollStudent('WebDev', jrJang);
mySchool.enrollStudent('Accounting', jrJang);


app.use(cors());


const logTime = (req, res, next) => {
	let currentTime = new Date();
	res.locals.timestamp = currentTime;
	next();
}

app.get('/class/:classname/students', logTime, (req, res) => {
	let error = {'error': 'tempstring', timestamp: res.locals.timestamp};
	if(!(req.params.classname in mySchool.classes)){
		error.error = 'Class does not exist';
		res.send(error);
	}
	let failing;
	if(req.query.failing){
		failing = JSON.parse(req.query.failing);
	}
	let city = req.query.city;
	let answer;
	if(failing || city){
		answer = true;
	}
	else{
		answer = false;
	}
	let message = 'Retrieved Students'
	switch(answer){
		case true: res.json({students: mySchool.getStudentsByClassWithFilter(req.params.classname, failing, city), message: message, timestamp: res.locals.timestamp});
		break;
		case false: res.json({students: mySchool.getStudentsByClass(req.params.classname),
			message: message, timestamp: res.locals.timestamp});
		break;
	}
	
})



app.post('/class', logTime, (req, res) => {
	let error = {'error': 'tempstring', timestamp: res.locals.timestamp};
	console.log(req.body);
	let requiredKeys = ['name', 'teacher'];
	if(req.body.name in mySchool.classes){
		error.error = 'Class already exists';
		res.send(error);
	}
	for(let i = 0; i < requiredKeys.length; i++){
		if(!(requiredKeys[i] in req.body)){
			error.error = 'Please include both the name and the teacher to create a new class';
			res.send(error);
		}
	}
	mySchool.addClass(req.body.name, req.body.teacher);
	let response = {'class': mySchool.classes[req.body.name], 'message': 'Created a new class', 'timestamp': res.locals.timestamp  }
	res.send(response);
} )

app.post('/class/:className/enroll', logTime, (req, res) => {
	let error = {'error': 'tempstring', timestamp: res.locals.timestamp};
	let requiredKeys = ['name', 'age', 'city', 'grade'];
	for(let i = 0; i < requiredKeys.length; i++){
		if(!(requiredKeys[i] in req.body)){
			error.error = 'Please include all keys to make a student';
			res.send(error);
		}
	}
	let newStudent = new Student(req.body.name, req.body.age, req.body.city, req.body.grade);
	mySchool.enrollStudent(req.params.className, newStudent);
	console.log(mySchool.classes.Accounting);
	let response = {'student': newStudent, "className": req.params.className,
		"message": "Enrolled Student", "timestamp": res.locals.timestamp};
	res.json(response);

})


app.listen(port, () => {
	console.log('I am the app, and I await your command');
	
})

