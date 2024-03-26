import {Task} from "./task.js"

var task_array = []

const create_new_task = document.querySelector(".new-task");

create_new_task.addEventListener('submit', (event) => {
    event.preventDefault();
    let task_name = document.querySelector("#task").value
    saveTask(new Task(task_name))
    renderTasks();
    if (task_name !== '') document.querySelector("#task").value = '';
});
document.addEventListener('DOMContentLoaded', renderTasks);

function saveTask(task) {
    if (localStorage.getItem('task_array')){
        task_array = JSON.parse(localStorage.getItem('task_array'))
        task_array.push(task);
        localStorage.setItem('task_array', JSON.stringify(task_array));
    } else {
        task_array.push(task);
        localStorage.setItem('task_array', JSON.stringify(task_array))
    }
}

function completeTask(index){
    let tasks = JSON.parse(localStorage.getItem('task_array'));
    tasks[index].complete = !tasks[index].complete
    localStorage.setItem('task_array', JSON.stringify(tasks));

}

function deleteTask(index){
    let tasks = JSON.parse(localStorage.getItem('task_array'));
    tasks.splice(index, 1);
    localStorage.setItem('task_array', JSON.stringify(tasks));
}

function renderTasks() {
    const task_content = document.querySelector('.task-list');
    task_content.innerHTML = '';

    let tasks = JSON.parse(localStorage.getItem('task_array'));

    tasks.forEach((task, index) => {
        const taskDiv = document.createElement('div');
        taskDiv.classList = 'task'

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `task-${index}`;
        checkbox.checked = task.complete;
        checkbox.addEventListener('click', () => {
            completeTask(index)
            renderTasks();
        })

        const label = document.createElement('label');
        label.textContent = task.name;
        label.htmlFor = `task-${index}`;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Excluir';
        deleteButton.addEventListener('click', () => {
            deleteTask(index)
            renderTasks();
        });
        taskDiv.appendChild(checkbox);
        taskDiv.appendChild(label);
        taskDiv.appendChild(deleteButton);

        task_content.appendChild(taskDiv);
    });
}


