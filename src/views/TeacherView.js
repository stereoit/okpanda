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
    let {teachersStore} = this.props
    let {id} = this.props.routeParams
    const teacher = teachersStore.getTeacher(id)
    let _slot = new Slot(slot.from, slot.to)
    teacher.slots.push(_slot)
    teachersStore.updateTeacher(teacher)
    this.forceUpdate()
  }

  render() {
    let {studentsStore,teachersStore} = this.props
    let {id} = this.props.routeParams
    const teacher = teachersStore.getTeacher(id)
    return (
      <div>
        <h2>Hello {teacher.name}</h2>
        <p>Your availability</p>
        {teacher.slots && teacher.slots.map( (slot, id) =>   <SlotComponent slot={slot} key={id} />  )}
        <p>Add new availability block </p>
        <SlotCreator onNewSlot={this.newSlotHandler}/>
        <p>Booked lessons</p>
        {teacher.lessons && teacher.lessons.map( (lesson, id) =>
          <LessonComponent
            key={id}
            lesson={lesson}
            studentsStore={studentsStore}
            teachersStore={teachersStore}
          />
        )}
      </div>
    )
  }
}

export default TeacherView
