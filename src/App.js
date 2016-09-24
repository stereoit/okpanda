import React, { Component } from 'react'
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router'

class App extends Component {
  render() {
    return (
      <Router history={hashHistory}>
        <Route path='/' component={Container} >
          <IndexRoute component={Home} />
          <Route path='/address' component={Address} />
          <Route path='/teacher(/:name)' component={Teacher} />
          <Route path='*' component={NotFound} />
        </Route>
      </Router>
    )
  }
}

const Nav = () => (
  <div>
    <Link to='/'>Home</Link>&nbsp;
    <Link to='/address'>Address</Link>&nbsp;
    <Link to='/teacher'>Teacher</Link>
  </div>
)

const Container = (props) => <div>
  <Nav />
  {props.children}
</div>

const Teacher = ({params, location}) =>
  <div>
    <h1>Hello teacher</h1>
    <h2>{params.name}</h2>
     {location.query.message && <h2>{location.query.message}</h2>}
  </div>

const Home = () =>
  <div>
    <h1>Hello from Home!</h1>
    <Link
    to={{
      pathname: '/teacher/Terry',
      query: { message: 'Hello from Route Query' }
    }}>Teacher Terry</Link>
  </div>
const Address = () => <h1>We are located at 555 Jackson St.</h1>
const NotFound = () => (
  <h1>404.. This page is not found!</h1>)

export default App
