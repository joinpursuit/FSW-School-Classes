document.addEventListener("DOMContentLoaded", async () => {
    let showClasses = document.querySelector("#showClasses");

    let res = await axios.get("http:/localhost:3000/class");
    let data = res.data;

    if(data.error) {
        let error = document.createElement("p");
        error.innerText = data.error;
        showClasses.appendChild(error);
    } else {
        let {classes} = data;
        classes.forEach(foundClass => {
            let foundClassInfo = document.createElement("p");
            foundClassInfo.innerHTML = `<b>ID</b>: ${foundClass.id} <b>Name</b>: ${foundClass.class_name} <b>Teacher</b>: ${foundClass.first_name} ${foundClass.last_name}`;
            showClasses.appendChild(foundClassInfo);
        })
    }
})