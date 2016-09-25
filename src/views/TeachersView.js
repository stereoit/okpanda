import React from 'react'
import {Link} from 'react-router'

const TeachersView = (props) => {
  console.log("Got thos props", props)
  let teachers = props.teachers
  return (
    <div className="teachersview">
     { teachers ? teachers.map((teacher,id) => <Link key={id} to={`teacher:${teacher.name}`}>{teacher.name}</Link> )
         :
          <span>No teachers yet</span>
      }
    </div>
  )
}

export default TeachersView
