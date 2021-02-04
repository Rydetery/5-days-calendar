# __Calendar for the meeting room__
![GitHub repo size](https://img.shields.io/github/repo-size/Rydetery/5-days-calendar?color=green&logo=GitHub&logoColor=green&style=flat-square)  ![GitHub all releases](https://img.shields.io/github/downloads/Rydetery/5-days-calendar/total?logo=GitHub&logoColor=red&style=flat-square)
#### [![N|Solid](https://i.ibb.co/XsvhKFr/imgonline-com-ua-Resize-Km5w9t-Vzk-R.png)](https://rydetery.github.io/5-days-calendar) Calendar for the meeting room for __5__ working days from __10:00__ to __18:00__.
***
### Opportunities 
*    creation of events with a given day and time;
*    Creation of an event for one or several participants;
*    Removing an event;
*    Storing data about participants and events in localStorage, which allows you to save data even when the page is reloaded.
    
***
#
 __The use of object arrays made it possible to easily save and delete data, and automatically generate a new selection of participants in the table without changing the HTML code.__
#
_main.js_
```sh
Data = {
  users: [
    { name: 'All', id: '0', activeEvents: [1, 2, 3] },
    { name: 'Alex', id: '1', activeEvents: [1, 3] },
    { name: 'Dmitri', id: '2', activeEvents: [1, 2, 3] },
    { name: 'Valeria', id: '3', activeEvents: [3] }
    ],
  events: [ 
    { eventName: 'First meeting', eventId: 1, day: 1, time: 10 },
    { eventName: 'Data Structures', eventId: 2, day: 5, time: 14 },
    { eventName: 'Second meeting', eventId: 3, day: 3, time: 12 }
    ]
}
```
___
##### Function to create select above the table:
#
_onload.js_
```sh
    const addMembers = (options) => {
         const choseMember = document.querySelector('select.members');
         for (let i = 0; i < options.length; i++) {
            const member = document.createElement('option');
            member.innerHTML = options[i].name;
            member.setAttribute('class', 'members_item');
            member.setAttribute('value', `${options[i].id}`);
            member.setAttribute('id', `member_${options[i].name}`);
            choseMember.appendChild(member);
        }
    };
```
#
___Object with id: "0" is required to display all existing events.___

![N|Solid](https://i.ibb.co/Z2L69FC/image.jpg)
_The select in modal window for creating an event works the same._
***
#
## __Getting Start__
To install the project, please download it or clone, after load node modules of the project use command:
#### `npm install`
#
### __Aviable scripts__
To start the server use the command:
#### `npm run server `
###### Open http://localhost:8080 for viewing in a browser.
#
To check if JavaScript code meets the airbnb styleguide requirements use command:
#### `npm run lint`
#
### This project uses open-source technologies:

* [Babel] - JavaScript transcompiler
* [Webpack] - JavaScript module bundler
* [SCSS] - preprocessor for CSS
#
[Babel]: <https://babeljs.io/>
[Webpack]: <https://webpack.js.org/concepts/>
[SCSS]: <https://github.com/sass/sass>
 
