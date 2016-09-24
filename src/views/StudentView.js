import React from 'react';
import moment from 'moment';

import Lesson from '../models/Lesson';
import TeacherSchedule from '../components/TeacherSchedule';
import LessonComponent from '../components/LessonComponent';


class StudentView extends React.Component {
  constructor(props) {
    super(props)
    this.newBookingHandler = this.newBookingHandler.bind(this)
  }

  newBookingHandler(slot, teacher) {
    let {student} = this.props
    let lesson = new Lesson(moment.unix(slot.from), moment.unix(slot.to), student, teacher)
    teacher.lessons.push(lesson)
    student.lessons.push(lesson)
    this.forceUpdate()
  }

  render() {
    let {student, teachers} = this.props
    let bookedLessons = <p>No booked lessons yet.</p>
    if(student.lessons.length) {
      bookedLessons = student.lessons.map( (lesson, id) => <LessonComponent lesson={lesson} key={id} /> )
    }
    return (
      <div>
        <h1>Hello {student.name}</h1>
        <h2>Booked lessons</h2>
        {bookedLessons}

        <h2>Those are available teachers</h2>
        <ul>
          {teachers.map((teacher, id) =>
            <TeacherSchedule
              teacher={teacher}
              student={student}
              bookingHandler={this.newBookingHandler}
              key={id}
            />
          )}
        </ul>

      </div>
    )
  }
}

export default StudentView
