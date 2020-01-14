document.addEventListener("DOMContentLoaded", () => {
    const fetchData = async(url, callback) => {
    let url = await axios.get('http://localhost:3000/')  
    }
    const fetchStudents = async(url, callback) => {
        await axios.get('http://localhost:3000/students')  
        }
        console.log("this is a test")
fetchClasses("/classes")

})