let tasks = [
  { id: 1, title: "Primera tarea", completed: false }
];
let nextId = 2;

function getAll() {
  return tasks;
}

function getById(id) {
  return tasks.find(task => task.id === id);
}

function add(title) {
  const newTask = { id: nextId++, title, completed: false };
  tasks.push(newTask);
  return newTask;
}

function update(id, { title, completed }) {
  const task = tasks.find(t => t.id === id);
  if (!task) return null;
  if (title !== undefined) task.title = title;
  if (completed !== undefined) task.completed = completed;
  return task;
}

function remove(id) {
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) return false;
  tasks.splice(index, 1);
  return true;
}

module.exports = { getAll, getById, add, update, remove };
