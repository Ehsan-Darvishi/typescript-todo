import Todo from "./classes/Todo.js";
import UI from "./classes/UI.js";
import Store from "./classes/Store.js";
const form = document.getElementById("todo-form");
const title = document.getElementById("title");
const titleError = document.getElementById('title-error');
const ui = new UI();
form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (title.value.trim() === '') {
        titleError.innerHTML = 'Title id required ...';
    }
    else {
        titleError.innerHTML = '';
        const todoObj = {
            id: Math.round(Math.random() * 100),
            title: title.value.trim(),
            status: false
        };
        const todo = new Todo(todoObj);
        ui.addTodoToList(todo);
        Store.addTodo(todo); //becus is static, dont need to make object fo Store class, We can use the class directly.
        title.value = ''; //for removing input after add task
    }
});
window.changeStatusTodo = (id) => {
    Store.changeStatus(id);
};
window.removeTodo = (e, id) => {
    ui.removeTodo(e, id);
};
document.addEventListener("DOMContentLoaded", Store.displayTodos);
