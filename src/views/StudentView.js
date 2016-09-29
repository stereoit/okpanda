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
    let {teachersStore,studentsStore} = this.props
    let {id} = this.props.routeParams
    let student = studentsStore.getStudent(id)
    console.log("newBookingHandler ", slot, teacher);
    let lesson = new Lesson(slot.from, slot.to, student, teacher)
    teacher.lessons.push(lesson)
    teachersStore.updateTeacher(teacher)
    student.lessons.push(lesson)
    studentsStore.updateStudent(student)
    // this.forceUpdate()
  }

  render() {
    let {teachersStore,studentsStore} = this.props
    let {id} = this.props.routeParams
    let student = studentsStore.getStudent(id)
    let bookedLessons = <p>No booked lessons yet.</p>
    if(student.lessons.length) {
      bookedLessons = student.lessons.map( (lesson, id) =>
        <LessonComponent
          key={id}
          lesson={lesson}
          studentsStore={studentsStore}
          teachersStore={teachersStore}
        />
      )
    }
    return (
      <div className="container">
        <h1>Hello {student.name}</h1>
        <h2>Booked lessons</h2>
        {bookedLessons}

        <h2>Those are available teachers</h2>
        <ul>
          {teachersStore.getTeachers().map((teacher, id) =>
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
