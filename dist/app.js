"use strict";
class Todo {
    constructor(todo) {
        this.id = todo.id;
        this.title = todo.title;
        this.status = todo.status;
    }
}
class UI {
    addTodoToList(todo) {
        const list = document.getElementById("todo-list");
        const tr = document.createElement('tr');
        tr.innerHTML = `
                        <th>${todo.id}</th>
                        <td>${todo.title}</td>
                        <td><input type="checkbox" ${todo.status ? 'checked' : ''} class="form-check-input"></td>
                        <td><button class="btn btn-sm btn-outline-danger" onclick="ui.removeTodo(event)">Delete</button></td>
                        `;
        list.appendChild(tr);
    }
    removeTodo(e) {
        const element = e.target;
        const pElement = element.parentElement;
        const sElemrnt = pElement === null || pElement === void 0 ? void 0 : pElement.parentElement;
        sElemrnt.innerHTML = ``;
        //in element we get <button> tag,
        //in pElement we get <td> tag,<td> tag is <button> parentElement
        //and in sElement we get <tr> tag
        //and in sElement.innerHTML =''; we replace <tr> tag with ''
    }
}
class Store {
    static getTodo() {
        let todos;
        if (localStorage.getItem('todos')) {
            todos = JSON.parse(localStorage.getItem('todos'));
            //We assure TypeScript that this variable has a value and is not empty or
            //we can write as string instead of !
        }
        else {
            todos = [];
        }
        return todos;
    }
    static displayTodos() {
        const todos = Store.getTodo();
        const ui = new UI();
        todos.forEach((todo) => {
            ui.addTodoToList(todo);
        });
    }
    static addTodo(todo) {
        const todos = Store.getTodo();
        todos.push(todo);
        localStorage.setItem('todos', JSON.stringify(todos));
    }
}
const ui = new UI();
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("todo-form");
    const title = document.getElementById("title");
    const titleError = document.getElementById('title-error');
    Store.displayTodos();
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
});
