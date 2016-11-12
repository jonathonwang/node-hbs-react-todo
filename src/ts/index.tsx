// =============================================================================
// Import Styles - Output as: dist/css/app.css
import '../scss/app.scss';
// =============================================================================

// NPM Module Dependency Imports
import * as React from 'react';
import * as ReactDOM from 'react-dom';

// State Import
import State from './State';

// Api Methods Import
import TaskApi from './Api/TaskApi';

// React Components
import TaskComponent from './TaskComponent';
import InputForm from './InputForm';

// Interface Imports
import { IMainState, ITask } from './interfaces';

export class Main extends React.Component<void, IMainState> {
  constructor() {
    super();
    this.state = State;
    this.fetchTasks = this.fetchTasks.bind(this);
    this.toggleComplete = this.toggleComplete.bind(this);
    this.createTask = this.createTask.bind(this);
    this.updateNewTaskTitle = this.updateNewTaskTitle.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }
  fetchTasks(): void {
    // API Call
    TaskApi.retrieveTasks( (body) => {
      const tasks: Array<ITask> = body;
      this.setState({ tasks } as IMainState);
    });
  }
  toggleComplete(task): void {
    const tasks = this.state.tasks;
    const taskIndex: number = tasks.findIndex( (taskItem) => taskItem === task);
    const stateTask: ITask = tasks[taskIndex];
    stateTask.isComplete = !stateTask.isComplete;
    this.setState({ tasks } as IMainState);
    // API Call
    TaskApi.toggleComplete( task, (response) =>  {
      // On Error, revert the task back to original state
      console.log(response);
      stateTask.isComplete = !stateTask.isComplete;
      this.setState({ tasks } as IMainState);
    });
  }
  createTask(event): void {
    event.preventDefault();
    let newTask = this.state.newTask;
    if (newTask.title.length > 0) {
      let resetTask: ITask = { title: '', isComplete: false };
      let tasks: Array<ITask> = this.state.tasks;
      let newId: number = Math.floor(Math.random() * 10) + 2;
      newTask._id = newId;
      tasks.push(newTask);
      this.setState({ newTask: resetTask, tasks } as IMainState);
      let postBody = JSON.stringify({ title: newTask.title });
      // API Call
      TaskApi.createTask(postBody, (body) => {
        let taskIndex = this.state.tasks.findIndex( (task) => task._id === newId );
        tasks.splice(taskIndex, 1, body);
        this.setState({ tasks } as IMainState);
      });
    }
  }
  deleteTask(task) {
    const tasks: Array<ITask> = this.state.tasks;
    const taskIndex: number = tasks.findIndex( (taskItem) => taskItem._id === task._id);
    tasks.splice(taskIndex, 1);
    this.setState({ tasks } as IMainState);
    TaskApi.deleteTask(task, (body) => {
      console.log(body);
    });
  }
  updateNewTaskTitle(event) {
    const newTitle = event.target.value;
    const newTask: ITask = this.state.newTask;
    newTask.title = newTitle;
    this.setState({ newTask } as IMainState);
  }
  componentDidMount() {
    this.fetchTasks();
  }
  render() {
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
