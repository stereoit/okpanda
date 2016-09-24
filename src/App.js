import React, { Component } from 'react'
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router'
import TeacherView from './views/TeacherView';
import StudentView from './views/StudentView';

class App extends Component {
  render() {
    let {teachers, students} = this.props
    return (
      <Router history={browserHistory}>
        <Route path='/' teachers={teachers} students={students} component={Container} >
          <IndexRoute component={Home} />
          <Route path='/teacher' teacher={teachers[0]} component={TeacherView} />
          <Route path='/student' teacher={students[0]} component={StudentView} />
          <Route path='*' component={NotFound} />
        </Route>
      </Router>
    )
  }
}

const Nav = () => (
  <div>
    <Link to='/'>Home</Link>&nbsp;
    <Link to='/teacher'>Teacher</Link>&nbsp;
    <Link to='/student'>Student</Link>
  </div>
)

const Container = (props) => <div>
  {props.children && React.cloneElement(props.children, {
    teachers: props.route.teachers,
    teacher: props.route.teachers[0],
    students: props.route.students,
    student: props.route.students[0],
  })}
  <Nav />
</div>


const Home = () =>
  <div>
    <h1>Hi, this is simple scheduler app</h1>
    <p>
      Please use appropriate route.
    </p>
  </div>

const NotFound = () => (
  <h1>404.. This page is not found!</h1>)

export default App
