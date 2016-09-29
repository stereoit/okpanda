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
  <div className="top-menu">
    <div className="nav">
      <Link to='/'>Home</Link>&nbsp;
      <Link to='/teachers'>Teachers</Link>&nbsp;
      <Link to='/students'>Students</Link>
    </div>
  </div>
)

const Home = () =>
  <div className="container">
    <h1>Simple scheduler app</h1>
    <p>
      Please use top menu for navigation
    </p>
    <h4>About this app</h4>
    <p>Repository: <a href="https://github.com/stereoit/okpanda">GitHub</a></p>
    <ul>
      <li>Dynamic URL routing (no page refresh) using React Router</li>
      <li>Utilizes Flux for asynchronous state management</li>
      <li>React powered with reusable components (Slot creator)</li>
      <li>Simple styling done with Sass and 7+1 pattern</li>
      <li>Backend written for fun in golang</li>
      <li>DB backend is Mongo</li>
      <li>Tools includes: ES6, Webpack, Sass, git, React</li>
    </ul>

    <h4>Thoughts for improvement</h4>
    <p>I've hacked this in about 16 hours of my free time to see if I am able to put together proof of concept for full stack application. In every part of it I do see space for improvements, namely:</p>
    <ul>
      <li>Backend: middleware for JSON layer + utilities for responding in error, simplify and abstract the mongoDB operations</li>
      <li>Frontend: different state management using proper Flux/Redux/MobX technollogies.</li>
      <li>Design: Better to have it from the designer, but use Material Design Lite if not available. Refactor the date pickers.</li>
    </ul>

    <h4>Time spent</h4>
    <ul>
      <li>1h - initial reading, modeling the domain</li>
      <li>1h - project setup (rollup, package.json, structure, template)</li>
      <li>4h - react components + application logic (stores, passing props, etc.)</li>
      <li>2h - troubleshooting rollup ES6 imports + react router integration</li>
      <li>4h - golang backend including middleware for handling dynamic urls on backend</li>
      <li>1h - simple styling</li>
      <li>1h - final debugging to application (momentjs datetime handling,refactoring)</li>
      <li>2h - github page hosting + own hosting</li>
    </ul>
    <p>I think same application can now be boostrapped in about 6 hours.</p>
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
