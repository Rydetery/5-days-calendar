import {
  Data, saveData, searchEventById, searchUserById,
} from './main';
import { clearCalendar } from './onload';
import { showEvents } from './index';

// GIVE LISTENERS TO ALL 'DELETE BUTTONS' IN TABLE
const giveListeners = () => {
  const deleteButtons = document.querySelectorAll('div.deleteButton');
  // SHOW MODAL WINDOW 'DELETE EVENT' AND SELECT ID OF DELETING EVENT
  function updateListener(e) {
    document.querySelector('div.delete-popup').style = 'display: block';
    // TAKE PARENT 'VALUE' THAT EQUALS EVENT ID
    const parent = e.target.parentNode;
    const parentValue = parent.getAttribute('value');
    const searchEvent = searchEventById(parentValue);
    document.querySelector('span#event-name').innerHTML = searchEvent.eventName;
    // ADD LISTENER TO CONFIRM DELETING EVENT
    document.querySelector('#delete-confirm').addEventListener('click', () => {
      deleteEvent(parentValue);
      document.querySelector('div.delete-popup').style = 'display: none';
      const selected = document.querySelector('select.members').value;
      // CLEAR TABLE
      clearCalendar();
      // SHOW ACTIVE EVENT`S FOR SELECTED MEMBER
      showEvents(searchUserById(selected));
      // SAVE DATA TO LOCAL STORAGE
      saveData();
    });
  }
  for (const item of deleteButtons) {
    // CHECK IF IT BUTTON FOR 'HIDE ERROR' IN MODAL WINDOW 'NEW EVENT'
    if (!item.hasAttribute('id')) {
      item.addEventListener('click', updateListener);
    }
  }
};
// SEARCH AND DELETE EVENT FROM DATA
const deleteEvent = (id) => {
  // SEARCH ID IN EVENTS AND DELETE IT
  Data.events.map((item, index, array) => {
    if (item.eventId == id) { array.splice(index, 1); }
  });
  // SEARCH ID IN USERS AND DELETE IT
  const participants = Data.users;
  participants.map((item) => {
    item.activeEvents.map((item, index, array) => {
      if (item === Number(id)) {
        array.splice(index, 1);
      }
    });
  });
  // SAVE CHANGES IN DATA
  saveData();
};
export { giveListeners };
