let students = [
  { firstName: "Cesar Oziel", surname: "Gutierrez", secondSurname: "Lopez", major: "LCC" },
  { firstName: "Luz Elena", surname: "Gutierrez", secondSurname: "Lopez", major: "LCC" },
  { firstName: "Gerardo", surname: "Gonzalez", secondSurname: "Lopez", major: "LCC" },
  { firstName: "Ana Sofia", surname: "Martinez", secondSurname: "Garza", major: "LMAD" },
  { firstName: "David", surname: "Rojas", secondSurname: "Silva", major: "LSTI" }
];

let currentState = {
  filterQuery: '',
  sortBy: null
};

const searchInput = document.getElementById('searchInput');
const clearFilterButton = document.getElementById('clearFilterButton');
const sortByNameButton = document.getElementById('sortByNameButton');
const sortBySurnameButton = document.getElementById('sortBySurnameButton');
const tableBody = document.querySelector("#studentsTable tbody");

const addStudentButton = document.getElementById('addStudentButton');
const newFirstNameInput = document.getElementById('newFirstName');
const newSurnameInput = document.getElementById('newSurname');
const newSecondSurnameInput = document.getElementById('newSecondSurname');
const newMajorSelect = document.getElementById('newMajor');

function renderStudents() {
  let studentsToDisplay = [...students];
  const filterText = currentState.filterQuery.toLowerCase().trim();

  if (filterText) {
    studentsToDisplay = studentsToDisplay.filter(s =>
      s.firstName.toLowerCase().includes(filterText) ||
      s.surname.toLowerCase().includes(filterText) ||
      s.secondSurname.toLowerCase().includes(filterText)
    );
  }

  if (currentState.sortBy === 'name') {
    studentsToDisplay.sort((a, b) => a.firstName.localeCompare(b.firstName, 'en', { sensitivity: 'base' }));
  } else if (currentState.sortBy === 'surname') {
    studentsToDisplay.sort((a, b) => a.surname.localeCompare(b.surname, 'en', { sensitivity: 'base' }));
  }
  
  updateTableDOM(studentsToDisplay);
}

function updateTableDOM(list) {
  tableBody.innerHTML = "";
  const fragment = document.createDocumentFragment();

  list.forEach(student => {
    const row = document.createElement('tr');

    const cellName = document.createElement('td');
    cellName.textContent = student.firstName;
    row.appendChild(cellName);

    const cellSurname = document.createElement('td');
    cellSurname.textContent = student.surname;
    row.appendChild(cellSurname);

    const cellSecondSurname = document.createElement('td');
    cellSecondSurname.textContent = student.secondSurname;
    row.appendChild(cellSecondSurname);
    
    const cellMajor = document.createElement('td');
    const majorBold = document.createElement('b');
    majorBold.textContent = student.major;
    cellMajor.appendChild(majorBold);
    row.appendChild(cellMajor);

    fragment.appendChild(row);
  });

  tableBody.appendChild(fragment);
}

function handleAddStudent() {
  const firstName = newFirstNameInput.value.trim();
  const surname = newSurnameInput.value.trim();
  const secondSurname = newSecondSurnameInput.value.trim();
  const newMajorInput = newMajorSelect.querySelector(':checked').value;
  const major = newMajorInput.toUpperCase();

  if (!firstName || !surname || !secondSurname || !major || major.toUpperCase() === ("CHOOSE...")) {
    alert("Please fill out all fields to add a student.");
    return;
  }

  students.push({ firstName, surname, secondSurname, major });
  
  clearAddForm();
  renderStudents();
}

function clearAddForm() {
  newFirstNameInput.value = "";
  newSurnameInput.value = "";
  newSecondSurnameInput.value = "";
  newMajorSelect.selectedIndex = 0;
}

searchInput.addEventListener('input', () => {
  currentState.filterQuery = searchInput.value;
  renderStudents();
});

clearFilterButton.addEventListener('click', () => {
  currentState.filterQuery = '';
  searchInput.value = '';
  renderStudents();
});

sortByNameButton.addEventListener('click', () => {
  currentState.sortBy = 'name';
  renderStudents();
});

sortBySurnameButton.addEventListener('click', () => {
  currentState.sortBy = 'surname';
  renderStudents();
});

addStudentButton.addEventListener('click', handleAddStudent);

renderStudents();