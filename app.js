
"use strict";

const STORAGE_KEY = "agripsc_lms_v1";

const defaultData = {
  syllabus: {},
  tasks: [],
  journals: [],
  mcqResults: [],
  studyHours: 0,
  dailyGoal: 4,
  theme: "light"
};

let data = loadData();
let currentQuestions = [];
let currentQuestionIndex = 0;
let sessionAnswers = [];

function loadData() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return { ...defaultData, ...(saved || {}) };
  } catch {
    return structuredClone(defaultData);
  }
}

function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  updateDashboard();
}

function toast(message) {
  const el = document.getElementById("toast");
  el.textContent = message;
  el.classList.add("show");
  setTimeout(() => el.classList.remove("show"), 2500);
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}

function todayISO() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function formatDate(date) {
  return new Date(date + "T00:00:00").toLocaleDateString(undefined, {
    year: "numeric", month: "short", day: "numeric"
  });
}

function topicKey(sectionId, index) {
  return `${sectionId}::${index}`;
}

function getTopicStatus(sectionId, index) {
  return data.syllabus[topicKey(sectionId, index)] || {
    status: "pending",
    revision: false
  };
}

function allTopics() {
  return SYLLABUS.flatMap(section =>
    section.topics.map((topic, index) => ({
      section,
      topic,
      index,
      key: topicKey(section.id, index),
      state: getTopicStatus(section.id, index)
    }))
  );
}

function getProgress() {
  const topics = allTopics();
  const completed = topics.filter(t => t.state.status === "completed").length;
  const inProgress = topics.filter(t => t.state.status === "inprogress").length;
  const percent = topics.length ? Math.round(completed / topics.length * 100) : 0;
  return { total: topics.length, completed, inProgress, percent };
}

/* Navigation */

function navigate(page) {
  document.querySelectorAll(".page").forEach(el => el.classList.remove("active"));
  document.querySelectorAll(".nav-link").forEach(el => el.classList.remove("active"));

  const pageElement = document.getElementById(`page-${page}`);
  if (!pageElement) return;

  pageElement.classList.add("active");

  const nav = document.querySelector(`[data-page="${page}"]`);
  if (nav) nav.classList.add("active");

  const title = nav ? nav.textContent.trim() : page;
  document.getElementById("pageTitle").textContent = title;

  document.getElementById("sidebar").classList.remove("open");

  if (page === "syllabus") renderSyllabus();
  if (page === "planner") renderTasks();
  if (page === "revision") renderRevision();
  if (page === "analytics") renderAnalytics();
  if (page === "journal") renderJournals();
  if (page === "dashboard") updateDashboard();
}

document.querySelectorAll(".nav-link").forEach(button => {
  button.addEventListener("click", () => navigate(button.dataset.page));
});

document.querySelectorAll("[data-go]").forEach(button => {
  button.addEventListener("click", () => navigate(button.dataset.go));
});

document.getElementById("sidebarToggle").addEventListener("click", () => {
  document.getElementById("sidebar").classList.toggle("open");
});

/* Theme */

function applyTheme() {
  document.documentElement.dataset.theme = data.theme;
  document.querySelector("#themeToggle i").className =
    data.theme === "dark" ? "fa-solid fa-sun" : "fa-solid fa-moon";
}

document.getElementById("themeToggle").addEventListener("click", () => {
  data.theme = data.theme === "dark" ? "light" : "dark";
  applyTheme();
  saveData();
});

/* Dashboard */

function updateDashboard() {
  const progress = getProgress();
  const completedTasks = data.tasks.filter(t => t.done).length;
  const totalMCQ = data.mcqResults.length;
  const correctMCQ = data.mcqResults.filter(r => r.correct).length;

  document.getElementById("statSyllabus").textContent = `${progress.percent}%`;
  document.getElementById("statHours").textContent = data.studyHours.toFixed(1);
  document.getElementById("statMCQ").textContent = totalMCQ;
  document.getElementById("statTasks").textContent = completedTasks;

  document.getElementById("overallRing").textContent = `${progress.percent}%`;
  document.getElementById("overallBar").style.width = `${progress.percent}%`;
  document.getElementById("completedTopics").textContent =
    `${progress.completed} of ${progress.total} topics completed`;

  const todayTasks = data.tasks.filter(t => t.date === todayISO());
  document.getElementById("dashboardTasks").innerHTML = todayTasks.length
    ? todayTasks.map(t => `
      <div class="task-item ${t.done ? "done" : ""}">
        <div><strong>${escapeHTML(t.title)}</strong>
        <small>${escapeHTML(t.subject)} · ${t.duration} hours</small></div>
      </div>`).join("")
    : `<div class="empty-state">No study tasks scheduled for today.</div>`;

  const goal = Number(data.dailyGoal) || 4;
  const todayHours = data.tasks
    .filter(t => t.date === todayISO() && t.done)
    .reduce((sum, t) => sum + Number(t.duration), 0);

  const goalPercent = Math.min(100, Math.round(todayHours / goal * 100));
  document.getElementById("dailyGoalBar").style.width = `${goalPercent}%`;
  document.getElementById("dailyGoalText").textContent =
    `${todayHours.toFixed(1)} / ${goal} hours`;

  document.getElementById("paperDistribution").innerHTML = [
    { id: "paper1", name: "Paper I" },
    { id: "paper2", name: "Paper II" }
  ].map(paper => {
    const topics = allTopics().filter(t => t.section.paper === paper.id);
    const done = topics.filter(t => t.state.status === "completed").length;
    const percent = topics.length ? Math.round(done / topics.length * 100) : 0;
    return `
      <div class="distribution-item">
        <div class="task-item">
          <strong>${paper.name}</strong>
          <small>${percent}%</small>
        </div>
        <div class="progress-track"><div class="progress-fill" style="width:${percent}%"></div></div>
      </div>`;
  }).join("");

  document.getElementById("mcqAttempted").textContent = totalMCQ;
  document.getElementById("mcqCorrect").textContent = correctMCQ;
  document.getElementById("mcqAccuracy").textContent =
    `${totalMCQ ? Math.round(correctMCQ / totalMCQ * 100) : 0}%`;

  document.getElementById("analyticsCompletion").textContent = `${progress.percent}%`;
  document.getElementById("analyticsHours").textContent = data.studyHours.toFixed(1);
  document.getElementById("analyticsAccuracy").textContent =
    `${totalMCQ ? Math.round(correctMCQ / totalMCQ * 100) : 0}%`;
  document.getElementById("analyticsTasks").textContent = completedTasks;
}

/* Syllabus tracker */

function renderSyllabus() {
  const container = document.getElementById("syllabusContainer");
  const search = document.getElementById("syllabusSearch").value.toLowerCase();
  const paper = document.getElementById("paperFilter").value;
  const status = document.getElementById("statusFilter").value;

  const sections = SYLLABUS.filter(section =>
    (paper === "all" || section.paper === paper) &&
    section.topics.some((topic, index) => {
      const state = getTopicStatus(section.id, index);
      return topic.toLowerCase().includes(search) &&
        (status === "all" || state.status === status);
    })
  );

  container.innerHTML = sections.map(section => {
    const rows = section.topics.map((topic, index) => {
      const state = getTopicStatus(section.id, index);
      const matches = topic.toLowerCase().includes(search);
      const statusMatches = status === "all" || state.status === status;

      if (!matches || !statusMatches) return "";

      return `
        <div class="syllabus-topic">
          <p>${escapeHTML(topic)}</p>
          <select aria-label="Topic status"
            onchange="changeTopicStatus('${section.id}',${index},this.value)">
            <option value="pending" ${state.status === "pending" ? "selected" : ""}>Not Started</option>
            <option value="inprogress" ${state.status === "inprogress" ? "selected" : ""}>In Progress</option>
            <option value="completed" ${state.status === "completed" ? "selected" : ""}>Completed</option>
          </select>
          <label class="revision-check" title="Add to revision">
            <input type="checkbox" ${state.revision ? "checked" : ""}
              onchange="toggleRevision('${section.id}',${index},this.checked)">
            <span>Revise</span>
          </label>
        </div>`;
    }).join("");

    const completed = section.topics.filter((_, i) =>
      getTopicStatus(section.id, i).status === "completed").length;

    return `
      <details class="syllabus-section" open>
        <summary>
          ${escapeHTML(section.title)}
          <span style="float:right;color:var(--primary)">
            ${completed}/${section.topics.length} · ${section.marks} marks
          </span>
          <div class="progress-track">
            <div class="progress-fill" style="width:${Math.round(completed / section.topics.length * 100)}%"></div>
          </div>
          <small>${escapeHTML(section.paper === "paper1" ? "Paper I" : "Paper II")} · ${escapeHTML(section.section)}</small>
        </summary>
        ${rows || '<p class="empty-state">No matching topics.</p>'}
      </details>`;
  }).join("") || `<div class="panel empty-state">No syllabus topics match your filters.</div>`;

  updateDashboard();
}

function changeTopicStatus(sectionId, index, status) {
  const key = topicKey(sectionId, index);
  data.syllabus[key] = {
    ...getTopicStatus(sectionId, index),
    status
  };
  saveData();
  renderSyllabus();
  toast("Syllabus progress updated.");
}

function toggleRevision(sectionId, index, checked) {
  const key = topicKey(sectionId, index);
  data.syllabus[key] = {
    ...getTopicStatus(sectionId, index),
    revision: checked
  };
  saveData();
  toast(checked ? "Added to revision centre." : "Removed from revision.");
}

["syllabusSearch", "paperFilter", "statusFilter"].forEach(id => {
  document.getElementById(id).addEventListener(
    id === "syllabusSearch" ? "input" : "change", renderSyllabus
  );
});

/* Study planner */

document.getElementById("taskDate").value = todayISO();

document.getElementById("taskForm").addEventListener("submit", event => {
  event.preventDefault();

  const task = {
    id: crypto.randomUUID(),
    title: document.getElementById("taskTitle").value.trim(),
    date: document.getElementById("taskDate").value,
    duration: Number(document.getElementById("taskDuration").value),
    subject: document.getElementById("taskSubject").value,
    done: false
  };

  if (!task.title || !task.date || task.duration <= 0) return;

  data.tasks.push(task);
  saveData();
  event.target.reset();
  document.getElementById("taskDate").value = todayISO();
  document.getElementById("taskDuration").value = 1;
  renderTasks();
  toast("Study task added.");
});

function renderTasks() {
  const container = document.getElementById("allTasks");

  const tasks = [...data.tasks].sort((a, b) => a.date.localeCompare(b.date));

  container.innerHTML = tasks.length ? tasks.map(task => `
    <div class="task-item ${task.done ? "done" : ""}">
      <div>
        <strong>${escapeHTML(task.title)}</strong>
        <small>${formatDate(task.date)} · ${escapeHTML(task.subject)} · ${task.duration} hours</small>
      </div>
      <div class="task-actions">
        <button class="small-btn" onclick="toggleTask('${task.id}')">
          ${task.done ? "Undo" : "Complete"}
        </button>
        <button class="small-btn" onclick="deleteTask('${task.id}')">Delete</button>
      </div>
    </div>`).join("") : `<div class="empty-state">No tasks added yet.</div>`;
}

function toggleTask(id) {
  const task = data.tasks.find(t => t.id === id);
  if (!task) return;

  const wasDone = task.done;
  task.done = !task.done;

  if (!wasDone) data.studyHours += Number(task.duration);
  else data.studyHours = Math.max(0, data.studyHours - Number(task.duration));

  saveData();
  renderTasks();
}

function deleteTask(id) {
  const task = data.tasks.find(t => t.id === id);
  if (!task) return;

  if (task.done) data.studyHours = Math.max(0, data.studyHours - Number(task.duration));

  data.tasks = data.tasks.filter(t => t.id !== id);
  saveData();
  renderTasks();
  toast("Task deleted.");
}

/* Revision centre */

function renderRevision() {
  const items = allTopics().filter(t => t.state.revision);
  const container = document.getElementById("revisionList");

  container.innerHTML = items.length ? items.map(item => `
    <div class="task-item">
      <div>
        <strong>${escapeHTML(item.topic)}</strong>
        <small>${escapeHTML(item.section.title)}</small>
      </div>
      <button class="small-btn" onclick="removeRevision('${item.section.id}',${item.index})">Remove</button>
    </div>`).join("") : `<div class="empty-state">No revision topics yet. Mark syllabus topics for revision.</div>`;
}

function removeRevision(sectionId, index) {
  toggleRevision(sectionId, index, false);
  renderRevision();
}

/* MCQ practice */

const QUESTION_BANK = [
  {
    subject: "Agricultural Extension",
    question: "Which of the following is a key principle of extension education?",
    options: ["Learning by doing", "Learning only through lectures", "One-way communication", "Avoiding farmer participation"],
    answer: 0,
    explanation: "Learning by doing is a central principle of extension education."
  },
  {
    subject: "Soil Science",
    question: "Which soil property is commonly represented by pH?",
    options: ["Soil texture", "Soil reaction", "Bulk density", "Soil colour"],
    answer: 1,
    explanation: "Soil pH is an indicator of soil reaction."
  },
  {
    subject: "Agronomy",
    question: "What does zero tillage primarily avoid?",
    options: ["Seed selection", "Soil disturbance by tillage", "Crop rotation", "Harvesting"],
    answer: 1,
    explanation: "Zero tillage establishes crops with little or no prior soil tillage."
  },
  {
    subject: "Agricultural Economics",
    question: "What does a demand curve generally show?",
    options: ["Relationship between price and quantity demanded", "Relationship between rainfall and yield", "Relationship between cost and soil pH", "Relationship between labour and seed rate"],
    answer: 0,
    explanation: "A demand curve shows the relationship between price and quantity demanded."
  },
  {
    subject: "Horticulture",
    question: "Which process describes water loss from plant surfaces?",
    options: ["Respiration", "Transpiration", "Pollination", "Germination"],
    answer: 1,
    explanation: "Transpiration is the loss of water vapour from plant surfaces."
  },
  {
    subject: "Plant Protection",
    question: "What is the primary purpose of pest surveillance?",
    options: ["Pest forecasting and early warning", "Increasing pesticide use", "Replacing crop rotation", "Reducing seed germination"],
    answer: 0,
    explanation: "Pest surveillance supports monitoring, forecasting and early warning."
  }
];

document.getElementById("startMCQ").addEventListener("click", () => {
  const subject = document.getElementById("mcqSubject").value;

  currentQuestions = subject === "all"
    ? [...QUESTION_BANK]
    : QUESTION_BANK.filter(q => q.subject === subject);

  if (!currentQuestions.length) {
    document.getElementById("mcqArea").textContent = "No sample questions available for this subject yet.";
    return;
  }

  currentQuestionIndex = 0;
  sessionAnswers = [];
  renderQuestion();
});

function renderQuestion() {
  const q = currentQuestions[currentQuestionIndex];
  const area = document.getElementById("mcqArea");

  if (!q) {
    finishMCQ();
    return;
  }

  area.innerHTML = `
    <small>Question ${currentQuestionIndex + 1} of ${currentQuestions.length} · ${escapeHTML(q.subject)}</small>
    <div class="mcq-question">${escapeHTML(q.question)}</div>
    <div id="mcqOptions">
      ${q.options.map((option, i) => `
        <label class="mcq-option">
          <input type="radio" name="mcqAnswer" value="${i}">
          ${String.fromCharCode(65 + i)}. ${escapeHTML(option)}
        </label>`).join("")}
    </div>
    <div id="mcqFeedback"></div>
    <div style="display:flex;justify-content:space-between;margin-top:15px">
      <button class="secondary-btn" id="submitAnswer">Submit Answer</button>
      <button class="primary-btn" id="nextQuestion" disabled>
        ${currentQuestionIndex === currentQuestions.length - 1 ? "Finish" : "Next"}
      </button>
    </div>`;

  document.getElementById("submitAnswer").addEventListener("click", submitAnswer);
  document.getElementById("nextQuestion").addEventListener("click", () => {
    currentQuestionIndex++;
    renderQuestion();
  });
}

function submitAnswer() {
  const selected = document.querySelector('input[name="mcqAnswer"]:checked');
  if (!selected) return toast("Select an answer first.");

  const q = currentQuestions[currentQuestionIndex];
  const answer = Number(selected.value);
  const correct = answer === q.answer;

  sessionAnswers.push({
    subject: q.subject,
    question: q.question,
    selected: answer,
    correctAnswer: q.answer,
    correct
  });

  data.mcqResults.push({
    date: new Date().toISOString(),
    subject: q.subject,
    question: q.question,
    correct
  });

  document.querySelectorAll('input[name="mcqAnswer"]').forEach(el => el.disabled = true);
  document.getElementById("submitAnswer").disabled = true;
  document.getElementById("nextQuestion").disabled = false;

  const feedback = document.getElementById("mcqFeedback");
  feedback.className = `mcq-feedback ${correct ? "correct" : "incorrect"}`;
  feedback.textContent = `${correct ? "Correct!" : "Incorrect."} ${q.explanation}`;

  saveData();
}

function finishMCQ() {
  const correct = sessionAnswers.filter(a => a.correct).length;
  const total = sessionAnswers.length;

  document.getElementById("mcqArea").innerHTML = `
    <h3>Practice Completed</h3>
    <p>You answered ${correct} out of ${total} questions correctly.</p>
    <h2>${total ? Math.round(correct / total * 100) : 0}%</h2>
    <button class="primary-btn" onclick="navigate('mcq')">Back to MCQ Centre</button>`;
  updateDashboard();
}

/* Journal */

document.getElementById("journalForm").addEventListener("submit", event => {
  event.preventDefault();

  data.journals.unshift({
    id: crypto.randomUUID(),
    title: document.getElementById("journalTitle").value.trim(),
    content: document.getElementById("journalContent").value.trim(),
    date: new Date().toISOString()
  });

  saveData();
  event.target.reset();
  renderJournals();
  toast("Journal entry saved.");
});

function renderJournals() {
  const container = document.getElementById("journalEntries");

  container.innerHTML = data.journals.length ? data.journals.map(entry => `
    <article class="journal-entry">
      <h3>${escapeHTML(entry.title)}</h3>
      <small>${new Date(entry.date).toLocaleString()}</small>
      <p>${escapeHTML(entry.content)}</p>
      <button class="small-btn" onclick="deleteJournal('${entry.id}')">Delete</button>
    </article>`).join("") : `<div class="empty-state">No journal entries yet.</div>`;
}

function deleteJournal(id) {
  data.journals = data.journals.filter(entry => entry.id !== id);
  saveData();
  renderJournals();
}

/* Analytics */

function renderAnalytics() {
  const papers = [
    { id: "paper1", name: "Paper I" },
    { id: "paper2", name: "Paper II" }
  ];

  document.getElementById("analyticsPapers").innerHTML = papers.map(paper => {
    const topics = allTopics().filter(t => t.section.paper === paper.id);
    const done = topics.filter(t => t.state.status === "completed").length;
    const percent = topics.length ? Math.round(done / topics.length * 100) : 0;

    return `
      <div style="margin:18px 0">
        <div class="task-item">
          <strong>${paper.name}</strong>
          <small>${done}/${topics.length} topics · ${percent}%</small>
        </div>
        <div class="progress-track">
          <div class="progress-fill" style="width:${percent}%"></div>
        </div>
      </div>`;
  }).join("");
}

/* Backup and restore */

document.getElementById("exportBackup").addEventListener("click", () => {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json"
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `AgriPSC-Backup-${todayISO()}.json`;
  a.click();
  URL.revokeObjectURL(url);
  toast("Backup downloaded.");
});

document.getElementById("restoreBackup").addEventListener("click", async () => {
  const file = document.getElementById("restoreFile").files[0];
  if (!file) return toast("Select a backup file.");

  try {
    const imported = JSON.parse(await file.text());

    if (!imported || typeof imported !== "object" ||
        !Array.isArray(imported.tasks) ||
        !Array.isArray(imported.journals) ||
        typeof imported.syllabus !== "object") {
      throw new Error("Invalid backup format");
    }

    data = { ...defaultData, ...imported };
    saveData();
    applyTheme();
    renderSyllabus();
    renderTasks();
    renderJournals();
    toast("Backup restored.");
  } catch {
    toast("Unable to restore this backup file.");
  }
});

/* Settings */

document.getElementById("goalInput").value = data.dailyGoal;

document.getElementById("saveSettings").addEventListener("click", () => {
  const value = Number(document.getElementById("goalInput").value);

  if (value < 1 || value > 24) return toast("Enter a goal between 1 and 24 hours.");

  data.dailyGoal = value;
  saveData();
  toast("Settings saved.");
});

document.getElementById("resetData").addEventListener("click", () => {
  if (!confirm("Are you sure? This will erase all local learning records.")) return;

  data = structuredClone(defaultData);
  saveData();
  applyTheme();
  renderSyllabus();
  renderTasks();
  renderJournals();
  document.getElementById("goalInput").value = data.dailyGoal;
  toast("Learning data reset.");
});

/* Initialization */

document.getElementById("todayDate").textContent =
  new Date().toLocaleDateString(undefined, {
    weekday: "long", year: "numeric", month: "long", day: "numeric"
  });

applyTheme();
updateDashboard();
renderSyllabus();
renderTasks();
renderJournals();
renderAnalytics();

/* Progressive Web App */
if ("serviceWorker" in navigator && location.protocol !== "file:") {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(error => {
      console.error("Service worker registration failed:", error);
    });
  });
}
