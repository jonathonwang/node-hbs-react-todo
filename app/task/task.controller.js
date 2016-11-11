const express = require('express');
const Task = require('./task.model');
const router = express.Router();

const taskIndex = Task.find({}, (err, tasks) => {
  return tasks
});

// let test = new Task({
//   title: 'Test1',
//   isComplete: false
// });
// test.save();
