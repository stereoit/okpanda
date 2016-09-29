import React from 'react'
import {Link} from 'react-router'
import NewPerson from '../components/NewPerson';
// import NewTeacher from '../components/NewTeacher'

// <NewTeacher onNewTeacher={teachersStore.addTeacher}/>


const StudentsView = ({students,studentsStore}) => {
  return (
    <div className="container">
      <h2>Students View</h2>
      {students && students.length > 0 ?
        <ul>
          { students.map((student,id) =>
            <li key={id}><Link  to={`student/${student.id}`}>{student.name}</Link></li> )
           }
        </ul>
        :
        <p>No students yet</p>
      }
      <h3>Create new student</h3>
      <NewPerson onNewPerson={studentsStore.addStudent}/>
    </div>
  )
}

export default StudentsView
