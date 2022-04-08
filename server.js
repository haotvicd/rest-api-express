require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const todoModel = require('./model/Todo')
const app = express()
const port = 3000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(cors());

// CRUD = create, read, update, delete

// get all todos
app.get('/', async (req, res) => {
  try {
    const todos = await todoModel.find();
    res.json(todos);
  } catch (error) {
    console.log({ message: error });
  }
});

// get 1 todo
app.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const todo = await todoModel.findById(id);
    res.json(todo);
  } catch (error) {
    console.log({ message: error });
  }
});

// add new todo
app.post('/', async (req, res) => {
  const todo = new todoModel({
    title: req.body.title,
    completed: req.body.completed
  });
  try {
    const newTodo = await todo.save();
    res.json(newTodo);
  } catch (error) {
    console.log({ message: error });
  }
});

// delete todo
app.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await todoModel.deleteOne({ _id: id });
    res.send('delete success!');
  } catch (error) {
    console.log({ message: error });
  }
})

// delete todo
app.put('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await todoModel.updateOne({ _id: id }, { title: req.body.title });
    res.send('updated!');
  } catch (error) {
    console.log({ message: error });
  }
})

// Connect mongodb
mongoose.connect(process.env.MONGODB_URI_PRO).then(
  () => { console.log('connected database') },
  err => { console.log({message: err.message}) }
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})