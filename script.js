const tasks = [];

const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");

function renderTasks() {
  taskList.innerHTML = "";

  const pendingTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  [...pendingTasks, ...completedTasks].forEach((task, index) => {
    const taskItem = document.createElement("li");
    taskItem.className = "task-item";

    const taskText = document.createElement("p");
    taskText.textContent = task.description;
    if (task.completed) {
      taskText.classList.add("completed");
    }

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => {
      task.completed = !task.completed;
      renderTasks();
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "🗑";
    deleteButton.addEventListener("click", () => {
      tasks.splice(index, 1);
      renderTasks();
    });

    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskText);
    taskItem.appendChild(deleteButton);

    taskList.appendChild(taskItem);
  });
}

function addTask() {
  const taskDescription = taskInput.value.trim();
  if (taskDescription) {
    tasks.push({ description: taskDescription, completed: false });
    taskInput.value = "";
    renderTasks();
  }
}

addTaskButton.addEventListener("click", addTask);
taskInput.addEventListener("keypress", event => {
  if (event.key === "Enter") {
    addTask();
  }
});
