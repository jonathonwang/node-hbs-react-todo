import * as React from 'react';

import { ITaskComponentProps } from './interfaces';

export class TaskComponent extends React.Component<ITaskComponentProps, void> {
  constructor() {
    super();
  }
  render(): any {
    const listItemClass: string = `list-group-item ${this.props.task.isComplete ? 'completed' : ''}`;
    return (
      <li className={listItemClass}>
        <input type='checkbox' onChange={() => this.props.toggleComplete(this.props.task)} checked={this.props.task.isComplete}/>
        {this.props.task.title}
        <button onClick={() => this.props.deleteTask(this.props.task)} className='btn btn-danger btn-xs pull-right'>Delete</button>
      </li>
    );
  }
};

export default TaskComponent;
