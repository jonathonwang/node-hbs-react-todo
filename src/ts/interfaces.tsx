export interface ITask {
  title: string;
  isComplete: boolean;
  _id?: string | number;
}

export interface IMainState {
  title: string;
  newTask: ITask;
  tasks: Array<ITask>;
}

export interface IInputFormProps {
  newTask: ITask;
  createTask(event: any): void;
  updateNewTaskTitle(event: any): void;
}

export interface ITaskComponentProps {
  task: ITask;
  deleteTask(task: ITask);
  toggleComplete(task: ITask);
}
