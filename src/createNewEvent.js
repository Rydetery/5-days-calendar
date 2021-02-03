import { Data, saveData, searchUserById } from './main';
import { clearCalendar } from './onload';
import { showEvents } from './index';

// CREATE NEW EVENT
const newEvent = (dataID) => {
  // CREATE OBJECT FOR NEW EVENT
  const newEvent = {
    eventName: document.querySelector('#newName').value,
    eventId: Data.events[(Data.events.length - 1)].eventId + 1,
    day: Number(document.querySelector('#day').value),
    time: Number(document.querySelector('#time').value),
  };
  // ADD OBJECT IN DATA
  Data.events.push(newEvent);
  Data.users[0].activeEvents.push(newEvent.eventId);
  // APPEND EVENT ID TO PARTICIPANTS WHO JOIN THIS EVENT
  if (dataID.length > 1) {
    dataID.map((element) => {
      searchUserById(element).activeEvents.push(newEvent.eventId);
    });
  } else {
    searchUserById(dataID).activeEvents.push(newEvent.eventId);
  }
  // REMOVE MODAL WINDOW 'NEW EVENT'
  document.querySelector('div.popup').style = 'display : none;';
  const selected = document.querySelector('select.members').value;
  // CLEAR FIELDS IN MODAL WINDOW AND TABLE
  clearCalendar();
  clearSelects();
  // SHOW ACTIVE EVENT`S FOR SELECTED PARTICIPANT IN TABLE
  showEvents(searchUserById(selected));
  // SAVE DATA IN LOCAL STORAGE
  saveData();
};

// 'CREATE' BUTTON IN MODAL WINDOW 'NEW EVENT'----------------------------------------------START----------------------------------------------
document.querySelector('div.btn_create').addEventListener('click', () => {
  // CHECK INPUTS FOR VALID DATA IN FORM
  let validation = true;
  const day = document.querySelector('#day').selectedIndex;
  const time = document.querySelector('#time').selectedIndex;
  // CHECK SELECTED DAY AND TIME
  if (day < 1 || time < 1) {
    const error = document.querySelector('div.error');
    error.querySelector('span').innerHTML = 'Failed to create event. Please select day and time for event.';
    error.classList.add('showError');
    setTimeout(clearError, 10000);
    validation = false;
  } else {
  // CHECK IF SELECTED TIME SLOT IS BOOKED
    for (let i = 0; i < Data.events.length; i++) {
      if (Data.events[i].day === Number(document.querySelector('#day').value) && Data.events[i].time === Number(document.querySelector('#time').value)) {
        const error = document.querySelector('div.error');
        error.querySelector('span').innerHTML = 'Failed to create event. This time slot is already booked.';
        error.classList.add('showError');
        setTimeout(clearError, 10000);
        validation = false;
      }
    }
  }
  // CHECK FOR SETTING NAME OF NEW EVENT
  if (Number(document.querySelector('#newName').value) === 0) {
    const error = document.querySelector('div.error');
    error.querySelector('span').innerHTML = 'Failed to create event. Please a give name to creating event.';
    error.classList.add('showError');
    setTimeout(clearError, 10000);
    validation = false;
  }
  // TAKE SELECTED PARTICIPANTS ID FROM VALUE IN 'PARTICIPANT-TITLE'
  let participantsID = document.querySelector('.participants-title').getAttribute('value');
  if (validation) {
    // CHECK IF NOONS SELECTED
    if (participantsID === null) {
      const error = document.querySelector('div.error');
      error.querySelector('span').innerHTML = 'Failed to create event. No one participant selected.';
      error.classList.add('showError');
      setTimeout(clearError, 10000);
      validation = false;
    } else {
      // CREATE MASSIVE OF PARTICIPANTS ID`S IF IT NEED
      if (participantsID.length > 1) {
        participantsID = participantsID.split('');
      }
      // CALL CREATE EVENT
      newEvent(participantsID);
    }
  } else {
    // CLEAR FORM FIELDS
    clearSelects();
  }
});
// 'CREATE' BUTTON IN MODAL WINDOW 'NEW EVENT'----------------------------------------------END-------------------------------------------------------------------

// HIDE ERROR MESSAGE
function clearError() {
  const error = document.querySelector('div.error');
  if (error.classList.contains('showError')) {
    error.classList.remove('showError');
  }
}

// CLEAR FIELD IN MODAL WINDOW 'NEW EVENT'
const clearSelects = () => {
  document.querySelector('#newName').value = '';
  document.querySelector('span.participants-title').innerHTML = 'Choose participants';
  document.querySelector('span.participants-title').removeAttribute('value');
  loadListeners();
  document.querySelector('#day').selectedIndex = 0;
  document.querySelector('#time').selectedIndex = 0;
};
// CREATE OPTIONS TO SELECT PRACTICAL`S IN MODAL WINDOW 'CREATE NEW EVENT'
const newEventUsers = (members) => {
  const parent = document.querySelector('div.participants-list');
  for (let i = 0; i < members.length; i++) {
    if (members[i].id !== '0') {
      const label = document.createElement('label');
      label.setAttribute('for', `participant-${members[i].id}`);
      label.textContent = members[i].name;
      const input = document.createElement('input');
      input.setAttribute('type', 'checkbox');
      input.setAttribute('id', `participant-${members[i].id}`);
      input.classList.add('participants-select');
      input.setAttribute('value', members[i].id);
      label.appendChild(input);
      parent.appendChild(label);
    }
  }
  // ADD EVENT LISTENERS TO ALL OPTIONS
  loadListeners();
};
// ADD EVENT LISTENERS TO ALL OPTIONS
const loadListeners = () => {
  const joinedParticipants = [];
  const input = document.querySelectorAll('.participants-select');
  // ADD EVENT LISTENERS TO ALL OPTIONS
  for (const item of input) {
    item.addEventListener('change', updateValue);
  }
  // ADD OR DELETE PRACTICAL NAME AND VALUE TO 'JOINED PARTICIPANTS' MASSIVE
  function updateValue(e) {
    for (let i = 0; i < joinedParticipants.length; i++) {
      // IF PARTICIPANT ALREADY JOINED - REMOVE HIM FROM EVENT, AND REMOVE IN 'JOINED PARTICIPANTS'
      if (joinedParticipants[i] === e.target.value) {
        const index = i;
        joinedParticipants.splice(index, 1);
        const title = (document.querySelector('.participants-title').textContent = joinedParticipants.map((el) => (searchUserById(el)).name).join(', '));
        document.querySelector('.participants-title').setAttribute('value', joinedParticipants.join(''));
        return title;
      }
    }
    // ADD PARTICIPANT TO EVENT
    joinedParticipants.push(e.target.value);
    const title = (document.querySelector('.participants-title').textContent = joinedParticipants.map((el) => (searchUserById(el)).name).join(', '));
    document.querySelector('.participants-title').setAttribute('value', joinedParticipants.join(''));
    return title;
  }
};

export { clearSelects, clearError, newEventUsers };
