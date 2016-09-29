import React from 'react';

class NewPerson extends React.Component {
  render() {
    let {onNewPerson} = this.props
    return (
      <div className="new-person">
        <label>Name: <input type="text" ref={(c) => this._input = c }/></label>
        <button onClick={() => onNewPerson( {name: this._input.value})}>Create</button>
      </div>
    )
  }
}
export default NewPerson
