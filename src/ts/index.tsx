// =============================================================================
// Import Styles - Output as: dist/css/app.css
import '../scss/app.scss';
// =============================================================================

// NPM Module Dependency Imports
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Fetch from 'whatwg-fetch';

// React Components
import TaskComponent from './TaskComponent';
import InputForm from './InputForm';

export class Main extends React.Component<any, any> {
  constructor() {
    super();
    this.state = {
      title: 'Todo',
      newTask: { title: '', isComplete: false },
      tasks: []
    };
    this.fetchTasks = this.fetchTasks.bind(this);
    this.toggleComplete = this.toggleComplete.bind(this);
    this.createTask = this.createTask.bind(this);
    this.updateNewTaskTitle = this.updateNewTaskTitle.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }
  fetchTasks(): void {
    fetch('/tasks').then( (response) => response.json()).then( (body) => {
      this.setState({ tasks: body });
    });
  }
  toggleComplete(task): void {
    const taskList = this.state.tasks;
    const taskIndex = taskList.findIndex( (taskItem) => taskItem === task);
    const stateTask = taskList[taskIndex];
    stateTask.isComplete = !stateTask.isComplete;
    this.setState({ tasks: taskList });
    fetch(`/task/${task._id}/toggle`, { method: 'put' }).then( (response) => {
      if (response.status !== 200) {
        // On Error, revert the task back to original state
        console.log(response);
        stateTask.isComplete = !stateTask.isComplete;
        this.setState({ tasks: taskList });
      }
    });
  }
  createTask(event): void {
    event.preventDefault();
    let newTask = this.state.newTask;
    if (newTask.title.length > 0) {
      let resetTask = { title: '', isComplete: false };
      let tasks = this.state.tasks;
      let newId = Math.floor(Math.random() * 10) + 2;
      newTask._id = newId;
      tasks.push(newTask);
      this.setState({ newTask: resetTask, tasks });
      let postBody = JSON.stringify({ title: newTask.title });
      fetch('/task', { method: 'post', headers: {'Content-Type': 'application/json'}, body: postBody })
      .then( (response) => response.json())
      .then( (body) => {
        let taskIndex = this.state.tasks.findIndex( (task) => task._id === newId );
        tasks.splice(taskIndex, 1, body);
        this.setState({ tasks });
      });
    }
  }
  deleteTask(task) {
    console.log(task);
  }
  updateNewTaskTitle(event): void {
    const newTitle = event.target.value;
    const newTask = this.state.newTask;
    newTask.title = newTitle;
    this.setState({ newTask });
  }
  componentDidMount(): void {
    this.fetchTasks();
  }
  render(): any {
    const taskList = this.state.tasks.map( (task) => {
      return <TaskComponent task={task} key={task._id} toggleComplete={this.toggleComplete} deleteTask={this.deleteTask}></TaskComponent>;
    });
    return (
      <div>
        <h1 className='text-center'>{this.state.title}</h1>
        <ul className='list-group'>
          <InputForm newTask={this.state.newTask} createTask={this.createTask} updateNewTaskTitle={this.updateNewTaskTitle}></InputForm>
          {taskList}
        </ul>
      </div>
    );
  }
}

ReactDOM.render(
  <Main></Main>,
  document.getElementById('main')
);
