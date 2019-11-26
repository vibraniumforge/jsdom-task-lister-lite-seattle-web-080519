document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("create-task-form")
    .addEventListener("submit", e => clickSubmit(e));
});

let counter = 1;
let notesArray = [];
let editMode = false;
let noteId = null;

function clickSubmit(e) {
  e.preventDefault();
  let newTaskDescription = document.getElementById("new-task-description");
  let priority = document.getElementById("priority-select");
  let date = document.getElementById("date");
  const note = {
    id: noteId ? noteId : counter,
    text: newTaskDescription.value,
    priority: priority.value,
    date: date.value,
    numberValue: priority.selectedIndex
  };
  if (noteId && editMode) {
    notesArray.map(noteIterator => {
      if (noteIterator.id === noteId) {
        const x = notesArray.indexOf(noteIterator);
        notesArray[x] = note;
      }
    });
  } else {
    notesArray.push(note);
    counter++;
  }
  cycleNotes(notesArray);
  newTaskDescription.value = "";
  priority.value = "";
  date.value = "";
  editMode = false;
  noteId = null;
}

function cycleNotes(notesArray) {
  document.getElementById("tasks").innerHTML = "";
  const newNotesAr = notesArray.slice();
  newNotesAr.sort(function(a, b) {
    return a.numberValue - b.numberValue;
  });
  newNotesAr.forEach(note => appendOneNote(note));
}

function appendOneNote(note) {
  const tasksUl = document.getElementById("tasks");

  const li = document.createElement("li");
  const span = document.createElement("span");
  span.innerText = `${note.text} - ${note.priority} - ${note.date}`;
  span.id = counter;
  span.setAttribute("class", note.priority);

  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.addEventListener("click", () => deleteNote(note));

  const editBtn = document.createElement("button");
  editBtn.innerText = "Edit";
  editBtn.addEventListener("click", () => editNote(note));

  li.appendChild(span);
  li.appendChild(deleteBtn);
  li.appendChild(editBtn);

  tasksUl.appendChild(li);
}

function deleteNote(note) {
  const deletedNote = document.getElementById(note.id);
  deletedNote.parentNode.remove();
}

function editNote(note) {
  editMode = true;
  let newTaskDescription = document.getElementById("new-task-description");
  let priority = document.getElementById("priority-select");
  let date = document.getElementById("date");
  newTaskDescription.value = note.text;
  priority.value = note.priority;
  date.value = note.date;
  noteId = note.id;
  editMode = true;
}

// [x] A delete function that will remove tasks from your list
// [x] A priority value selected from a dropdown that is used to determine the color of the text in the list
// (e.g. red for high priority, yellow for medium, green for low)
// [x] As a challenge, implement a sorting functionality that displays the tasks ascending or descending order based on priority
// [x] An additional input field (e.g. user, duration, date due)
// [x] Ability to edit tasks
// Something of your choice! The main objective is to add a feature that allows the user's input to affect the DOM
