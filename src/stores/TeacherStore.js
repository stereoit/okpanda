import moment from 'moment';
import {API_BASE, getJson,postJSON,deleteJSON} from '../remote';
import Teacher from '../models/Teacher';
import Slot from '../models/Slot';


var API = 'http://addressbook-api.herokuapp.com/teachers';
var API_NAME = 'teachers';
var _teachers = {};
var _changeListeners = [];
var _initCalled = false;

var TeacherStore = module.exports = {

  init: function () {
    if (_initCalled)
      return;

    _initCalled = true;

    // getJSON(API, function (err, res) {
    //   res.teachers.forEach(function (teacher) {
    //     _teachers[teacher.id] = teacher;
    //   });
    //
    //   TeacherStore.notifyChange();
    // });
    // definition of time slots
    let morning = moment().hour(8)
    let slot1 = new Slot(morning, moment(morning).add(5, 'hours'))
    let slot2 = new Slot(moment(morning).add(1, 'days'), moment(morning).add(1, 'days').add(3, 'hours'))
    let slot3 = new Slot(moment(morning).add(2, 'days'), moment(morning).add(2, 'days').add(3, 'hours'))
    let slot4 = new Slot(moment(morning).add(3, 'days'), moment(morning).add(3, 'days').add(5, 'hours'))
    let slot5 = new Slot(moment(morning).add(4, 'days'), moment(morning).add(4, 'days').add(6, 'hours'))

    // sample teacher
    let teacher1 = new Teacher("Mat Ryer");
    teacher1.slots.push(slot1,slot2,slot3,slot4,slot5);
    let teacher2 = new Teacher("Amos Komensky");
    teacher2.slots.push(slot4,slot5);

    _teachers[teacher1.id] = teacher1;
    _teachers[teacher2.id] = teacher2;
    console.log("_teachers: ", _teachers);

    TeacherStore.notifyChange();

    // simulate API fetch to give chance to register for events
    // setTimeout(TeacherStore.notifyChange, 500);
  },

  addTeacher: function (teacher, cb) {
    postJSON(API, { teacher: teacher }, function (res) {
      _teachers[res.teacher.id] = res.teacher;
      TeacherStore.notifyChange();
      if (cb) cb(res.teacher);
    });
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
    console.log("notifyChange: ", _changeListeners);
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
