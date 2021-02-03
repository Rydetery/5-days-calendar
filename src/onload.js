// ADD MEMBERS TO HEADER SELECT
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
// CLEAR EVENT`S FROM TABLE
const clearCalendar = () => {
  const events = document.querySelectorAll('td.active');
  for (let i = 0; i < events.length; i++) {
    events[i].innerHTML = '';
    events[i].classList.remove('active');
  }
};
// DRAW TABLE
const paintTable = () => {
  const headerTittle = ['Person', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const meetTime = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
  const selectTable = document.querySelector('table');
  const table = selectTable.appendChild(document.createElement('tbody'));
  // CREATE ROWS
  for (let i = 0; i < 10; i++) {
    const row = document.createElement('tr');
    row.setAttribute('class', `table_row row_${i + 1}`);
    table.appendChild(row);
    // CREATE COLUMNS
    for (let j = 0; j < 6; j++) {
      // WRITE HEADER OF TABLE
      if (i === 0) {
        const headerTable = document.createElement('th');
        headerTable.innerHTML = headerTittle[j];
        headerTable.setAttribute('class', `table_col col_${j + 1}`);
        headerTable.setAttribute('id', `row-${i + 1}_col-${j + 1}`);
        row.appendChild(headerTable);
        // WRITE OTHER`S CELLS
      } else {
        const headerTable = document.createElement('td');
        headerTable.setAttribute('class', `table_col col_${j + 1}`);
        headerTable.setAttribute('id', `row-${i + 1}_col-${j + 1}`);
        // WRITE THE MEETING TIME COLUMN IN TABLE
        row.appendChild(headerTable);
        const tableRow = i;
        const tableColumn = j;
        if (tableColumn === 0 && tableRow !== 0) {
          headerTable.innerHTML = meetTime[tableRow - 1];
        }
      }
    }
  }
};

export { paintTable, addMembers, clearCalendar };
