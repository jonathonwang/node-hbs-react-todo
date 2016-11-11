var express = require('express');
var router = express.Router();
const Task = require('../app/task/task.model');

// Get all Tasks
router.get('/tasks', (req, res, next) => {
  Task.find({}, (err, tasks) => {
    if (err) throw err;
    res.send(tasks);
  });
});
// Get Complete Tasks
router.get('/tasks/complete', (req, res, next) => {
  Task.find({ isComplete: true }, (err, tasks) => {
    if (err) throw err;
    res.send(tasks);
  });
});
// Get Incomplete Tasks
router.get('/tasks/incomplete', (req, res, next) => {
  Task.find({ isComplete: false }, (err, tasks) => {
    if (err) throw err;
    res.send(tasks);
  });
});
// Create Task
router.post('/task', (req, res, next) => {
  const newTask = new Task({ title: req.body.title, isComplete: false });
  newTask.save( (err) => {
    if(err) {
      console.log(err);
      res.send(err);
    }
    else { res.send(newTask); }
  });
});
// Get Single Task
router.get('/task/:id', (req, res, next) => {
  Task.find({ _id: req.params.id }, (err, task) => {
    if(err) throw err;
    res.send(task[0]);
  });
});
// Toggle Task completion
router.put('/task/:id/toggle', (req, res, next) => {
  Task.find({ _id: req.params.id }, (err, task) => {
    if (err) throw err;
    task[0].isComplete = !task[0].isComplete;
    task[0].save( (err) => {
      if (err) throw err;
      res.send(task[0]);
    });
  });
});

module.exports = router;
