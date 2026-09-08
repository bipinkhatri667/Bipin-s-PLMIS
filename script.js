/* =========================================================
   PLMS - PERSONAL LEARNING MANAGEMENT SYSTEM
========================================================= */


/* =========================================================
   SECURITY
========================================================= */

const SECURITY_CODE = "5831049276";


/* =========================================================
   DEFAULT DATA
========================================================= */

const defaultData = {

    dailyStudyHours: 2,

    topics: [

        /* PAPER I */

        {
            id: 1,
            paper: "Paper I",
            section: "General Awareness",
            topic: "Geography of Nepal",
            completed: false,
            revision: false,
            questions: 0,
            confidence: 1,
            hours: 0,
            notes: ""
        },

        {
            id: 2,
            paper: "Paper I",
            section: "General Awareness",
            topic: "History of Nepal",
            completed: false,
            revision: false,
            questions: 0,
            confidence: 1,
            hours: 0,
            notes: ""
        },

        {
            id: 3,
            paper: "Paper I",
            section: "General Awareness",
            topic: "Constitution of Nepal",
            completed: false,
            revision: false,
            questions: 0,
            confidence: 1,
            hours: 0,
            notes: ""
        },

        {
            id: 4,
            paper: "Paper I",
            section: "General Awareness",
            topic: "Governance",
            completed: false,
            revision: false,
            questions: 0,
            confidence: 1,
            hours: 0,
            notes: ""
        },

        {
            id: 5,
            paper: "Paper I",
            section: "General Awareness",
            topic: "Management Fundamentals",
            completed: false,
            revision: false,
            questions: 0,
            confidence: 1,
            hours: 0,
            notes: ""
        },

        {
            id: 6,
            paper: "Paper I",
            section: "General Awareness",
            topic: "Current Affairs",
            completed: false,
            revision: false,
            questions: 0,
            confidence: 1,
            hours: 0,
            notes: ""
        },

        {
            id: 7,
            paper: "Paper I",
            section: "General Reasoning",
            topic: "Verbal Reasoning",
            completed: false,
            revision: false,
            questions: 0,
            confidence: 1,
            hours: 0,
            notes: ""
        },

        {
            id: 8,
            paper: "Paper I",
            section: "General Reasoning",
            topic: "Numerical Reasoning",
            completed: false,
            revision: false,
            questions: 0,
            confidence: 1,
            hours: 0,
            notes: ""
        },

        {
            id: 9,
            paper: "Paper I",
            section: "General Reasoning",
            topic: "Logical Reasoning",
            completed: false,
            revision: false,
            questions: 0,
            confidence: 1,
            hours: 0,
            notes: ""
        },

        {
            id: 10,
            paper: "Paper I",
            section: "General Reasoning",
            topic: "Spatial / Non-verbal Reasoning",
            completed: false,
            revision: false,
            questions: 0,
            confidence: 1,
            hours: 0,
            notes: ""
        },

        {
            id: 11,
            paper: "Paper I",
            section: "General Reasoning",
            topic: "Data Interpretation",
            completed: false,
            revision: false,
            questions: 0,
            confidence: 1,
            hours: 0,
            notes: ""
        },


        /* PAPER II */

        {
            id: 12,
            paper: "Paper II",
            section: "Technical",
            topic: "History of Agriculture in Nepal",
            completed: false,
            revision: false,
            questions: 0,
            confidence: 1,
            hours: 0,
            notes: ""
        },

        {
            id: 13,
            paper: "Paper II",
            section: "Technical",
            topic: "Research, Extension & Education",
            completed: false,
            revision: false,
            questions: 0,
            confidence: 1,
            hours: 0,
            notes: ""
        },

        {
            id: 14,
            paper: "Paper II",
            section: "Technical",
            topic: "Natural Resources & Climate Change",
            completed: false,
            revision: false,
            questions: 0,
            confidence: 1,
            hours: 0,
            notes: ""
        },

        {
            id: 15,
            paper: "Paper II",
            section: "Technical",
            topic: "Agricultural Policies & Legislation",
            completed: false,
            revision: false,
            questions: 0,
            confidence: 1,
            hours: 0,
            notes: ""
        },

        {
            id: 16,
            paper: "Paper II",
            section: "Technical",
            topic: "Agricultural Technology & Management",
            completed: false,
            revision: false,
            questions: 0,
            confidence: 1,
            hours: 0,
            notes: ""
        },

        {
            id: 17,
            paper: "Paper II",
            section: "Technical",
            topic: "Soil Science",
            completed: false,
            revision: false,
            questions: 0,
            confidence: 1,
            hours: 0,
            notes: ""
        },

        {
            id: 18,
            paper: "Paper II",
            section: "Technical",
            topic: "Agronomy",
            completed: false,
            revision: false,
            questions: 0,
            confidence: 1,
            hours: 0,
            notes: ""
        },

        {
            id: 19,
            paper: "Paper II",
            section: "Technical",
            topic: "Horticulture",
            completed: false,
            revision: false,
            questions: 0,
            confidence: 1,
            hours: 0,
            notes: ""
        },

        {
            id: 20,
            paper: "Paper II",
            section: "Technical",
            topic: "Plant Protection",
            completed: false,
            revision: false,
            questions: 0,
            confidence: 1,
            hours: 0,
            notes: ""
        }

    ],


    goals: [

        {
            id: 1,
            title: "Complete Paper I",
            description: "Finish General Awareness and General Reasoning.",
            progress: 0,
            deadline: ""
        },

        {
            id: 2,
            title: "Complete Paper II",
            description: "Complete the agriculture technical syllabus.",
            progress: 0,
            deadline: ""
        }

    ],


    resources: [

        {
            id: 1,
            title: "PSC Nepal",
            type: "Website",
            description: "Federal Public Service Commission resources.",
            url: "https://psc.gov.np/"
        },

        {
            id: 2,
            title: "Gorkhapatra e-Paper",
            type: "Newspaper",
            description: "Access Gorkhapatra online editions.",
            url: "https://epaper.gorkhapatraonline.com/single/gorkhapatra"
        },

        {
            id: 3,
            title: "IndiaBIX",
            type: "Practice",
            description: "Reasoning, aptitude and general knowledge practice.",
            url: "https://www.indiabix.com/"
        },

        {
            id: 4,
            title: "MoALD",
            type: "Government",
            description: "Ministry of Agriculture and Livestock Development.",
            url: "https://moald.gov.np/"
        }

    ],


    quizScores: []

};


/* =========================================================
   LOAD DATA
========================================================= */

let data = loadData();


function loadData() {

    const saved =
        localStorage.getItem("plmsData_v1");

    if (!saved) {

        return structuredClone(defaultData);

    }

    try {

        return {
            ...structuredClone(defaultData),
            ...JSON.parse(saved)
        };

    } catch (error) {

        console.error(
            "Unable to load PLMS data:",
            error
        );

        return structuredClone(defaultData);
    }
}


function saveData() {

    localStorage.setItem(
        "plmsData_v1",
        JSON.stringify(data)
    );

}


/* =========================================================
   DOM
========================================================= */

const loginPage =
    document.getElementById("loginPage");

const appPage =
    document.getElementById("appPage");

const securityCode =
    document.getElementById("securityCode");

const unlockBtn =
    document.getElementById("unlockBtn");

const loginMessage =
    document.getElementById("loginMessage");

const plmsLogo =
    document.getElementById("plmsLogo");

const logoFallback =
    document.getElementById("logoFallback");


/* =========================================================
   LOGO FALLBACK
========================================================= */

plmsLogo.addEventListener(
    "error",
    function () {

        this.style.display = "none";

        logoFallback.style.display = "flex";

    }
);


/* =========================================================
   LOGIN
========================================================= */

function unlockPLMS() {

    const enteredCode =
        securityCode.value.trim();


    if (enteredCode === SECURITY_CODE) {

        loginMessage.textContent =
            "Access granted.";

        loginMessage.style.color =
            "#0f766e";


        loginPage.classList.add("hidden");

        appPage.classList.remove("hidden");


        initializeApplication();

    } else {

        loginMessage.textContent =
            "Incorrect security code.";

        loginMessage.style.color =
            "#dc2626";


        securityCode.value = "";

        securityCode.focus();

    }

}


unlockBtn.addEventListener(
    "click",
    unlockPLMS
);


securityCode.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            unlockPLMS();

        }

    }
);


/* =========================================================
   PAGE NAVIGATION
========================================================= */

const navItems =
    document.querySelectorAll(".nav-item");

const pages =
    document.querySelectorAll(".page");


const pageInformation = {

    dashboard: {
        title: "Dashboard",
        subtitle:
            "Your personal learning command center"
    },

    curriculum: {
        title: "Curriculum",
        subtitle:
            "Track your syllabus topic by topic"
    },

    goals: {
        title: "Learning Goals",
        subtitle:
            "Define and monitor your learning targets"
    },

    resources: {
        title: "Resource Library",
        subtitle:
            "Organize your learning resources"
    },

    assessment: {
        title: "Quiz & Assessment",
        subtitle:
            "Test yourself and record your performance"
    },

    progress: {
        title: "Progress",
        subtitle:
            "Review your overall learning performance"
    },

    settings: {
        title: "Settings",
        subtitle:
            "Manage your PLMS preferences and data"
    }

};


function showPage(pageName) {

    navItems.forEach(item => {

        item.classList.toggle(
            "active",
            item.dataset.page === pageName
        );

    });


    pages.forEach(page => {

        page.classList.remove(
            "active-page"
        );

    });


    const selectedPage =
        document.getElementById(
            `${pageName}Page`
        );


    if (selectedPage) {

        selectedPage.classList.add(
            "active-page"
        );

    }


    document.getElementById(
        "pageTitle"
    ).textContent =
        pageInformation[pageName].title;


    document.getElementById(
        "pageSubtitle"
    ).textContent =
        pageInformation[pageName].subtitle;


    closeMobileSidebar();

}


navItems.forEach(item => {

    item.addEventListener(
        "click",
        function () {

            showPage(
                this.dataset.page
            );

        }
    );

});


/* Small buttons that navigate */

document.addEventListener(
    "click",
    function (event) {

        const target =
            event.target.closest(
                "[data-page]"
            );

        if (
            target &&
            !target.classList.contains("nav-item")
        ) {

            showPage(
                target.dataset.page
            );

        }

    }
);


/* =========================================================
   SIDEBAR
========================================================= */

const sidebar =
    document.getElementById("sidebar");

const sidebarCollapseBtn =
    document.getElementById(
        "sidebarCollapseBtn"
    );

const mobileMenuBtn =
    document.getElementById(
        "mobileMenuBtn"
    );

const sidebarOverlay =
    document.getElementById(
        "sidebarOverlay"
    );


sidebarCollapseBtn.addEventListener(
    "click",
    function () {

        sidebar.classList.toggle(
            "collapsed"
        );

        localStorage.setItem(
            "plmsSidebarCollapsed",
            sidebar.classList.contains(
                "collapsed"
            )
        );

    }
);


mobileMenuBtn.addEventListener(
    "click",
    function () {

        sidebar.classList.add(
            "mobile-open"
        );

        sidebarOverlay.classList.add(
            "active"
        );

    }
);


sidebarOverlay.addEventListener(
    "click",
    closeMobileSidebar
);


function closeMobileSidebar() {

    sidebar.classList.remove(
        "mobile-open"
    );

    sidebarOverlay.classList.remove(
        "active"
    );

}


/* Restore sidebar state */

function restoreSidebarState() {

    const collapsed =
        localStorage.getItem(
            "plmsSidebarCollapsed"
        ) === "true";


    if (collapsed) {

        sidebar.classList.add(
            "collapsed"
        );

    }

}


/* =========================================================
   DASHBOARD
========================================================= */

function calculateStats() {

    const totalTopics =
        data.topics.length;

    const completed =
        data.topics.filter(
            topic => topic.completed
        ).length;


    const percentage =
        totalTopics === 0
            ? 0
            : Math.round(
                completed /
                totalTopics *
                100
            );


    const totalHours =
        data.topics.reduce(
            (sum, topic) =>
                sum + Number(topic.hours || 0),
            0
        );


    const activeGoals =
        data.goals.filter(
            goal =>
                Number(goal.progress) < 100
        ).length;


    return {
        totalTopics,
        completed,
        percentage,
        totalHours,
        activeGoals
    };

}


function renderDashboard() {

    const stats =
        calculateStats();


    document.getElementById(
        "dashboardTopics"
    ).textContent =
        stats.totalTopics;


    document.getElementById(
        "dashboardCompleted"
    ).textContent =
        stats.completed;


    document.getElementById(
        "dashboardGoals"
    ).textContent =
        stats.activeGoals;


    document.getElementById(
        "dashboardHours"
    ).textContent =
        stats.totalHours;


    document.getElementById(
        "overallPercentage"
    ).textContent =
        `${stats.percentage}%`;


    document.getElementById(
        "overallProgressBar"
    ).style.width =
        `${stats.percentage}%`;


    document.getElementById(
        "dailyTargetDisplay"
    ).textContent =
        data.dailyStudyHours;


    const goalsContainer =
        document.getElementById(
            "dashboardGoalsList"
        );


    if (data.goals.length === 0) {

        goalsContainer.innerHTML =
            `<p class="setting-description">
                No goals added yet.
            </p>`;

        return;

    }


    goalsContainer.innerHTML =
        data.goals
            .slice(0, 5)
            .map(goal => `
                <div class="goal-list-item">

                    <strong>
                        ${escapeHtml(goal.title)}
                    </strong>

                    <span>
                        ${Number(goal.progress)}% complete
                    </span>

                </div>
            `)
            .join("");

}


/* =========================================================
   CURRICULUM
========================================================= */

function renderCurriculum() {

    const container =
        document.getElementById(
            "curriculumContainer"
        );


    const groups = {};


    data.topics.forEach(topic => {

        const key =
            `${topic.paper} — ${topic.section}`;


        if (!groups[key]) {

            groups[key] = [];

        }


        groups[key].push(topic);

    });


    container.innerHTML =
        Object.entries(groups)
            .map(
                ([groupName, topics]) => `

                <div class="curriculum-group">

                    <h3>
                        ${escapeHtml(groupName)}
                    </h3>

                    <div style="overflow-x:auto">

                        <table class="curriculum-table">

                            <thead>

                                <tr>

                                    <th>Topic</th>

                                    <th>Done</th>

                                    <th>Revision</th>

                                    <th>Questions</th>

                                    <th>Confidence</th>

                                    <th>Hours</th>

                                </tr>

                            </thead>

                            <tbody>

                                ${topics
                                    .map(topic =>
                                        renderTopicRow(
                                            topic
                                        )
                                    )
                                    .join("")}

                            </tbody>

                        </table>

                    </div>

                </div>

            `
            )
            .join("");


    attachCurriculumEvents();

}


function renderTopicRow(topic) {

    return `

        <tr>

            <td>
                <strong>
                    ${escapeHtml(topic.topic)}
                </strong>
            </td>

            <td>

                <input
                    type="checkbox"
                    class="complete-checkbox"
                    data-topic-id="${topic.id}"
                    ${topic.completed ? "checked" : ""}
                >

            </td>

            <td>

                <input
                    type="checkbox"
                    class="revision-checkbox"
                    data-topic-id="${topic.id}"
                    ${topic.revision ? "checked" : ""}
                >

            </td>

            <td>

                <input
                    type="number"
                    min="0"
                    class="topic-questions"
                    data-topic-id="${topic.id}"
                    value="${Number(topic.questions) || 0}"
                    style="width:80px"
                >

            </td>

            <td>

                <select
                    class="topic-confidence"
                    data-topic-id="${topic.id}"
                >

                    ${[1,2,3,4,5]
                        .map(
                            value => `
                                <option
                                    value="${value}"
                                    ${Number(topic.confidence) === value
                                        ? "selected"
                                        : ""}
                                >
                                    ${value}/5
                                </option>
                            `
                        )
                        .join("")}

                </select>

            </td>

            <td>

                <input
                    type="number"
                    min="0"
                    step="0.5"
                    class="topic-hours"
                    data-topic-id="${topic.id}"
                    value="${Number(topic.hours) || 0}"
                    style="width:70px"
                >

            </td>

        </tr>

    `;

}


function findTopic(id) {

    return data.topics.find(
        topic => Number(topic.id) === Number(id)
    );

}


function attachCurriculumEvents() {

    document
        .querySelectorAll(".complete-checkbox")
        .forEach(input => {

            input.addEventListener(
                "change",
                function () {

                    const topic =
                        findTopic(
                            this.dataset.topicId
                        );

                    topic.completed =
                        this.checked;

                    saveData();

                    refreshAll();

                }
            );

        });


    document
        .querySelectorAll(".revision-checkbox")
        .forEach(input => {

            input.addEventListener(
                "change",
                function () {

                    const topic =
                        findTopic(
                            this.dataset.topicId
                        );

                    topic.revision =
                        this.checked;

                    saveData();

                }
            );

        });


    document
        .querySelectorAll(".topic-questions")
        .forEach(input => {

            input.addEventListener(
                "change",
                function () {

                    const topic =
                        findTopic(
                            this.dataset.topicId
                        );

                    topic.questions =
                        Number(this.value) || 0;

                    saveData();

                }
            );

        });


    document
        .querySelectorAll(".topic-confidence")
        .forEach(input => {

            input.addEventListener(
                "change",
                function () {

                    const topic =
                        findTopic(
                            this.dataset.topicId
                        );

                    topic.confidence =
                        Number(this.value);

                    saveData();

                }
            );

        });


    document
        .querySelectorAll(".topic-hours")
        .forEach(input => {

            input.addEventListener(
                "change",
                function () {

                    const topic =
                        findTopic(
                            this.dataset.topicId
                        );

                    topic.hours =
                        Number(this.value) || 0;

                    saveData();

                    refreshAll();

                }
            );

        });

}


/* =========================================================
   GOALS
========================================================= */

function renderGoals() {

    const container =
        document.getElementById(
            "goalsContainer"
        );


    if (data.goals.length === 0) {

        container.innerHTML =
            `<div class="content-card">
                No learning goals yet.
            </div>`;

        return;

    }


    container.innerHTML =
        data.goals
            .map(
                goal => `

                <div class="goal-card">

                    <h3>
                        ${escapeHtml(goal.title)}
                    </h3>

                    <p>
                        ${escapeHtml(goal.description)}
                    </p>

                    <div class="goal-progress">

                        <div
                            style="width:${Number(goal.progress)}%"
                        ></div>

                    </div>

                    <div class="goal-meta">

                        <span>
                            ${Number(goal.progress)}%
                        </span>

                        <span>
                            ${goal.deadline
                                ? escapeHtml(goal.deadline)
                                : "No deadline"}
                        </span>

                    </div>

                    <div
                        style="
                            display:flex;
                            gap:7px;
                            margin-top:14px;
                        "
                    >

                        <button
                            class="small-btn"
                            onclick="editGoal(${goal.id})"
                        >
                            Edit
                        </button>

                        <button
                            class="danger-btn"
                            onclick="deleteGoal(${goal.id})"
                        >
                            Delete
                        </button>

                    </div>

                </div>

            `
            )
            .join("");

}


document.getElementById(
    "addGoalBtn"
).addEventListener(
    "click",
    () => openGoalModal()
);


function openGoalModal(goal = null) {

    const modalContent =
        document.getElementById(
            "modalContent"
        );


    modalContent.innerHTML = `

        <h2>
            ${goal ? "Edit Goal" : "Add Learning Goal"}
        </h2>

        <div style="display:grid;gap:12px">

            <label>
                Goal Title

                <input
                    id="goalTitle"
                    value="${goal ? escapeAttribute(goal.title) : ""}"
                    style="width:100%;padding:10px;margin-top:5px;border:1px solid var(--border);border-radius:8px"
                >
            </label>


            <label>
                Description

                <textarea
                    id="goalDescription"
                    rows="4"
                    style="width:100%;padding:10px;margin-top:5px;border:1px solid var(--border);border-radius:8px"
                >${goal ? escapeHtml(goal.description) : ""}</textarea>

            </label>


            <label>
                Progress (%)

                <input
                    id="goalProgress"
                    type="number"
                    min="0"
                    max="100"
                    value="${goal ? Number(goal.progress) : 0}"
                    style="width:100%;padding:10px;margin-top:5px;border:1px solid var(--border);border-radius:8px"
                >
            </label>


            <label>
                Deadline

                <input
                    id="goalDeadline"
                    type="date"
                    value="${goal ? escapeAttribute(goal.deadline) : ""}"
                    style="width:100%;padding:10px;margin-top:5px;border:1px solid var(--border);border-radius:8px"
                >
            </label>


            <button
                id="saveGoalModal"
                class="primary-btn"
            >
                Save Goal
            </button>

        </div>

    `;


    openModal();


    document.getElementById(
        "saveGoalModal"
    ).addEventListener(
        "click",
        function () {

            const title =
                document.getElementById(
                    "goalTitle"
                ).value.trim();


            if (!title) {

                alert(
                    "Please enter a goal title."
                );

                return;

            }


            const newGoal = {

                id:
                    goal
                        ? goal.id
                        : Date.now(),

                title,

                description:
                    document.getElementById(
                        "goalDescription"
                    ).value.trim(),

                progress:
                    Math.min(
                        100,
                        Math.max(
                            0,
                            Number(
                                document.getElementById(
                                    "goalProgress"
                                ).value
                            ) || 0
                        )
                    ),

                deadline:
                    document.getElementById(
                        "goalDeadline"
                    ).value

            };


            if (goal) {

                const index =
                    data.goals.findIndex(
                        item =>
                            item.id === goal.id
                    );

                data.goals[index] =
                    newGoal;

            } else {

                data.goals.push(
                    newGoal
                );

            }


            saveData();

            closeModal();

            refreshAll();

        }
    );

}


window.editGoal = function (id) {

    const goal =
        data.goals.find(
            item => item.id === id
        );

    if (goal) {

        openGoalModal(goal);

    }

};


window.deleteGoal = function (id) {

    if (
        !confirm(
            "Delete this learning goal?"
        )
    ) {

        return;

    }


    data.goals =
        data.goals.filter(
            goal => goal.id !== id
        );


    saveData();

    refreshAll();

};


/* =========================================================
   RESOURCES
========================================================= */

function renderResources() {

    const container =
        document.getElementById(
            "resourcesContainer"
        );


    if (data.resources.length === 0) {

        container.innerHTML =
            `<div class="content-card">
                No resources added yet.
            </div>`;

        return;

    }


    container.innerHTML =
        data.resources
            .map(
                resource => `

                <div class="resource-card">

                    <span class="resource-type">
                        ${escapeHtml(resource.type)}
                    </span>

                    <h3>
                        ${escapeHtml(resource.title)}
                    </h3>

                    <p>
                        ${escapeHtml(resource.description)}
                    </p>

                    <a
                        href="${escapeAttribute(resource.url)}"
                        target="_blank"
                        rel="noopener"
                    >
                        Open Resource →
                    </a>

                </div>

            `
            )
            .join("");

}


document.getElementById(
    "addResourceBtn"
).addEventListener(
    "click",
    () => openResourceModal()
);


function openResourceModal() {

    const modalContent =
        document.getElementById(
            "modalContent"
        );


    modalContent.innerHTML = `

        <h2>Add Resource</h2>

        <div style="display:grid;gap:12px">

            <label>
                Resource Title

                <input
                    id="resourceTitle"
                    style="width:100%;padding:10px;margin-top:5px;border:1px solid var(--border);border-radius:8px"
                >
            </label>


            <label>
                Type

                <select
                    id="resourceType"
                    style="width:100%;padding:10px;margin-top:5px;border:1px solid var(--border);border-radius:8px"
                >

                    <option>Website</option>
                    <option>Book</option>
                    <option>PDF</option>
                    <option>Video</option>
                    <option>Course</option>
                    <option>Practice</option>
                    <option>Other</option>

                </select>

            </label>


            <label>
                Description

                <textarea
                    id="resourceDescription"
                    rows="3"
                    style="width:100%;padding:10px;margin-top:5px;border:1px solid var(--border);border-radius:8px"
                ></textarea>
            </label>


            <label>
                URL

                <input
                    id="resourceUrl"
                    type="url"
                    placeholder="https://..."
                    style="width:100%;padding:10px;margin-top:5px;border:1px solid var(--border);border-radius:8px"
                >

            </label>


            <button
                id="saveResourceModal"
                class="primary-btn"
            >
                Save Resource
            </button>

        </div>

    `;


    openModal();


    document.getElementById(
        "saveResourceModal"
    ).addEventListener(
        "click",
        function () {

            const title =
                document.getElementById(
                    "resourceTitle"
                ).value.trim();


            const url =
                document.getElementById(
                    "resourceUrl"
                ).value.trim();


            if (!title || !url) {

                alert(
                    "Please enter title and URL."
                );

                return;

            }


            data.resources.push({

                id: Date.now(),

                title,

                type:
                    document.getElementById(
                        "resourceType"
                    ).value,

                description:
                    document.getElementById(
                        "resourceDescription"
                    ).value.trim(),

                url

            });


            saveData();

            closeModal();

            refreshAll();

        }
    );

}


/* =========================================================
   QUIZ
========================================================= */

const quizQuestions = [

    {
        question:
            "Which institution is responsible for conducting federal public service examinations in Nepal?",

        options: [
            "National Planning Commission",
            "Public Service Commission",
            "Ministry of Finance",
            "Election Commission"
        ],

        answer: 1

    },


    {
        question:
            "Which soil component is most directly associated with nutrient-holding capacity?",

        options: [
            "Sand",
            "Gravel",
            "Clay",
            "Water"
        ],

        answer: 2

    },


    {
        question:
            "IPM stands for:",

        options: [
            "Integrated Pest Management",
            "International Plant Method",
            "Integrated Production Model",
            "Improved Pest Mechanism"
        ],

        answer: 0

    },


    {
        question:
            "Which practice helps conserve soil moisture?",

        options: [
            "Mulching",
            "Over-irrigation",
            "Removing crop residues",
            "Continuous bare soil"
        ],

        answer: 0

    },


    {
        question:
            "GIS stands for:",

        options: [
            "Geographical Information System",
            "Global Information Service",
            "Geological Internet System",
            "Geographic Internal Survey"
        ],

        answer: 0

    }

];


function renderQuiz() {

    const container =
        document.getElementById(
            "quizContainer"
        );


    container.innerHTML = `

        ${quizQuestions
            .map(
                (question, index) => `

                <div class="quiz-question">

                    <h3>
                        ${index + 1}.
                        ${escapeHtml(
                            question.question
                        )}
                    </h3>

                    <div class="quiz-options">

                        ${question.options
                            .map(
                                (option, optionIndex) => `

                                <label
                                    class="quiz-option"
                                >

                                    <input
                                        type="radio"
                                        name="question${index}"
                                        value="${optionIndex}"
                                    >

                                    ${escapeHtml(option)}

                                </label>

                            `
                            )
                            .join("")}

                    </div>

                </div>

            `
            )
            .join("")}


        <button
            id="submitQuizBtn"
            class="primary-btn"
        >
            Submit Assessment
        </button>

        <div id="quizResult"></div>

    `;


    document.getElementById(
        "submitQuizBtn"
    ).addEventListener(
        "click",
        submitQuiz
    );

}


function submitQuiz() {

    let score = 0;

    let answered = 0;


    quizQuestions.forEach(
        (question, index) => {

            const selected =
                document.querySelector(
                    `input[name="question${index}"]:checked`
                );


            if (selected) {

                answered++;

                if (
                    Number(selected.value) ===
                    question.answer
                ) {

                    score++;

                }

            }

        }
    );


    if (answered < quizQuestions.length) {

        alert(
            "Please answer all questions."
        );

        return;

    }


    const percentage =
        Math.round(
            score /
            quizQuestions.length *
            100
        );


    data.quizScores.push({

        date:
            new Date().toISOString(),

        score,

        total:
            quizQuestions.length,

        percentage

    });


    saveData();


    document.getElementById(
        "quizResult"
    ).innerHTML = `

        <div class="quiz-result">

            Score:
            ${score}/${quizQuestions.length}

            —
            ${percentage}%

        </div>

    `;


    renderProgress();

}


/* =========================================================
   PROGRESS
========================================================= */

function renderProgress() {

    const stats =
        calculateStats();


    document.getElementById(
        "progressOverall"
    ).textContent =
        `${stats.percentage}%`;


    document.getElementById(
        "progressCompleted"
    ).textContent =
        stats.completed;


    document.getElementById(
        "progressHours"
    ).textContent =
        stats.totalHours;


    const quizAverage =
        data.quizScores.length === 0

            ? 0

            : Math.round(
                data.quizScores.reduce(
                    (sum, result) =>
                        sum +
                        Number(
                            result.percentage
                        ),
                    0
                ) /
                data.quizScores.length
            );


    document.getElementById(
        "progressQuiz"
    ).textContent =
        `${quizAverage}%`;


    const subjectContainer =
        document.getElementById(
            "subjectProgressContainer"
        );


    const groups = {};


    data.topics.forEach(topic => {

        const key =
            `${topic.paper} — ${topic.section}`;


        if (!groups[key]) {

            groups[key] = [];

        }


        groups[key].push(topic);

    });


    subjectContainer.innerHTML =
        Object.entries(groups)
            .map(
                ([name, topics]) => {

                    const completed =
                        topics.filter(
                            topic =>
                                topic.completed
                        ).length;


                    const percentage =
                        Math.round(
                            completed /
                            topics.length *
                            100
                        );


                    return `

                        <div class="subject-progress">

                            <div
                                class="subject-progress-header"
                            >

                                <strong>
                                    ${escapeHtml(name)}
                                </strong>

                                <span>
                                    ${percentage}%
                                </span>

                            </div>

                            <div class="progress-bar">

                                <div
                                    style="width:${percentage}%"
                                ></div>

                            </div>

                        </div>

                    `;

                }
            )
            .join("");

}


/* =========================================================
   SETTINGS
========================================================= */

const studyHoursSetting =
    document.getElementById(
        "studyHoursSetting"
    );


document.getElementById(
    "saveStudySettings"
).addEventListener(
    "click",
    function () {

        data.dailyStudyHours =
            Number(
                studyHoursSetting.value
            ) || 0;


        saveData();

        renderDashboard();

        alert(
            "Study settings saved."
        );

    }
);


function renderSettings() {

    studyHoursSetting.value =
        data.dailyStudyHours;

}


document.getElementById(
    "exportDataBtn"
).addEventListener(
    "click",
    exportData
);


function exportData() {

    const blob =
        new Blob(
            [
                JSON.stringify(
                    data,
                    null,
                    2
                )
            ],
            {
                type:
                    "application/json"
            }
        );


    const url =
        URL.createObjectURL(blob);


    const a =
        document.createElement("a");


    a.href = url;

    a.download =
        "PLMS-backup.json";


    document.body.appendChild(a);

    a.click();

    a.remove();

    URL.revokeObjectURL(url);

}


document.getElementById(
    "importDataInput"
).addEventListener(
    "change",
    function (event) {

        const file =
            event.target.files[0];


        if (!file) {

            return;

        }


        const reader =
            new FileReader();


        reader.onload =
            function () {

                try {

                    const imported =
                        JSON.parse(
                            reader.result
                        );


                    data = {

                        ...structuredClone(
                            defaultData
                        ),

                        ...imported

                    };


                    saveData();

                    refreshAll();

                    alert(
                        "PLMS data imported successfully."
                    );


                } catch (error) {

                    alert(
                        "Invalid PLMS JSON file."
                    );

                }

            };


        reader.readAsText(file);

    }
);


document.getElementById(
    "resetDataBtn"
).addEventListener(
    "click",
    function () {

        if (
            !confirm(
                "Are you sure you want to delete all PLMS data?"
            )
        ) {

            return;

        }


        data =
            structuredClone(
                defaultData
            );


        saveData();

        refreshAll();


        alert(
            "PLMS data has been reset."
        );

    }
);


/* =========================================================
   MODAL
========================================================= */

const modalOverlay =
    document.getElementById(
        "modalOverlay"
    );


const closeModalBtn =
    document.getElementById(
        "closeModalBtn"
    );


function openModal() {

    modalOverlay.classList.remove(
        "hidden"
    );

}


function closeModal() {

    modalOverlay.classList.add(
        "hidden"
    );

    document.getElementById(
        "modalContent"
    ).innerHTML = "";

}


closeModalBtn.addEventListener(
    "click",
    closeModal
);


modalOverlay.addEventListener(
    "click",
    function (event) {

        if (
            event.target ===
            modalOverlay
        ) {

            closeModal();

        }

    }
);


/* =========================================================
   LOGOUT
========================================================= */

document.getElementById(
    "logoutBtn"
).addEventListener(
    "click",
    function () {

        appPage.classList.add(
            "hidden"
        );

        loginPage.classList.remove(
            "hidden"
        );

        securityCode.value = "";

        loginMessage.textContent = "";

        closeMobileSidebar();

    }
);


/* =========================================================
   DATE
========================================================= */

function renderDate() {

    const date =
        new Date();


    document.getElementById(
        "currentDate"
    ).textContent =
        date.toLocaleDateString(
            undefined,
            {
                weekday: "long",
                year: "numeric",
                month: "short",
                day: "numeric"
            }
        );

}


/* =========================================================
   INITIALIZE
========================================================= */

function initializeApplication() {

    restoreSidebarState();

    renderDate();

    refreshAll();

}


function refreshAll() {

    renderDashboard();

    renderCurriculum();

    renderGoals();

    renderResources();

    renderQuiz();

    renderProgress();

    renderSettings();

}


/* =========================================================
   HTML SAFETY HELPERS
========================================================= */

function escapeHtml(value) {

    return String(value ?? "")
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


function escapeAttribute(value) {

    return escapeHtml(value);

}


/* =========================================================
   INITIAL LOGIN FOCUS
========================================================= */

window.addEventListener(
    "load",
    function () {

        securityCode.focus();

    }
);