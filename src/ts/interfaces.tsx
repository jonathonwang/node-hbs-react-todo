export interface ITask extends Object {
  title: string;
  isComplete: boolean;
  _id?: string | number;
}

export interface IMainState extends Object {
  title: string;
  newTask: ITask;
  tasks: Array<ITask>;
}

export interface IInputFormProps extends Object {
  newTask: ITask;
  createTask(): void;
  updateNewTaskTitle(): void;
}

export interface ITaskComponentProps extends Object {
  task: ITask;
  deleteTask(): void;
  toggleComplete(): void;
}
