document.getElementById("timetableForm").addEventListener("submit", function(e) {
  e.preventDefault();
  
  const subjects = document.getElementById("subjects").value.split(",").map(s => s.trim());
  const hoursPerDay = parseInt(document.getElementById("hoursPerDay").value);
  const selectedDays = Array.from(document.getElementById("studyDays").selectedOptions).map(opt => opt.value);

  generateTimetable(subjects, hoursPerDay, selectedDays);
});

function generateTimetable(subjects, hoursPerDay, selectedDays) {
  const timetable = {};

  // Initialize timetable
  selectedDays.forEach(day => {
    timetable[day] = [];
  });

  let subjectIndex = 0;

  selectedDays.forEach(day => {
    for (let i = 0; i < hoursPerDay; i++) {
      timetable[day].push(subjects[subjectIndex % subjects.length]);
      subjectIndex++;
    }
  });

  displayTimetable(timetable);
}

function displayTimetable(timetable) {
  const output = document.getElementById("outputTimetable");
  output.innerHTML = "<h2>Your Timetable:</h2>";

  for (const day in timetable) {
    output.innerHTML += `<h3>${day}</h3><ul>`;
    timetable[day].forEach((subj, index) => {
      output.innerHTML += `<li>Hour ${index + 1}: ${subj}</li>`;
    });
    output.innerHTML += "</ul>";
  }
}
