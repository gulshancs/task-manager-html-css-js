let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let filter = "all";
let editIndex = null;

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  let title = document.getElementById("title").value;
  let desc = document.getElementById("desc").value;
  let priority = document.getElementById("priority").value;
  let date = document.getElementById("date").value;

  if (title === "") return alert("Enter title");

  if (editIndex !== null) {
    // ✅ Update Task
    tasks[editIndex] = {
      ...tasks[editIndex],
      title,
      desc,
      priority,
      date
    };

    editIndex = null;
    document.getElementById("submitBtn").innerText = "+ Add Task";

  } else {
    // ✅ Add New Task
    tasks.push({ title, desc, priority, date, completed: false });
  }

  saveTasks();
  clearInputs();
  renderTasks();
}

function clearInputs() {
  document.getElementById("title").value = "";
  document.getElementById("desc").value = "";
  document.getElementById("date").value = "";
}

function renderTasks() {
  let list = document.getElementById("taskList");
  let search = document.getElementById("search").value.toLowerCase();

  list.innerHTML = "";

  tasks.forEach((task, index) => {
    if (task.title.toLowerCase().includes(search)) {

      if (
        filter === "pending" && task.completed ||
        filter === "completed" && !task.completed
      ) return;

      let div = document.createElement("div");
      div.className = "task " + (task.completed ? "completed" : "");

      div.innerHTML = `
        <h4>${task.title}</h4>
        <p>${task.desc}</p>
        <small>${task.priority} | ${task.date}</small><br>

        <button onclick="toggleComplete(${index})">✔</button>
        <button onclick="editTask(${index})">✏️ Edit</button>
        <button onclick="deleteTask(${index})">🗑️</button>
      `;

      list.appendChild(div);
    }
  });
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function editTask(index) {
  let task = tasks[index];

  document.getElementById("title").value = task.title;
  document.getElementById("desc").value = task.desc;
  document.getElementById("priority").value = task.priority;
  document.getElementById("date").value = task.date;

  editIndex = index;

  // ✅ Change button text
  document.getElementById("submitBtn").innerText = "Update Task";
}

renderTasks();