import React from 'react';
import {dateTimeFormat} from '../utils';
import moment from 'moment';

class LessonComponent extends React.Component {
  render() {
    let {lesson,studentsStore,teachersStore} = this.props,
      when = moment(lesson.when),
      to = moment(lesson.to),
      teacher = teachersStore.getTeacher(lesson.teacher),
      student = studentsStore.getStudent(lesson.student)

    return (
      <div className="lesson">
        <ul>
          <li>when: {when.format(dateTimeFormat)}</li>
          <li>to: {to.format(dateTimeFormat)}</li>
          <li>student: {student.name}</li>
          <li>teacher: {teacher.name}</li>
        </ul>
      </div>
    )
  }
}

export default LessonComponent
