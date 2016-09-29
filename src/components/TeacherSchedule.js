import React from 'react';
import SlotComponent from '../components/SlotComponent';
import BookSlot from '../components/BookSlot';

class TeacherSchedule extends React.Component {
  render(){
    let {teacher, bookingHandler} = this.props
    return (
      <div className="teacher">
        <h3>{teacher.name}</h3>
        <h4>Available slots </h4>
        {teacher.slots.map((slot,id) =>
          <SlotComponent slot={slot} key={id}>
            <BookSlot bookingHandler={bookingHandler} teacher={teacher}/>
          </SlotComponent>
        )}
      </div>
    )
  }
}

export default TeacherSchedule;
