export interface ITask {
  title: string;
  isComplete: boolean;
  _id?: string | number;
}

export interface IMainState {
  title: string;
  newTask: ITask;
  tasks: Array<ITask>;
  // fetchTasks(): void;
  // toggleComplete(task: ITask): void;
  // createTask(event: Event): void;
  // deleteTask(task: ITask): void;
  // updateNewTaskTitle(event: Event): void;
  // componentDidMount(): void;
}

export interface IInputFormProps {
  newTask: ITask;
  createTask();
  updateNewTaskTitle();
  constructor();
}

export interface ITaskComponentProps {
  task: ITask;
  deleteTask(task: ITask);
  toggleComplete(task: ITask);
}
