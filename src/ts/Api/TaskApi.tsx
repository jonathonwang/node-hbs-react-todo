import { ITask } from '../interfaces';

// API Calls for Tasks
export const retrieveTasks = (callback: Function) => {
  fetch('/tasks')
  .then( (response) => response.json())
  .then( (body: any) => {
    callback(body);
  });
};

export const toggleComplete = (task: ITask, callback: Function) => {
  fetch(`/task/${task._id}/toggle`, { method: 'put' })
  .then( (response) => {
    if (response.status !== 200) {
      callback(response);
    }
  });
};

export const createTask = (postBody: any, callback: Function) => {
  fetch('/task', { method: 'post', headers: {'Content-Type': 'application/json'}, body: postBody })
  .then( (response) => response.json())
  .then( (body: any) => {
    callback(body);
  });
};

export const deleteTask = (task: ITask, callback: Function) => {
  fetch(`/task/${task._id}`, { method: 'delete' })
  .then( (response) => response.json())
  .then( (body: any) => {
    callback(body);
  });
};

export default {
  retrieveTasks,
  toggleComplete,
  createTask,
  deleteTask
};
