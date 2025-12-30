const express = require('express');
const app = express();
app.use(express.json());

let todos = [];

// CREATE
app.post('/todos', (req, res) => {
  const todo = { id: Date.now(), ...req.body };
  todos.push(todo);
  res.status(201).json(todo);
});

// READ ALL
app.get('/todos', (req, res) => {
  res.json(todos);
});

// READ ONE
app.get('/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id == req.params.id);
  if (!todo) return res.status(404).send('Not found');
  res.json(todo);
});

// UPDATE
app.put('/todos/:id', (req, res) => {
  const index = todos.findIndex(t => t.id == req.params.id);
  if (index === -1) return res.status(404).send('Not found');
  todos[index] = { ...todos[index], ...req.body };
  res.json(todos[index]);
});

// DELETE
app.delete('/todos/:id', (req, res) => {
  todos = todos.filter(t => t.id != req.params.id);
  res.status(204).send();
});

app.listen(3014, () => console.log('CRUD API on http://localhost:3014'));