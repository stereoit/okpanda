import React from 'react'
import ReactDOM from 'react-dom';
import Lesson from './models/Lesson';
import Student from './models/Student';
import App from './App'


// dummy students definition
let robert = new Student("Robert")
let harry = new Student("Harry")
let sebastian = new Student("Sebastian")
let students = [robert,harry,sebastian]

// let lesson1 = new Lesson(morning, moment(morning).add(30, 'minutes'), robert, teacher1)
// // at this moment I hack it there, TODO: proper resource management
// teacher1.lessons.push(lesson1)

// console.log("teachers: ", teachers);


ReactDOM.render(App, document.getElementById('root'))
