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
