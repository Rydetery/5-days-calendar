/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/createNewEvent.js":
/*!*******************************!*\
  !*** ./src/createNewEvent.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "clearSelects": () => (/* binding */ clearSelects),
/* harmony export */   "clearError": () => (/* binding */ clearError),
/* harmony export */   "newEventUsers": () => (/* binding */ newEventUsers)
/* harmony export */ });
/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./main */ "./src/main.js");
/* harmony import */ var _onload__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./onload */ "./src/onload.js");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index */ "./src/index.js");
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }



 // CREATE NEW EVENT

var newEvent = function newEvent(dataID) {
  // CREATE OBJECT FOR NEW EVENT
  var newEvent = {
    eventName: document.querySelector('#newName').value,
    eventId: _main__WEBPACK_IMPORTED_MODULE_0__.Data.events[_main__WEBPACK_IMPORTED_MODULE_0__.Data.events.length - 1].eventId + 1,
    day: Number(document.querySelector('#day').value),
    time: Number(document.querySelector('#time').value)
  }; // ADD OBJECT IN DATA

  _main__WEBPACK_IMPORTED_MODULE_0__.Data.events.push(newEvent);
  _main__WEBPACK_IMPORTED_MODULE_0__.Data.users[0].activeEvents.push(newEvent.eventId); // APPEND EVENT ID TO PARTICIPANTS WHO JOIN THIS EVENT

  if (dataID.length > 1) {
    dataID.map(function (element) {
      (0,_main__WEBPACK_IMPORTED_MODULE_0__.searchUserById)(element).activeEvents.push(newEvent.eventId);
    });
  } else {
    (0,_main__WEBPACK_IMPORTED_MODULE_0__.searchUserById)(dataID).activeEvents.push(newEvent.eventId);
  } // REMOVE MODAL WINDOW 'NEW EVENT'


  document.querySelector('div.popup').style = 'display : none;';
  var selected = document.querySelector('select.members').value; // CLEAR FIELDS IN MODAL WINDOW AND TABLE

  (0,_onload__WEBPACK_IMPORTED_MODULE_1__.clearCalendar)();
  clearSelects(); // SHOW ACTIVE EVENT`S FOR SELECTED PARTICIPANT IN TABLE

  (0,_index__WEBPACK_IMPORTED_MODULE_2__.showEvents)((0,_main__WEBPACK_IMPORTED_MODULE_0__.searchUserById)(selected)); // SAVE DATA IN LOCAL STORAGE

  (0,_main__WEBPACK_IMPORTED_MODULE_0__.saveData)();
}; // 'CREATE' BUTTON IN MODAL WINDOW 'NEW EVENT'----------------------------------------------START----------------------------------------------


document.querySelector('div.btn_create').addEventListener('click', function () {
  // CHECK INPUTS FOR VALID DATA IN FORM
  var validation = true;
  var day = document.querySelector('#day').selectedIndex;
  var time = document.querySelector('#time').selectedIndex; // CHECK SELECTED DAY AND TIME

  if (day < 1 || time < 1) {
    var error = document.querySelector('div.error');
    error.querySelector('span').innerHTML = 'Failed to create event. Please select day and time for event.';
    error.classList.add('showError');
    setTimeout(clearError, 10000);
    validation = false;
  } else {
    // CHECK IF SELECTED TIME SLOT IS BOOKED
    for (var i = 0; i < _main__WEBPACK_IMPORTED_MODULE_0__.Data.events.length; i++) {
      if (_main__WEBPACK_IMPORTED_MODULE_0__.Data.events[i].day === Number(document.querySelector('#day').value) && _main__WEBPACK_IMPORTED_MODULE_0__.Data.events[i].time === Number(document.querySelector('#time').value)) {
        var _error = document.querySelector('div.error');

        _error.querySelector('span').innerHTML = 'Failed to create event. This time slot is already booked.';

        _error.classList.add('showError');

        setTimeout(clearError, 10000);
        validation = false;
      }
    }
  } // CHECK FOR SETTING NAME OF NEW EVENT


  if (Number(document.querySelector('#newName').value) === 0) {
    var _error2 = document.querySelector('div.error');

    _error2.querySelector('span').innerHTML = 'Failed to create event. Please a give name to creating event.';

    _error2.classList.add('showError');

    setTimeout(clearError, 10000);
    validation = false;
  } // TAKE SELECTED PARTICIPANTS ID FROM VALUE IN 'PARTICIPANT-TITLE'


  var participantsID = document.querySelector('.participants-title').getAttribute('value');

  if (validation) {
    // CHECK IF NOONS SELECTED
    if (participantsID === null) {
      var _error3 = document.querySelector('div.error');

      _error3.querySelector('span').innerHTML = 'Failed to create event. No one participant selected.';

      _error3.classList.add('showError');

      setTimeout(clearError, 10000);
      validation = false;
    } else {
      // CREATE MASSIVE OF PARTICIPANTS ID`S IF IT NEED
      if (participantsID.length > 1) {
        participantsID = participantsID.split('');
      } // CALL CREATE EVENT


      newEvent(participantsID);
    }
  } else {
    // CLEAR FORM FIELDS
    clearSelects();
  }
}); // 'CREATE' BUTTON IN MODAL WINDOW 'NEW EVENT'----------------------------------------------END-------------------------------------------------------------------
// HIDE ERROR MESSAGE

function clearError() {
  var error = document.querySelector('div.error');

  if (error.classList.contains('showError')) {
    error.classList.remove('showError');
  }
} // CLEAR FIELD IN MODAL WINDOW 'NEW EVENT'


var clearSelects = function clearSelects() {
  document.querySelector('#newName').value = '';
  document.querySelector('span.participants-title').innerHTML = 'Choose participants';
  document.querySelector('span.participants-title').removeAttribute('value');
  loadListeners();
  document.querySelector('#day').selectedIndex = 0;
  document.querySelector('#time').selectedIndex = 0;
}; // CREATE OPTIONS TO SELECT PRACTICAL`S IN MODAL WINDOW 'CREATE NEW EVENT'


var newEventUsers = function newEventUsers(members) {
  var parent = document.querySelector('div.participants-list');

  for (var i = 0; i < members.length; i++) {
    if (members[i].id !== '0') {
      var label = document.createElement('label');
      label.setAttribute('for', "participant-".concat(members[i].id));
      label.textContent = members[i].name;
      var input = document.createElement('input');
      input.setAttribute('type', 'checkbox');
      input.setAttribute('id', "participant-".concat(members[i].id));
      input.classList.add('participants-select');
      input.setAttribute('value', members[i].id);
      label.appendChild(input);
      parent.appendChild(label);
    }
  } // ADD EVENT LISTENERS TO ALL OPTIONS


  loadListeners();
}; // ADD EVENT LISTENERS TO ALL OPTIONS


var loadListeners = function loadListeners() {
  var joinedParticipants = [];
  var input = document.querySelectorAll('.participants-select'); // ADD EVENT LISTENERS TO ALL OPTIONS

  var _iterator = _createForOfIteratorHelper(input),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var item = _step.value;
      item.addEventListener('change', updateValue);
    } // ADD OR DELETE PRACTICAL NAME AND VALUE TO 'JOINED PARTICIPANTS' MASSIVE

  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  function updateValue(e) {
    for (var i = 0; i < joinedParticipants.length; i++) {
      // IF PARTICIPANT ALREADY JOINED - REMOVE HIM FROM EVENT, AND REMOVE IN 'JOINED PARTICIPANTS'
      if (joinedParticipants[i] === e.target.value) {
        var index = i;
        joinedParticipants.splice(index, 1);

        var _title = document.querySelector('.participants-title').textContent = joinedParticipants.map(function (el) {
          return (0,_main__WEBPACK_IMPORTED_MODULE_0__.searchUserById)(el).name;
        }).join(', ');

        document.querySelector('.participants-title').setAttribute('value', joinedParticipants.join(''));
        return _title;
      }
    } // ADD PARTICIPANT TO EVENT


    joinedParticipants.push(e.target.value);
    var title = document.querySelector('.participants-title').textContent = joinedParticipants.map(function (el) {
      return (0,_main__WEBPACK_IMPORTED_MODULE_0__.searchUserById)(el).name;
    }).join(', ');
    document.querySelector('.participants-title').setAttribute('value', joinedParticipants.join(''));
    return title;
  }
};



/***/ }),

/***/ "./src/deleteEvent.js":
/*!****************************!*\
  !*** ./src/deleteEvent.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "giveListeners": () => (/* binding */ giveListeners)
/* harmony export */ });
/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./main */ "./src/main.js");
/* harmony import */ var _onload__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./onload */ "./src/onload.js");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index */ "./src/index.js");
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }



 // GIVE LISTENERS TO ALL 'DELETE BUTTONS' IN TABLE

var giveListeners = function giveListeners() {
  var deleteButtons = document.querySelectorAll('div.deleteButton'); // SHOW MODAL WINDOW 'DELETE EVENT' AND SELECT ID OF DELETING EVENT

  function updateListener(e) {
    document.querySelector('div.delete-popup').style = 'display: block'; // TAKE PARENT 'VALUE' THAT EQUALS EVENT ID

    var parent = e.target.parentNode;
    var parentValue = parent.getAttribute('value');
    var searchEvent = (0,_main__WEBPACK_IMPORTED_MODULE_0__.searchEventById)(parentValue);
    document.querySelector('span#event-name').innerHTML = searchEvent.eventName; // ADD LISTENER TO CONFIRM DELETING EVENT

    document.querySelector('#delete-confirm').addEventListener('click', function () {
      deleteEvent(parentValue);
      document.querySelector('div.delete-popup').style = 'display: none';
      var selected = document.querySelector('select.members').value; // CLEAR TABLE

      (0,_onload__WEBPACK_IMPORTED_MODULE_1__.clearCalendar)(); // SHOW ACTIVE EVENT`S FOR SELECTED MEMBER

      (0,_index__WEBPACK_IMPORTED_MODULE_2__.showEvents)((0,_main__WEBPACK_IMPORTED_MODULE_0__.searchUserById)(selected)); // SAVE DATA TO LOCAL STORAGE

      (0,_main__WEBPACK_IMPORTED_MODULE_0__.saveData)();
    });
  }

  var _iterator = _createForOfIteratorHelper(deleteButtons),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var item = _step.value;

      // CHECK IF IT BUTTON FOR 'HIDE ERROR' IN MODAL WINDOW 'NEW EVENT'
      if (!item.hasAttribute('id')) {
        item.addEventListener('click', updateListener);
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}; // SEARCH AND DELETE EVENT FROM DATA


var deleteEvent = function deleteEvent(id) {
  // SEARCH ID IN EVENTS AND DELETE IT
  _main__WEBPACK_IMPORTED_MODULE_0__.Data.events.map(function (item, index, array) {
    if (item.eventId == id) {
      array.splice(index, 1);
    }
  }); // SEARCH ID IN USERS AND DELETE IT

  var participants = _main__WEBPACK_IMPORTED_MODULE_0__.Data.users;
  participants.map(function (item) {
    item.activeEvents.map(function (item, index, array) {
      if (item === Number(id)) {
        array.splice(index, 1);
      }
    });
  }); // SAVE CHANGES IN DATA

  (0,_main__WEBPACK_IMPORTED_MODULE_0__.saveData)();
};



/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "showEvents": () => (/* binding */ showEvents)
/* harmony export */ });
/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./main */ "./src/main.js");
/* harmony import */ var _onload__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./onload */ "./src/onload.js");
/* harmony import */ var _createNewEvent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./createNewEvent */ "./src/createNewEvent.js");
/* harmony import */ var _deleteEvent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./deleteEvent */ "./src/deleteEvent.js");



 // ADD PARTICIPANTS TO SELECT IN HEADER

(0,_onload__WEBPACK_IMPORTED_MODULE_1__.addMembers)(_main__WEBPACK_IMPORTED_MODULE_0__.Data.users); // DRAW TABLE

(0,_onload__WEBPACK_IMPORTED_MODULE_1__.paintTable)(); // SHOW EVENT`S FOR NEW SELECTED CHARTER

document.querySelector('select.members').addEventListener('change', function (event) {
  (0,_onload__WEBPACK_IMPORTED_MODULE_1__.clearCalendar)();
  showEvents((0,_main__WEBPACK_IMPORTED_MODULE_0__.searchUserById)(event.target.value));
}); // SHOW ACTIVE EVENTS IN TABLE

var showEvents = function showEvents(user) {
  var idEvents = user.activeEvents; // SHOW SELECTED CHARTER IN HEADER OF TABLE

  document.querySelector('#row-1_col-1').textContent = user.name;

  var _loop = function _loop(i) {
    // SEARCH EVENT`S ID WITCH SELECTED CHARTER JOINED
    idEvents.map(function (id) {
      if (_main__WEBPACK_IMPORTED_MODULE_0__.Data.events[i].eventId === Number(id)) {
        // DISPLAY ACTIVE EVENT IN TABLE
        var active = document.querySelector("#row-".concat(_main__WEBPACK_IMPORTED_MODULE_0__.Data.events[i].time - 8, "_col-").concat(_main__WEBPACK_IMPORTED_MODULE_0__.Data.events[i].day + 1));
        active.classList.add('active');
        active.setAttribute('value', "".concat(_main__WEBPACK_IMPORTED_MODULE_0__.Data.events[i].eventId)); // WRITE EVENT NAME TO CELL IN TABLE

        var eventTitle = document.createElement('span');
        eventTitle.setAttribute('class', 'eventTitle');
        eventTitle.innerHTML = _main__WEBPACK_IMPORTED_MODULE_0__.Data.events[i].eventName;
        active.appendChild(eventTitle); // CREATE 'DELETE' BUTTON INSIDE CELL

        var deleteButton = document.createElement('div');
        deleteButton.setAttribute('class', 'deleteButton');
        active.classList.add('active');
        active.appendChild(deleteButton);
        return true;
      }

      return false;
    });
  };

  for (var i = 0; i < _main__WEBPACK_IMPORTED_MODULE_0__.Data.events.length; i++) {
    _loop(i);
  } // GIVE EVENT LISTENERS TO ALL 'DELETE' BUTTONS IN ACTIVE EVENT CELLS


  (0,_deleteEvent__WEBPACK_IMPORTED_MODULE_3__.giveListeners)();
}; // SHOW MODAL WINDOW TO CREATE NEW EVENT


document.querySelector('button#newEvent').addEventListener('click', function () {
  document.querySelector('div.popup').style = 'display : block;';
  var error = document.querySelector('div.error');
  if (error.classList.contains('showError')) error.classList.remove('showError');
}); // CLOSE MODAL WINDOW TO CREATE NEW EVENT

document.querySelector('div.btn_cancel').addEventListener('click', function () {
  document.querySelector('div.popup').style = 'display : none;';
  (0,_createNewEvent__WEBPACK_IMPORTED_MODULE_2__.clearSelects)();
  var error = document.querySelector('div.error');
  if (error.classList.contains('showError')) error.classList.remove('showError');
}); // HIDE MODAL WINDOW 'DELETE EVENT'

document.querySelector('#delete-cancel').addEventListener('click', function () {
  document.querySelector('div.delete-popup').style = 'display: none';
}); // CALL FUNCTION TO CREATE OPTIONS TO SELECT IN MODAL WINDOW

(0,_createNewEvent__WEBPACK_IMPORTED_MODULE_2__.newEventUsers)(_main__WEBPACK_IMPORTED_MODULE_0__.Data.users); // ADD LISTENER TO HIDE ERROR

document.querySelector('#deleteError').addEventListener('click', function () {
  (0,_createNewEvent__WEBPACK_IMPORTED_MODULE_2__.clearError)();
});


/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Data": () => (/* binding */ Data),
/* harmony export */   "saveData": () => (/* binding */ saveData),
/* harmony export */   "searchUserById": () => (/* binding */ searchUserById),
/* harmony export */   "searchEventById": () => (/* binding */ searchEventById)
/* harmony export */ });
// CREATE OBJECT WITH DATA OF USERS AND EVENTS
var Data = {
  users: [],
  events: []
}; // CREATE MASSIVE FOR LOCAL STORAGE DATA

var localUsers = [];
var localEvents = []; // CHECK IF LOCAL STORAGE IS EMPTY

if (localStorage.getItem('users')) {
  // SET NEW DATA FOR 'DATA.USERS'
  localUsers = JSON.parse(localStorage.getItem('users'));
  Data.users = localUsers;
} else {
  // SET DEFAULT DATA FOR FIRST LOAD PAGE
  Data.users = [{
    name: 'All',
    id: '0',
    activeEvents: [1, 2, 3]
  }, {
    name: 'Alex',
    id: '1',
    activeEvents: [1, 3]
  }, {
    name: 'Dmitri',
    id: '2',
    activeEvents: [1, 2, 3]
  }, {
    name: 'Valeria',
    id: '3',
    activeEvents: [3]
  }];
} // CHECK IF LOCAL STORAGE IS EMPTY


if (localStorage.getItem('events')) {
  // SET NEW DATA FOR 'DATA.EVENTS'
  localEvents = JSON.parse(localStorage.getItem('events'));
  Data.events = localEvents;
} else {
  // SET DEFAULT DATA FOR FIRST LOAD PAGE
  Data.events = [{
    eventName: 'First meeting',
    eventId: 1,
    day: 1,
    time: 10
  }, {
    eventName: 'Data Structures',
    eventId: 2,
    day: 5,
    time: 14
  }, {
    eventName: 'Second meeting',
    eventId: 3,
    day: 3,
    time: 12
  }];
} // SEARCH MEMBER IN DATA BY ID


var searchUserById = function searchUserById(userId) {
  for (var i = 0; i < Data.users.length; i++) {
    if (Data.users[i].id === String(userId)) {
      return Data.users[i];
    }
  }
}; // SEARCH EVENT IN DATA BY ID


var searchEventById = function searchEventById(eventId) {
  for (var i = 0; i < Data.events.length; i++) {
    if (Data.events[i].eventId === Number(eventId)) {
      return Data.events[i];
    }
  }
}; // SAVE DATA OF USERS AND EVENT`S TO LOCAL STORAGE


var saveData = function saveData() {
  localStorage.setItem('users', JSON.stringify(Data.users));
  localStorage.setItem('events', JSON.stringify(Data.events));
};



/***/ }),

/***/ "./src/onload.js":
/*!***********************!*\
  !*** ./src/onload.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "paintTable": () => (/* binding */ paintTable),
/* harmony export */   "addMembers": () => (/* binding */ addMembers),
/* harmony export */   "clearCalendar": () => (/* binding */ clearCalendar)
/* harmony export */ });
// ADD MEMBERS TO HEADER SELECT
var addMembers = function addMembers(options) {
  var choseMember = document.querySelector('select.members');

  for (var i = 0; i < options.length; i++) {
    var member = document.createElement('option');
    member.innerHTML = options[i].name;
    member.setAttribute('class', 'members_item');
    member.setAttribute('value', "".concat(options[i].id));
    member.setAttribute('id', "member_".concat(options[i].name));
    choseMember.appendChild(member);
  }
}; // CLEAR EVENT`S FROM TABLE


var clearCalendar = function clearCalendar() {
  var events = document.querySelectorAll('td.active');

  for (var i = 0; i < events.length; i++) {
    events[i].innerHTML = '';
    events[i].classList.remove('active');
  }
}; // DRAW TABLE


var paintTable = function paintTable() {
  var headerTittle = ['Person', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  var meetTime = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
  var selectTable = document.querySelector('table');
  var table = selectTable.appendChild(document.createElement('tbody')); // CREATE ROWS

  for (var i = 0; i < 10; i++) {
    var row = document.createElement('tr');
    row.setAttribute('class', "table_row row_".concat(i + 1));
    table.appendChild(row); // CREATE COLUMNS

    for (var j = 0; j < 6; j++) {
      // WRITE HEADER OF TABLE
      if (i === 0) {
        var headerTable = document.createElement('th');
        headerTable.innerHTML = headerTittle[j];
        headerTable.setAttribute('class', "table_col col_".concat(j + 1));
        headerTable.setAttribute('id', "row-".concat(i + 1, "_col-").concat(j + 1));
        row.appendChild(headerTable); // WRITE OTHER`S CELLS
      } else {
        var _headerTable = document.createElement('td');

        _headerTable.setAttribute('class', "table_col col_".concat(j + 1));

        _headerTable.setAttribute('id', "row-".concat(i + 1, "_col-").concat(j + 1)); // WRITE THE MEETING TIME COLUMN IN TABLE


        row.appendChild(_headerTable);
        var tableRow = i;
        var tableColumn = j;

        if (tableColumn === 0 && tableRow !== 0) {
          _headerTable.innerHTML = meetTime[tableRow - 1];
        }
      }
    }
  }
};



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	__webpack_require__("./src/index.js");
/******/ })()
;