import React, { Component } from 'react'
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router'
import TeacherView from './views/TeacherView';
import TeachersView from './views/TeachersView';
import StudentView from './views/StudentView';
import StudentsView from './views/StudentsView';
import TeacherStore from './stores/TeacherStore';
import StudentsStore from './stores/StudentsStore';

/**
* each component can import and init as many stores as needed
* store will initialize only once and is a singleton
* component can subscribe to stores events (update...)
*
* or we can subscribe to all stores here and pass them as props
* to children in Container.
*
* This comopnent holds all the logics and updates functions + state
*/
class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      'teachers': TeacherStore.getTeachers(),
      'teachersStore': TeacherStore,
      'students': StudentsStore.getStudents(),
      'studentsStore': StudentsStore
    }
    this.updateTeachers = this.updateTeachers.bind(this)
    this.updateStudents = this.updateStudents.bind(this)
    // this.addTeacher = this.updateTeachers.bind(this)
  }

  componentWillMount() {
    TeacherStore.init();
    StudentsStore.init();
    console.log("Initialized TeacherStore");
  }

  componentDidMount() {
    console.log("Adding changeListener");
    TeacherStore.addChangeListener(this.updateTeachers);
    this.updateTeachers(); // just to make sure we are loaded
    StudentsStore.addChangeListener(this.updateStudents);
    this.updateStudents();
  }

  componentWillUnmount() {
    TeacherStore.removeChangeListener(this.updateTeachers);
  }

  updateTeachers() {
    this.setState({
      teachers: TeacherStore.getTeachers(),
      loading: false
    });
  }

  updateStudents() {
    this.setState({
      students: StudentsStore.getStudents()
    })
  }

  render() {
    return (
      <div>
        <Nav />
        {this.props.children && React.cloneElement(this.props.children, this.state)}
      </div>
    )
  }
}


const Nav = () => (
  <div>
    <Link to='/'>Home</Link>&nbsp;
    <Link to='/teachers'>Teachers</Link>&nbsp;
    <Link to='/students'>Students</Link>
  </div>
)

const Home = () =>
  <div>
    <h1>Hi, this is simple scheduler app</h1>
    <p>
      Please use appropriate route.
    </p>
  </div>

const NotFound = () => (
  <h1>404.. This page is not found!</h1>)

    // <Route path='students' component={StudentView} />
const routes = <Router history={browserHistory}>
  <Route path='/' component={App} >
    <IndexRoute component={Home} />
    <Route path='teachers' component={TeachersView} />
    <Route path='students' component={StudentsView} />
    <Route path='teacher/:id' component={TeacherView} />

    <Route path='student/:id' component={StudentView} />
    <Route path='*' component={NotFound} />
  </Route>
</Router>

export default routes
