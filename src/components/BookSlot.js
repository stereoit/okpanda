import React from 'react';
import SlotCreator from '../components/SlotCreator';


class BookSlot extends React.Component {
  constructor(props){
    super(props)
    this.state = {booking: false}
    this.newSlotHandler = this.newSlotHandler.bind(this)
  }

  newSlotHandler (slot) {
    let {bookingHandler, teacher} = this.props
    bookingHandler(slot, teacher)
  }

  render(){
    let {slot, bookingHandler, teacher} = this.props
    const {booking} = this.state

    return (
      <div>
        <button onClick={() => this.setState({booking: true})}>Book lesson in this slot</button>
        { booking ?
          <SlotCreator slot={slot} onNewSlot={this.newSlotHandler}>
            <button onClick={() => this.setState({booking: false})}>Cancel</button>
          </SlotCreator>
        : null }
      </div>
    )
  }
}

export default BookSlot
