import React from 'react';
import moment from 'moment';
import {dateTimeFormat} from '../utils';

class SlotCreator extends React.Component {
  constructor(props){
    super(props)

    let from_value = props.slot && props.slot.from || moment()
    let from_valid = from_value.isValid()
    let to_value = props.slot && props.slot.to || moment()
    let to_valid = to_value.isValid()

    this.state = {
      from_value: from_value.format(dateTimeFormat),
      from_valid: from_valid,
      to_value: to_value.format(dateTimeFormat),
      to_valid: to_valid
    }

    this.checkTime = this.checkTime.bind(this)
  }

  checkTime(input) {
    let isValid = moment(input.value, dateTimeFormat).isValid()
    // console.log(input, " value: ", input.value, isValid);
    if (input.getAttribute('data-tag') == "from") {
      this.setState({
        from_value: input.value,
        from_valid: isValid
      });
    } else {
      this.setState({
        to_value: input.value,
        to_valid: isValid
      });
    }
  }

  render() {
    let {onNewSlot} = this.props
    let {from_valid, from_value, to_valid, to_value} = this.state
    return (
      <div>
        <label>
          from:
          <input
            data-tag="from"
            ref={(c) => this.from = c}
            type="text"
            value={from_value}
            onChange={(event) => this.checkTime(event.target)}
          />
          { !from_valid && <span className="error">Not valid value </span>}
        </label>
        <label>
          to:
          <input
            data-tag="to"
            ref={(c) => this.to = c}
            type="text"
            value={to_value}
            onChange={(event) => this.checkTime(event.target)}
          />
        { !to_valid && <span className="error">Not valid value </span>}
        </label>
        { (from_valid && to_valid) &&
          <button onClick={() => {
              onNewSlot({
                from: moment(from_value, dateTimeFormat).format("X"),
                to: moment(to_value, dateTimeFormat).format("X")
              })
            }
          } >Create</button>
        }
        {this.props.children}
      </div>
    )
  }
}

export default SlotCreator
