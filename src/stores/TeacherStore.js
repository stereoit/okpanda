import moment from 'moment';
import {API_BASE,getJSON,putJSON,postJSON,deleteJSON} from '../remote';
import Teacher from '../models/Teacher';
import Slot from '../models/Slot';


var API_NAME = 'teachers/';
var API = API_BASE + API_NAME;
var _teachers = {};
var _changeListeners = [];
var _initCalled = false;

var TeacherStore = module.exports = {

  init: function () {
    if (_initCalled)
      return;

    _initCalled = true;

    console.log("API: ", API);

    getJSON(API, function (err, res) {
      res.forEach(function (teacher) {
        teacher.slots = teacher.slots || [];
        teacher.lessons = teacher.lessons || [];
        console.log("teacher: ", teacher);
        _teachers[teacher.id] = teacher;
      });

      TeacherStore.notifyChange();
    });
  },

  addTeacher: function (teacher, cb) {
    teacher.slots = teacher.slots || [];
    teacher.lessons = teacher.lessons || [];
    postJSON(API, teacher, function (res) {
      teacher = res[0];
      _teachers[teacher.id] = teacher;
      TeacherStore.notifyChange();
      if (cb) cb(res.teacher);
    });
  },

  updateTeacher: function (teacher, cb) {
    putJSON(API + teacher.id, teacher, function (res){
      teacher = res[0];
      _teachers[teacher.id] = teacher;
      TeacherStore.notifyChange();
      if (cb) cb(res.teacher);
    })
  },

  removeTeacher: function (id, cb) {
    deleteJSON(API + '/' + id, cb);
    delete _teachers[id];
    TeacherStore.notifyChange();
  },

  getTeachers: function () {
    var array = [];

    for (var id in _teachers)
      array.push(_teachers[id]);

    return array;
  },

  getTeacher: function (id) {
    return _teachers[id];
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
