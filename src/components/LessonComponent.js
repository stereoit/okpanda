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
          <li><span className="info">when:</span> {when.format(dateTimeFormat)}</li>
          <li><span className="info">to:</span> {to.format(dateTimeFormat)}</li>
          <li><span className="info">student:</span> {student.name}</li>
          <li><span className="info">teacher:</span> {teacher.name}</li>
        </ul>
      </div>
    )
  }
}

export default LessonComponent
