import React, { Component } from 'react'
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router'
import TeacherView from './views/TeacherView';
import StudentView from './views/StudentView';
import TeacherStore from './stores/TeacherStore';

/**
* each component can import and init as many stores as needed
* store will initialize only once and is a singleton
* component can subscribe to stores events (update...)
*
* or we can subscribe to all stores here and pass them as props
* to children in Container.
*/
class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      'teachers': TeacherStore.getTeachers()
    }
    this.updateTeachers = this.updateTeachers.bind(this)
  }

  componentWillMount() {
    TeacherStore.init();
    console.log("Initialized TeacherStore");
  }

  componentDidMount() {
    console.log("Adding changeListener");
    TeacherStore.addChangeListener(this.updateTeachers);
    this.updateTeachers(); // just to make sure we are loaded
  }

  componentWillUnmount() {
    TeacherStore.removeChangeListener(this.updateTeachers);
  }

  updateTeachers() {
    // if (!this.isMounted())
    //   return;
    console.log("Setting state in updateTeachers");
    this.setState({
      teachers: TeacherStore.getTeachers(),
      loading: false
    });
  }

  render() {
    return (
      <div>
        <Nav />
        {this.props.children}
      </div>
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

const Home = () =>
  <div>
    <h1>Hi, this is simple scheduler app</h1>
    <p>
      Please use appropriate route.
    </p>
  </div>

const NotFound = () => (
  <h1>404.. This page is not found!</h1>)

const routes = <Router history={browserHistory}>
  <Route path='/' component={App} >
    <IndexRoute component={Home} />
    <Route path='teacher/:name' component={TeacherView} />
    <Route path='student/:name' component={StudentView} />
    <Route path='*' component={NotFound} />
  </Route>
</Router>

export default routes
