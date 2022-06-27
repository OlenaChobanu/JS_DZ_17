const todo = new Todos();

const inpTodoTitleE = document.querySelector('.inp-todo-title');
const inpTodoBodyE = document.querySelector('.inp-todo-body');
const btnAddTodoE = document.querySelector('.btn-add-todo');

const inpChangeTodoTitleE = document.querySelector('.inp-change-todo-title');
const inpChangeTodoBodyE = document.querySelector('.inp-change-todo-body');
const btnSaveChangesE = document.querySelector('.btn-save-changes');

const todoContE = document.querySelector('.todos-cont');
const changeTodoContE = document.querySelector('.change-todo');

btnAddTodoE.addEventListener('click', onAddTodo);
btnSaveChangesE.addEventListener('click', onSaveChanges);
todoContE.addEventListener('click', onTodosClick);

let todos = [];
let currentId = '';
let currentData = getCurrentDate(); 

let newTodo = {
    title: '',
    body: '',
    isComplete: '',
}

function getCurrentDate() {
    let current = new Date();
    let year = current.getFullYear();
    let month = current.getMonth() + 1;
    if (month < 10) month = '0' + month;
    let date = current.getDate();
    if (date < 10) date = '0' + date;
    return date +'.'+ month +'.'+ year;
}

readTodos();

function readTodos(){
    todo.getTodos().then(r => {
        todos = r.splice(0, 40);
        renderTodos(todos);
    });
}

function onAddTodo(newTodo) {
    newTodo = {
        title: inpTodoTitleE.value,
        body: inpTodoBodyE.value,
        isComplete: false,
    }
   
    todo.createTodos(newTodo)
        .then(result => result.json())
        .then(data => {
            todos.push(data);
            renderTodos(todos);
        })
    
    clearValue (inpTodoTitleE);
    clearValue (inpTodoBodyE);
    inpTodoTitleE.focus();
}

function onTodosClick(e) {
    if (e.target.tagName == 'UL') {
        currentId = e.target.id;
    } else {
        currentId = e.target.closest('UL').id;
    }

    if(e.target.classList.contains('btn-delete')) {
        onDeleteTodo(currentId);
    } else if(e.target.classList.contains('btn-complete')) {
        onCompleteTodo(currentId);
    } else {
        changeTodoContE.classList.remove('change-todo');
    }
}

function onSaveChanges() {
    newTodo = {
        title: inpChangeTodoTitleE.value,
        body: inpChangeTodoBodyE.value,
        isComplete: 'false',
        createDate: '',
        completeDate: 'null',
        id: currentId,
    }

    todo.updateTodos(newTodo, newTodo.id)
        .then(result => result.json())
        .then(data => readTodos(todos))

    clearValue(inpChangeTodoTitleE);
    clearValue(inpChangeTodoBodyE);
    changeTodoContE.classList.add('change-todo');
}

function renderTodos(data) {
    todoContE.innerHTML = '';
    
    let todoClass = '';
    let disabled = '';

    data.map(e => {
        if(e.isComplete == true) {
            todoClass = 'single-todo completed-todo';
            disabled = 'disabled';
            renderElement(createElement(e, todoClass, disabled), todoContE)
        } else {
            todoClass = 'single-todo';
            disabled = '';
            renderElement(createElement(e, todoClass, disabled), todoContE)
        }
    })
}

function createElement(e, todoClass, disabled) {
    const element = `<ul id=${e.id} class="${todoClass}">
                    <button type="button" class="btn-delete" name="delete">x</button>
                    <li>title: ${e.title}</li>
                    <li>body: ${e.body}</li>
                    <li>createDate: ${e.createDate}</li>
                    <li>completeDate: ${e.completeDate}</li>
                    <li>isComplete: ${e.isComplete}</li>
                    <button type="button" class="btn btn-complete" name="complete" ${disabled}>Complete</button>
                    </ul>`
    return element;
}

function renderElement(element, container) {
    container.innerHTML += element;
}

function onCompleteTodo(currentId) {
    const completedTodo = todos.find(element => element.id == currentId);
    completedTodo.isComplete = 'true';
    completedTodo.completeDate = currentData;

    todo.updateTodos(completedTodo, currentId)
        .then(result => result.json())
            .then(data => readTodos(todos))
}

function onDeleteTodo(currentId) {
    todo.deleteTodos(currentId)
        .then(result => {
            if(result.acknowledged = 'true') {
                readTodos(todos);
            }
        })
}

function clearValue(inp) {
    inp.value = ''
}