let myAPI = 'http://localhost:3000';

document.addEventListener('DOMContentLoaded', () => {
	let form1Button = document.querySelector('#create-class-button');
	let form2Button = document.querySelector('#enroll-student-button');
	let form3Button = document.querySelector('#student-search-button');
	form1Button.addEventListener('click', createNewClass);
	form2Button.addEventListener('click', enrollStudent);
	form3Button.addEventListener('click', filterSearch)

})

const createNewClass = async () => {
	let teacherClass = document.querySelector('#teacherClass').value;
	document.querySelector('#teacherClass').value = '';
	let teacher = document.querySelector('#teacher').value;
	document.querySelector('#teacher').value = '';
	let response =  await axios.post(`${myAPI}/class`, {name: teacherClass, teacher: teacher});
	let message = document.createElement('p');
	console.log(response);
	let responseBoard = document.querySelector('.responseBoard');
	while(responseBoard.firstChild){
		responseBoard.removeChild(responseBoard.firstChild);
	};
	if(response.data.error){
		message.innerText = response.data.error;
	}
	else{
		message.innerText = response.data.message;
	}
	responseBoard.appendChild(message);
}

const enrollStudent = async () => {
	let studentClass = document.querySelector('#studentClass').value;
	document.querySelector('#studentClass').value = '';
	let student = document.querySelector('#student').value;
	document.querySelector('#student').value = '';
	let age = document.querySelector('#age').value;
	document.querySelector('#age').value = '';
	let city = document.querySelector('#city').value;
	document.querySelector('#city').value = '';
	let grade = document.querySelector('#grade').value;
	document.querySelector('#grade').value = '';
	let response =  await axios.post(`${myAPI}/class/${studentClass}/enroll`, {name: student, age: age, city: city, grade: grade});
	let message = document.createElement('p');
	console.log(response);
	let responseBoard = document.querySelector('.responseBoard');
	while(responseBoard.firstChild){
		responseBoard.removeChild(responseBoard.firstChild);
	};
	if(response.data.error){
		message.innerText = response.data.error;
	}
	else{
		message.innerText = response.data.message;
	}
	responseBoard.appendChild(message);
}

const filterSearch = async () => {
	let makeAQueryString = false;
	let classSearch = document.querySelector('#class-search').value;
	document.querySelector('#class-search').value = '';
	let citySearch = document.querySelector('#city-search').value;
	document.querySelector('#city-search').value = '';
	if(!(citySearch === '')){
		citySearch = `city=${citySearch}`;
		makeAQueryString = true;
	}
	let failure;
	let failQuery;
	try{
		failure = document.querySelector('#failure:checked').checked;
		failQuery = 'failing=true';
		makeAQueryString = true;
	}
	catch(err){
		failQuery = 'failing=false';
	}
	
	let urlToSend = `${myAPI}/class/${classSearch}/students`;
	if(makeAQueryString){
		urlToSend += `?${failQuery}&${citySearch}`;
	}
	let response =  await axios.get(urlToSend);
	let message = document.createElement('p');
	console.log(response);
	let responseBoard = document.querySelector('.responseBoard');
	while(responseBoard.firstChild){
		responseBoard.removeChild(responseBoard.firstChild);
	};
	let list = document.createElement('ul')
	if(response.data.error){
		message.innerText = response.data.error;
		responseBoard.appendChild(message);
	}
	else{
		for(let i = 0; i < response.data.students.length; i++){
			let temp = document.createElement('li');
			temp.innerText = response.data.students[i].name;
			list.appendChild(temp);
		}
	}
	responseBoard.appendChild(list);
}