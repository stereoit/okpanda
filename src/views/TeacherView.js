import React from 'react';
import moment from 'moment';
import Slot from '../models/Slot';
import SlotComponent from '../components/SlotComponent';
import SlotCreator from '../components/SlotCreator';
import LessonComponent from '../components/LessonComponent';


class TeacherView extends React.Component {
  constructor(props) {
    super(props)
    this.newSlotHandler = this.newSlotHandler.bind(this)
  }

  newSlotHandler(slot) {
    // console.log("newSlotHandler: ", slot);
    let {teacher} = this.props
    let _slot = new Slot(moment.unix(slot.from), moment.unix(slot.to))
    teacher.slots.push(_slot)
    this.forceUpdate()
  }

  render() {
    let {teacher} = this.props
    return (
      <div>
        <h2>Hello {teacher.name}</h2>
        <p>Your availability</p>
        {teacher.slots.map( (slot, id) =>   <SlotComponent slot={slot} key={id} />  )}
        <p>Add new availability block </p>
        <SlotCreator onNewSlot={this.newSlotHandler}/>
        <p>Booked lessons</p>
        {teacher.lessons.map( (lesson, id) =>   <LessonComponent lesson={lesson} key={id} />  )}
      </div>
    )
  }
}

export default TeacherView
