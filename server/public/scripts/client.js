function onReady(){
    console.log('JS is sourced!');
    getItemsToDo()
}
//make a get route
function getItemsToDo(){
    console.log(`in getItemsToDo! Let's get some items!`)
    axios({
        method: `GET`,
        url: `/todos`
    }).then((response) =>{
        console.log(`Got something back in my GET /todos!`, response)
        document.getElementById(`toDoListTable`).innerHTML = ``
        for(let item of response.data){
            document.getElementById(`toDoListTable`).innerHTML += `
            <td data-testid="toDoItem">${item.text}</td>
            <td>Completion status(tobe implemented haha)</td>`
        }
    }).catch((error) =>{
    console.log(`Oopsie Woopsie! Error in GET route!`, error)
    })
}

//make a post route
function postToDoForm(e){
    e.preventDefault()
    console.log(`postToDoForm recieved a request!`)
    let itemToPost = document.getElementById(`toDoFormText`).value
    axios({
        method: `POST`,
        url: `/todos`,
        data: {text: itemToPost}
    }).then((response) =>{
        document.getElementById(`toDoFormText`).value = ``
        getItemsToDo()
    }).catch((error) =>{
        console.log(`Oopsie! Recieved an error in the POST/todos!`, error)
    })
    //
}
//make a patch route
//make a delete route



onReady()