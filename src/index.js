import { Data, searchUserById } from './main';
import { paintTable, addMembers, clearCalendar } from './onload';
import { newEventUsers, clearSelects, clearError } from './createNewEvent';
import { giveListeners } from './deleteEvent';

// ADD PARTICIPANTS TO SELECT IN HEADER
addMembers(Data.users);
// DRAW TABLE
paintTable();

// SHOW EVENT`S FOR NEW SELECTED CHARTER
document.querySelector('select.members').addEventListener('change', (event) => {
  clearCalendar();
  showEvents(searchUserById(event.target.value));
});

// SHOW ACTIVE EVENTS IN TABLE
const showEvents = (user) => {
  const idEvents = user.activeEvents;
  // SHOW SELECTED CHARTER IN HEADER OF TABLE
  document.querySelector('#row-1_col-1').textContent = user.name;
  for (let i = 0; i < Data.events.length; i++) {
    // SEARCH EVENT`S ID WITCH SELECTED CHARTER JOINED
    idEvents.map((id) => {
      if (Data.events[i].eventId === Number(id)) {
        // DISPLAY ACTIVE EVENT IN TABLE
        const active = document.querySelector(`#row-${(Data.events[i].time - 8)}_col-${(Data.events[i].day + 1)}`);
        active.classList.add('active');
        active.setAttribute('value', `${Data.events[i].eventId}`);
        // WRITE EVENT NAME TO CELL IN TABLE
        const eventTitle = document.createElement('span');
        eventTitle.setAttribute('class', 'eventTitle');
        eventTitle.innerHTML = Data.events[i].eventName;
        active.appendChild(eventTitle);
        // CREATE 'DELETE' BUTTON INSIDE CELL
        const deleteButton = document.createElement('div');
        deleteButton.setAttribute('class', 'deleteButton');
        active.classList.add('active');
        active.appendChild(deleteButton);
        return true;
      }
      return false;
    });
  }
  // GIVE EVENT LISTENERS TO ALL 'DELETE' BUTTONS IN ACTIVE EVENT CELLS
  giveListeners();
};

// SHOW MODAL WINDOW TO CREATE NEW EVENT
document.querySelector('button#newEvent').addEventListener('click', () => {
  document.querySelector('div.popup').style = 'display : block;';
  const error = document.querySelector('div.error');
  if (error.classList.contains('showError')) error.classList.remove('showError');
});

// CLOSE MODAL WINDOW TO CREATE NEW EVENT
document.querySelector('div.btn_cancel').addEventListener('click', () => {
  document.querySelector('div.popup').style = 'display : none;';
  clearSelects();
  const error = document.querySelector('div.error');
  if (error.classList.contains('showError')) error.classList.remove('showError');
});
// HIDE MODAL WINDOW 'DELETE EVENT'
document.querySelector('#delete-cancel').addEventListener('click', () => {
  document.querySelector('div.delete-popup').style = 'display: none';
});

// CALL FUNCTION TO CREATE OPTIONS TO SELECT IN MODAL WINDOW
newEventUsers(Data.users);

// ADD LISTENER TO HIDE ERROR
document.querySelector('#deleteError').addEventListener('click', () => {
  clearError();
});

export { showEvents };
