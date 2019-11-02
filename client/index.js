/*
Joseph P. Pasaoa
Front-end JS | Express Web Server Project
*/


/* HELPERS */
const log = console.log;

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
    log(response.data);
    return response.data;
  } catch(err) {
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
