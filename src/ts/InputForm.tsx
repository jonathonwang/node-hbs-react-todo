import * as React from 'react';
export class InputForm extends React.Component<any, void> {
  constructor(props) {
    super();
  }
  render(): any {
    return (
      <li className='list-group-item'>
        <form onSubmit={this.props.createTask}>
          <input type='text' className='form-control' onChange={this.props.updateNewTaskTitle} value={this.props.newTask.title}/>
        </form>
      </li>
    );
  }
}

export default InputForm;
