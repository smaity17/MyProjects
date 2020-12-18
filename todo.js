let todos = []  //blank todos to get value from local storage

const now = moment()

//Creating a blank search todo variable
const searchTodo = {
    text: "",
    hideCompleted: false
}

const todoJson = localStorage.getItem('todo') //getting previous objects enter by user from local storage

//
if(todoJson !== null){
    todos = JSON.parse(todoJson)
}

//sorting function to arrange by order
const sortingOptions = function(arg){
    arg.sort(function (a, b){
        if(a.activity.toLowerCase() < b.activity.toLowerCase()){
            return -1
        }else if(a.activity.toLowerCase() > b.activity.toLowerCase()){
            return 1
        }else{
            return 0
        }
    })
}

//Defining ewnderTodo function for over all operations
const renderTodo = function(todos, searchTodo){

    //filtering with search key
    let filteredTodos = todos.filter(function(todo){
        return (todo.activity.toLowerCase().includes(searchTodo.text.toLowerCase()))
    })

    //filtering incomplete todos
    const incompleteTodos = filteredTodos.filter(function(todo){
        return !todo.completed
    })

    //clearing the unwanted repeated texts
    document.querySelector('#todo-list').innerHTML = ""

    //Calculating todos left and displaying
    const summary = document.createElement('h3')
    summary.textContent = `You have ${incompleteTodos.length} todos left`
    document.querySelector('#todo-list').appendChild(summary)

    //Displaying todos based on search
    filteredTodos.forEach(function(todo){
        document.querySelector('#todo-list').appendChild(generateTodo(todo))
    })   
}

const removeTodo = function(id){
    const todoIndex = todos.findIndex(function(todo){
        return todo.id === id
    })
    if(todoIndex > -1){
        todos.splice(todoIndex,1)
    }
}

//set todo.completed as true on clicking checkbox
const toggleTodo = function(id){
    const todo = todos.find(function(todo){
        return todo.id === id
    })
    if(todo != undefined){
        todo.completed = !todo.completed
    }
}


//generate todo content
const generateTodo = function(todo){
    const block = document.createElement('div') 
    const checkList = document.createElement('input')
    checkList.setAttribute('type','checkbox')
    checkList.checked = todo.completed
    const content = document.createElement('a')
    content.textContent = todo.activity
    let reminder = document.createElement('span')
    reminder.textContent = todo.time
    const btn = document.createElement('button')
    btn.textContent = 'X'
    btn.setAttribute('class','delete')
    block.appendChild(checkList)
    checkList.addEventListener('change',function () {
        toggleTodo(todo.id)
        localStorage.setItem('todo', JSON.stringify(todos))
        renderTodo(todos, searchTodo)
        })
    content.setAttribute('href',`edit.html#${todo.id}`)
    block.appendChild(content)
    // dislay time color comparing current time
    if(todo.time > now.format('HH:mm')){
        reminder.setAttribute('style','color:green')
    }else{
        reminder.setAttribute('style','color:red') 
    }
    block.appendChild(reminder)
    block.appendChild(btn)
    btn.addEventListener('click', function(){
        removeTodo(todo.id)
        localStorage.setItem('todo', JSON.stringify(todos))
        renderTodo(todos, searchTodo)
    })   
    return block
}


//calling todo first time to display available pre-defined todos, this is not needed if every todos is based on user input
renderTodo(todos, searchTodo)

//updating todo values based on user input
document.querySelector('#manage-todo').addEventListener('submit',function(e){
    e.preventDefault() //prevents default functions
    const id = uuidv4()
    todos.push({ //updating the value in browser
        id: id,
        activity: e.target.elements.todo.value,
        time: '',
        completed: false
    })
    localStorage.setItem('todo', JSON.stringify(todos))
    e.target.elements.todo.value = '' //clearing the field after adding the value
    location.assign(`edit.html#${id}`)
})

//Change background on clicking checkbox
// let x = document.querySelectorAll('.check-todos')
// for (let i=0; i< x.length; i++){
//     x[i].addEventListener('change',function(e){
//         if(e.target.checked){
//             x[i].parentNode.style.backgroundColor = "green"
//         }else{
//             x[i].parentNode.style.backgroundColor = "white"
//         }
//     })
// }


//searching based on keywords
document.querySelector('#search-activity').addEventListener('input',function(e){
    searchTodo.text = e.target.value
    renderTodo(todos, searchTodo)
})

document.querySelector('#arrangement').addEventListener('change', function(e){
    if(e.target.value === 'alphabet'){
        sortingOptions(todos)
        renderTodo(todos, searchTodo)
    }
})












