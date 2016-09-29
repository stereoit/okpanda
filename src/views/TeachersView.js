import React from 'react'
import {Link} from 'react-router'
import NewPerson from '../components/NewPerson';



const TeachersView = ({teachers, teachersStore}) => {
  return (
    <div className="teachersview">
      <h2>Teachers View</h2>
      {teachers && teachers.length > 0  ?
        <ul>
          { teachers.map((teacher,id) =>
            <li key={id}><Link  to={`teacher/${teacher.id}`}>{teacher.name}</Link></li> )
           }
        </ul>
        :
        <p>No teachers yet</p>
      }
      <h3>Create new teacher</h3>
      <NewPerson onNewPerson={teachersStore.addTeacher}/>
    </div>
  )
}

export default TeachersView
