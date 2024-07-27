function onReady() {
    console.log('JS is sourced!');
    getItemsToDo()
}
//make a get route
function getItemsToDo() {
    // console.log(`in getItemsToDo! Let's get some items!`)
    axios({
        method: `GET`,
        url: `/todos`
    }).then((response) => {
        // console.log(`Got something back in my GET /todos!`, response)
        document.getElementById(`toDoListTable`).innerHTML = ``
        for (let item of response.data) {
            if(item.isComplete){
            document.getElementById(`toDoListTable`).innerHTML += `
            <tr data-testid="toDoItem" class="completed">
            <td>${item.text}
            <button data-testid="completeButton" onClick="toggleCompleted('complete', ${item.id})">Completed!</button>
            <button data-testid="deleteButton" onClick="deleteItemToDo(${item.id})">Delete</button></td>
            </tr>`
        } else{
            document.getElementById(`toDoListTable`).innerHTML += `
            <tr data-testid="toDoItem" class="incomplete">
            <td>${item.text}
            <button data-testid="completeButton" onClick="toggleCompleted('incomplete', ${item.id})">Incomplete</button>
            <button data-testid="deleteButton" onClick="deleteItemToDo(${item.id})">Delete</button></td>
            </tr>`
        }
        }
    }).catch((error) => {
        console.log(`Oopsie Woopsie! Error in GET route!`, error)
    })
}
//make a post route
function postToDoForm(e) {
    e.preventDefault()
    // console.log(`postToDoForm recieved a request!`)
    let itemToPost = document.getElementById(`toDoFormText`).value
    axios({
        method: `POST`,
        url: `/todos`,
        data: { text: itemToPost }
    }).then((response) => {
        document.getElementById(`toDoFormText`).value = ``
        getItemsToDo()
    }).catch((error) => {
        console.log(`Oopsie! Recieved an error in the POST/todos!`, error)
    })
    //
}
//make a patch route
function toggleCompleted(status, itemId){
    // console.log(`ToggleCompleted recieved a request!`, status, itemId)
    axios({
        method: 'PATCH',
        url: `/todos`,
        data: {status: status, itemId: itemId}
    }).then((response) =>{
        console.log(`Patch complete!`)
        getItemsToDo()
    }).catch((error) =>{
        console.log(`Oopsie Woopsie! We had a fucky wuppy in the PATCH/todos!`, error)
    })
}
//make a delete route
function deleteItemToDo(itemId){
    // console.log(`Deleting item ${itemId}!`)
    axios({
        method: `DELETE`,
        url: `/todos/${itemId}`,
    }).then((response) =>{
        getItemsToDo()
    }).catch((error) =>{
        console.log(`You dun goofed now A-ARON. Error in POST/todos:`, error)
    })
}


onReady()