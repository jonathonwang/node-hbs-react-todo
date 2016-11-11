const mongoose = require('mongoose');

// Schema
const taskSchema = mongoose.Schema({
  title: { type: String, required: true },
  isComplete: { type: Boolean, required: true },
},
{
  timestamps: true,
  ObjectId: true
});

const Task = mongoose.model('Task', taskSchema);

// let test = new Task({
//   title: 'Test1',
//   isComplete: false
// });
// test.save();

module.exports = Task;
