document.addEventListener('DOMContentLoaded', () => {
    let addForm = document.querySelector('#addClass')

})


const loadAddClassData = async () => {
    let className = document.querySelector('#className')
    let teacher = document.querySelector('#teacher')

    let url = `http://localhox8000/class?name=${className}&teacher=${teacher}`
    const {
        data
    } = await axios.get(url);

    return data
}

const addingClass = () => {

}