const express = require('express');
const morgan = require('morgan');
const tasks = require('./tasks');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan('dev'));

// Rutas de tareas
app.get('/tasks', (req, res) => {
  res.json(tasks.getAll());
});

app.get('/tasks/:id', (req, res) => {
  const task = tasks.getById(parseInt(req.params.id));
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.json(task);
});

app.post('/tasks', (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: 'Title is required' });
  const newTask = tasks.add(title);
  res.status(201).json(newTask);
});

app.put('/tasks/:id', (req, res) => {
  const { title, completed } = req.body;
  const updatedTask = tasks.update(parseInt(req.params.id), { title, completed });
  if (!updatedTask) return res.status(404).json({ error: 'Task not found' });
  res.json(updatedTask);
});

app.delete('/tasks/:id', (req, res) => {
  const deleted = tasks.remove(parseInt(req.params.id));
  if (!deleted) return res.status(404).json({ error: 'Task not found' });
  res.json({ message: 'Task deleted' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

module.exports = app;
