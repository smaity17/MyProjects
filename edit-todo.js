const todoId = location.hash.substring(1)
let todos = JSON.parse(localStorage.getItem('todo'))
let todo = todos.find(function(todo){
    return todo.id === todoId
})
document.querySelector('#task-todo').value = todo.activity
document.querySelector('#reminder').value = todo.time
document.querySelector('#edit-todo').addEventListener('submit',function(e){
    e.preventDefault()
    todo.activity = e.target.elements.title.value
    todo.time = e.target.elements.time.value
    e.target.elements.title.value = ''
    e.target.elements.time.value = ''
    localStorage.setItem('todo',JSON.stringify(todos))
    location.assign("index.html")
})

//Syncing data through multiple tab
window.addEventListener('storage', function(e){
    if(e.key === 'todo'){
        todos = JSON.parse(localStorage.getItem(e.newValue))
        document.querySelector('#task-todo').value = todo.activity
        document.querySelector('#reminder').value = todo.time
    }
})

