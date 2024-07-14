document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('new-task');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    // Load tasks from local storage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const renderTasks = () => {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.className = task.completed ? 'completed' : '';
            taskItem.innerHTML = `
                <input type="checkbox" ${task.completed ? 'checked' : ''} data-index=${index}>
                <span>${task.text}</span>
                <div class="task-buttons">
                    <button class="edit" data-index=${index}>Edit</button>
                    <button class="delete" data-index=${index}>Delete</button>
                </div>
            `;
            taskList.appendChild(taskItem);
        });
    };

    const addTask = () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            tasks.push({ text: taskText, completed: false });
            taskInput.value = '';
            saveTasks();
            renderTasks();
        }
    };

    const editTask = (index) => {
        const newTaskText = prompt('Edit Task', tasks[index].text);
        if (newTaskText) {
            tasks[index].text = newTaskText.trim();
            saveTasks();
            renderTasks();
        }
    };

    const deleteTask = (index) => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    };

    const toggleTaskCompletion = (index) => {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    };

    addTaskBtn.addEventListener('click', addTask);

    taskList.addEventListener('click', (e) => {
        const index = e.target.dataset.index;
        if (e.target.matches('input[type="checkbox"]')) {
            toggleTaskCompletion(index);
        } else if (e.target.matches('button.edit')) {
            editTask(index);
        } else if (e.target.matches('button.delete')) {
            deleteTask(index);
        }
    });

    renderTasks();
});
