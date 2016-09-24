var API_BASE = 'http://someplace/api/';
localStorage.token = localStorage.token || (Date.now()*Math.random());


function getJSON(url, cb) {
  var req = new XMLHttpRequest();
  req.onload = function () {
    if (req.status === 404) {
      cb(new Error('not found'));
    } else {
      cb(null, JSON.parse(req.response));
    }
  };
  req.open('GET', url);
  req.setRequestHeader('authorization', localStorage.token);
  req.send();
}

function postJSON(url, obj, cb) {
  var req = new XMLHttpRequest();
  req.onload = function () {
    cb(JSON.parse(req.response));
  };
  req.open('POST', url);
  req.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  req.setRequestHeader('authorization', localStorage.token);
  req.send(JSON.stringify(obj));
}

function deleteJSON(url, cb) {
  var req = new XMLHttpRequest();
  req.onload = cb;
  req.open('DELETE', url);
  req.setRequestHeader('authorization', localStorage.token);
  req.send();
}
