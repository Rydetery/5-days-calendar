// CREATE OBJECT WITH DATA OF USERS AND EVENTS
const Data = {
  users: [],
  events: [],
};
// CREATE MASSIVE FOR LOCAL STORAGE DATA
let localUsers = [];
let localEvents = [];
// CHECK IF LOCAL STORAGE IS EMPTY
if (localStorage.getItem('users')) {
  // SET NEW DATA FOR 'DATA.USERS'
  localUsers = JSON.parse(localStorage.getItem('users'));
  Data.users = localUsers;
} else {
  // SET DEFAULT DATA FOR FIRST LOAD PAGE
  Data.users = [
    { name: 'All', id: '0', activeEvents: [1, 2, 3] },
    { name: 'Alex', id: '1', activeEvents: [1, 3] },
    { name: 'Dmitri', id: '2', activeEvents: [1, 2, 3] },
    { name: 'Valeria', id: '3', activeEvents: [3] },
  ];
}
// CHECK IF LOCAL STORAGE IS EMPTY
if (localStorage.getItem('events')) {
  // SET NEW DATA FOR 'DATA.EVENTS'
  localEvents = JSON.parse(localStorage.getItem('events'));
  Data.events = localEvents;
} else {
  // SET DEFAULT DATA FOR FIRST LOAD PAGE
  Data.events = [
    {
      eventName: 'First meeting', eventId: 1, day: 1, time: 10,
    },
    {
      eventName: 'Data Structures', eventId: 2, day: 5, time: 14,
    },
    {
      eventName: 'Second meeting', eventId: 3, day: 3, time: 12,
    },
  ];
}
// SEARCH MEMBER IN DATA BY ID
const searchUserById = (userId) => {
  for (let i = 0; i < Data.users.length; i++) {
    if (Data.users[i].id === String(userId)) {
      return Data.users[i];
    }
  }
};
// SEARCH EVENT IN DATA BY ID
const searchEventById = (eventId) => {
  for (let i = 0; i < Data.events.length; i++) {
    if (Data.events[i].eventId === Number(eventId)) {
      return Data.events[i];
    }
  }
};
// SAVE DATA OF USERS AND EVENT`S TO LOCAL STORAGE
const saveData = () => {
  localStorage.setItem('users', JSON.stringify(Data.users));
  localStorage.setItem('events', JSON.stringify(Data.events));
};

export {
  Data, saveData, searchUserById, searchEventById,
};
