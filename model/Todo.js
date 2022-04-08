const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
  title: String,
  completed: Boolean,
  createdAt: Date,
  updatedAt: Date,
}, {
  timestamps: true
});

module.exports = mongoose.model('Todos', todoSchema);

