/*
Joseph P. Pasaoa
Front-end JS | Express Web Server Project
*/


/* TODO
    raw data button
    press Enter to submit on inputs
*/


/* HELPERS */
const log = console.log;

const navSwitch = async (num) => { // Nav Buttons & Form Switcher
  const form1 = document.querySelector('#form1pack');
  const form2 = document.querySelector('#form2pack');
  const form3 = document.querySelector('#form3pack');
  const form4 = document.querySelector('#form4pack');
  const indices = [form1, form1, form2, form3, form4];
  const navBox = document.querySelector('#nav');
  for (let i = 1; i <= 4; i++) {
    if (i === num) {
      if (num === 4) {
        const received = await serverComm("get", "school");
        showResponse(received);
        navBox.children[i - 1].style.color = "white";
        navBox.children[i - 1].style.backgroundColor = "#b12f12";
      } else {
        navBox.children[i - 1].style.color = "white";
        navBox.children[i - 1].style.backgroundColor = "darkorange";
      }
        indices[i].style.zIndex = 200;
        setTimeout(() => {
          indices[i].style.opacity = 1;
        }, 0);
    } else {
      navBox.children[i - 1].style.color = null;
      navBox.children[i - 1].style.backgroundColor = null;
      indices[i].style.zIndex = null;
      indices[i].style.opacity = null;
    }
  }
}

const clearStage = () => {
  const stage = document.querySelector(`#response`);
  while (stage.firstChild) {
    stage.removeChild(stage.lastChild);
  }
}

const serverComm = async (method, urlAdds, body) => {
  const url = `http://localhost:11000/${urlAdds}`;
  try {
    const response = await axios[method](url, body);
    return response.data;
  } catch (err) {
    log("client-side error: ", err);
  }
}

const showResponse = (result) => {
  clearStage();

  const stage = document.querySelector(`#response`);
  setTimeout(() => { // gives more natural delay to displaying response
      stage.innerHTML = JSON.stringify(result, null, 3);
  }, 125);
}


/* POST DOM LOAD EXECS */
document.addEventListener("DOMContentLoaded", () => {
    navSwitch(1);
    document.querySelector('#nav').addEventListener("click", (e) => {
        if (e.target.id === "btnAddClass") {
          navSwitch(1);
        }
        if (e.target.id === "btnAddStudent") {
          navSwitch(2);
        }
        if (e.target.id === "btnListStudents") {
          navSwitch(3);
        }
        if (e.target.id === "btnSchool") {
          navSwitch(4);
        }
    });
    document.querySelector('#buttonForm1').addEventListener("click", async (e) => {
        const classEntry = e.target.parentNode[0].value.trim();
        const teacherEntry = e.target.parentNode[1].value.trim();
        const body = {
          className: classEntry,
          teacherName: teacherEntry
        };
        const received = await serverComm("post", "class", body);
        showResponse(received);
    });
    document.querySelector('#buttonForm2').addEventListener("click", async (e) => {
        const classEntry = e.target.parentNode[0].value.trim();
        const nameEntry = e.target.parentNode[1].value.trim();
        const ssnEntry = e.target.parentNode[2].value.trim();
        const ageEntry = e.target.parentNode[3].value.trim();
        const cityEntry = e.target.parentNode[4].value.trim();
        const gradeEntry = e.target.parentNode[5].value.trim();
        const body = {
          className: classEntry,
          name: nameEntry,
          age: ageEntry,
          city: cityEntry,
          grade: gradeEntry,
          ssn: ssnEntry
        };
        const received = await serverComm("post", `class/${classEntry.trim()}/enroll`, body);
        showResponse(received);
    });
    document.querySelector('#buttonForm3').addEventListener("click", async (e) => {
        const classEntry = e.target.parentNode[0].value.trim();
        let cityEntry = null;
        if (e.target.parentNode[1].value.trim() !== "") {
          cityEntry = 'city=' + e.target.parentNode[1].value.trim()
        }
        let failingEntry = null;
        if (e.target.parentNode[2].checked !== true) {
          failingEntry = 'failing=' + document.querySelector('input[name="failing"]:checked').value;
        };
        let queryString = '';
        if (failingEntry || cityEntry) {
          queryString += '?';
          if (failingEntry && cityEntry) {
            queryString += `${failingEntry}&${cityEntry}`;
          } else {
            queryString += failingEntry ? failingEntry : cityEntry;
          }
        }
        const received = await serverComm("get", `class/${classEntry}/students${queryString}`);
        showResponse(received);
    });
});
