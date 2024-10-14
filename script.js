let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText) {
        tasks.push({ id: Date.now(), text: taskText, completed: false });
        taskInput.value = '';  // Clear the input field
        saveToLocalStorage();
        renderTasks();
    }
}

function renderTasks(filter = "all", searchTerm = "") {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';  // Clear task list

    // Filter and search tasks
    const filteredTasks = tasks
        .filter(task => filter === 'completed' ? task.completed : filter === 'pending' ? !task.completed : true)
        .filter(task => task.text.toLowerCase().includes(searchTerm.toLowerCase()));

    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        li.innerHTML = `
            <span>${task.text}</span>
            <div class="icons">
                <button onclick="toggleTask(${task.id})"><i class="fas fa-check"></i></button>
                <button onclick="editTask(${task.id})"><i class="fas fa-edit"></i></button>
                <button onclick="deleteTask(${task.id})"><i class="fas fa-trash"></i></button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

function toggleTask(id) {
    const task = tasks.find(task => task.id === id);
    task.completed = !task.completed;
    saveToLocalStorage();
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveToLocalStorage();
    renderTasks();
}

function editTask(id) {
    const task = tasks.find(task => task.id === id);
    const newTaskText = prompt('Edit your task:', task.text);
    if (newTaskText) {
        task.text = newTaskText.trim();
        saveToLocalStorage();
        renderTasks();
    }
}

function clearAll() {
    tasks = [];
    saveToLocalStorage();
    renderTasks();
}

function showAll() {
    renderTasks("all");
}

function showCompleted() {
    renderTasks("completed");
}

function showPending() {
    renderTasks("pending");
}

function searchTask() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.trim();
    renderTasks("all", searchTerm);
}

// Initial render on page load
renderTasks();
