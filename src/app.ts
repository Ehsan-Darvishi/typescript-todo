//GetForm
interface TodoInterface {
    id: number,
    title: string,
    status: boolean
}

class Todo implements TodoInterface {
    id: number;
    title: string;
    status: boolean;

    constructor(todo: TodoInterface){
        this.id = todo.id;
        this.title = todo.title;
        this.status = todo.status;
    }


}

class UI {
    addTodoToList(todo: TodoInterface){
        // console.log(todo, "addTodoToList");
        const list =document.getElementById("todo-list")!;
        const tr = document.createElement('tr');
        tr.innerHTML =`
                        <th>${todo.id}</th>
                        <td>${todo.title}</td>
                        <td><input type="checkbox" ${todo.status ? 'checked' : ''} class="form-check-input"></td>
                        <td><button class="btn btn-sm btn-outline-danger" onclick="ui.removeTodo(event)">Delete</button></td>
                        `;
        list.appendChild(tr);
    }

    removeTodo(e: Event){
        const element = e.target as HTMLElement;
        const pElement = element.parentElement;
        const sElemrnt = pElement?.parentElement as HTMLElement;

        sElemrnt.innerHTML = ``;

        //in element we get <button> tag,
        // in pElement we get <td> tag,<td> tag is <button> parentElement
        //and in sElement we get <tr> tag
        //and in sElement.innerHTML =''; we replace <tr> tag with ''
    }
}

const ui = new UI();

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("todo-form") as HTMLFormElement;
    const title = document.getElementById("title") as HTMLInputElement;
    const titleError =document.getElementById('title-error') as HTMLParagraphElement;
    

    form.addEventListener("submit", (e: Event) => {
        e.preventDefault();

        if(title.value.trim() === ''){
            titleError.innerHTML = 'Title id required ...'
        }else{
            titleError.innerHTML = ''
            const todoObj: TodoInterface = {
                id: Math.round(Math.random() * 100),
                title: title.value.trim() ,
                status: false
            }
            const todo = new Todo(todoObj);

            ui.addTodoToList(todo);

            title.value ='';//for removing input after add task
        }
    });
});