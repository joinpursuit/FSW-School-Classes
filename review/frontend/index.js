
let ul = document.querySelector("ul")

const getAllCars = async () => {
    try {
        let res = await axios.get("http://localhost:3002/cars")
        //res = promise 
        


    } catch (err) {
        console.log(err)
}

}