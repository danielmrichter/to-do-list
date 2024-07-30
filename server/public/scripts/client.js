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
        renderToDoItems(response.data)
    }).catch((error) => {
        console.log(`Oopsie Woopsie! Error in GET route!`, error)
    })
}
//make a post route
function postToDoForm(e) {
    e.preventDefault()
    let yourDate = new Date()
    const offset = yourDate.getTimezoneOffset()
    yourDate = new Date(yourDate.getTime() - (offset*60*1000))
    let convertedDate = yourDate.toISOString().split('T')[0]
    // console.log(`postToDoForm recieved a request!`)
    let itemToPost = {
        text: document.getElementById(`toDoFormText`).value,
        date: convertedDate
    }
    axios({
        method: `POST`,
        url: `/todos`,
        data: itemToPost
    }).then((response) => {
        document.getElementById(`toDoFormText`).value = ``
        getItemsToDo()
    }).catch((error) => {
        console.log(`Oopsie! Recieved an error in the POST/todos!`, error)
    })
    //
}
//make a patch route
function toggleCompleted(status, itemId) {
    // console.log(`ToggleCompleted recieved a request!`, status, itemId)
    axios({
        method: 'PATCH',
        url: `/todos`,
        data: { status: status, itemId: itemId }
    }).then((response) => {
        console.log(`Patch complete!`)
        getItemsToDo()
    }).catch((error) => {
        console.log(`Oopsie Woopsie! We had a fucky wuppy in the PATCH/todos!`, error)
    })
}
//make a delete route
function deleteItemToDo(itemId) {
    // console.log(`Deleting item ${itemId}!`)
    axios({
        method: `DELETE`,
        url: `/todos/${itemId}`,
    }).then((response) => {
        getItemsToDo()
    }).catch((error) => {
        console.log(`You dun goofed now A-ARON. Error in POST/todos:`, error)
    })
}
//render helper function:
function renderToDoItems(toDoItems) {
    document.getElementById(`toDoListTable`).innerHTML = ``
    for (let item of toDoItems) {
        let date = item.date.split(`T`)[0]
        let completeStatus
        item.isComplete ? completeStatus = 'Completed!' : completeStatus = 'Incomplete'
        document.getElementById(`toDoListTable`).innerHTML += `
        <tr data-testid="toDoItem" class="${item.isComplete ? 'completed' : 'incomplete'}">
        <td>${date}</td>
        <td contenteditable="true" id="item${item.id}" onblur="updateItemToDo(${item.id})">${item.text}</td>
        <td class="buttonColumn"><button data-testid="completeButton" class="btn btn-primary" onClick="toggleCompleted('${completeStatus}', ${item.id})">${completeStatus}</button>
        <button data-testid="deleteButton" class="btn btn-danger" onClick="deleteItemToDo(${item.id})">Delete</button></td>
        </tr>`
    }
}
function updateItemToDo(itemId){
    let changedItemToSend = document.getElementById(`item${itemId}`).innerText
    axios({
        method: `PUT`,
        url: `/todos/${itemId}`,
        data: {changedItem : changedItemToSend}
    }).then((response) =>{
        getItemsToDo()
    }).catch((error) =>{
        console.log(`Your PUT/todos/:itemId Broke! Haha! `, error)
    })
}



onReady()