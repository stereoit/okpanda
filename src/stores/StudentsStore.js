import moment from 'moment';
import {API_BASE,getJSON,putJSON,postJSON,deleteJSON} from '../remote';
import Student from '../models/Student';
import Lesson from '../models/Lesson';


var API_NAME = 'students/';
var API = API_BASE + API_NAME;
var _students = {};
var _changeListeners = [];
var _initCalled = false;

var StudentStore = module.exports = {

  init: function () {
    if (_initCalled)
      return;

    _initCalled = true;

    getJSON(API, function (err, res) {
      res.forEach(function (student) {
        student.lessons = student.lessons || [];
        // console.log("student: ", student);
        _students[student.id] = student;
      });

      StudentStore.notifyChange();
    });
  },

  addStudent: function (student, cb) {
    student.lessons = student.lessons || [];
    postJSON(API, student, function (res) {
      student = res[0];
      _students[student.id] = student;
      StudentStore.notifyChange();
      if (cb) cb(res.student);
    });
  },

  updateStudent: function (student, cb) {
    putJSON(API + student.id, student, function (res){
      student = res[0];
      _students[student.id] = student;
      StudentStore.notifyChange();
      if (cb) cb(res.student);
    })
  },

  removeStudent: function (id, cb) {
    deleteJSON(API + '/' + id, cb);
    delete _students[id];
    StudentStore.notifyChange();
  },

  getStudents: function () {
    var array = [];

    for (var id in _students)
      array.push(_students[id]);

    return array;
  },

  getStudent: function (id) {
    return _students[id];
  },

  notifyChange: function () {
    _changeListeners.forEach(function (listener) {
      listener();
    });
  },

  addChangeListener: function (listener) {
    _changeListeners.push(listener);
  },

  removeChangeListener: function (listener) {
    _changeListeners = _changeListeners.filter(function (l) {
      return listener !== l;
    });
  }

};
