```javascript
/* =========================================================
   MCQs PRACTICE SET
   Excel-powered MCQ system

   Folder:

   MCQ/
   ├── mcq.html
   ├── mcq.css
   ├── mcq.js
   └── questions.xlsx

   Excel:

   Column A = QN
   Column B = Question
   Column C = Option A
   Column D = Option B
   Column E = Option C
   Column F = Option D
   Column G = Right Option
   Column H = Remarks
   ========================================================= */


const QUESTIONS_PER_PAGE = 50;

const EXCEL_FILE = "questions.xlsx";


/* =========================================================
   CONTACT INFORMATION
   =========================================================

   CHANGE THESE TWO VALUES.
   ========================================================= */

const CONTACT_NAME = "Bipin Khatri";

const CONTACT_EMAIL = "your@email.com";


/* =========================================================
   GLOBAL VARIABLES
   ========================================================= */

let workbook = null;

let questionBank = {};

let currentSubject = "";

let currentPage = 1;

let currentQuestions = [];

let answers = {};

let questionResults = {};


/* =========================================================
   DOM
   ========================================================= */

const subjectSelect =
    document.getElementById(
        "subjectSelect"
    );

const pageSelect =
    document.getElementById(
        "pageSelect"
    );

const questionsContainer =
    document.getElementById(
        "questionsContainer"
    );

const displaySubject =
    document.getElementById(
        "displaySubject"
    );

const displayPage =
    document.getElementById(
        "displayPage"
    );

const attemptedDisplay =
    document.getElementById(
        "attemptedDisplay"
    );

const scoreDisplay =
    document.getElementById(
        "scoreDisplay"
    );

const percentageDisplay =
    document.getElementById(
        "percentageDisplay"
    );

const progressFill =
    document.getElementById(
        "progressFill"
    );

const progressText =
    document.getElementById(
        "progressText"
    );

const questionRange =
    document.getElementById(
        "questionRange"
    );

const practiceTitle =
    document.getElementById(
        "practiceTitle"
    );

const practiceSubtitle =
    document.getElementById(
        "practiceSubtitle"
    );

const pageBadge =
    document.getElementById(
        "pageBadge"
    );

const previousBtn =
    document.getElementById(
        "previousBtn"
    );

const nextBtn =
    document.getElementById(
        "nextBtn"
    );

const downloadFullBtn =
    document.getElementById(
        "downloadFullBtn"
    );

const downloadAttemptedBtn =
    document.getElementById(
        "downloadAttemptedBtn"
    );


/* =========================================================
   INITIALIZE
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    initialize
);


function initialize() {

    updateDate();

    updateYear();

    updateFooter();

    setupEvents();

    /*
       Automatically load the Excel workbook
       from the SAME folder.
    */

    loadExcelAutomatically();

}


/* =========================================================
   DATE
   ========================================================= */

function updateDate() {

    const element =
        document.getElementById(
            "currentDate"
        );

    element.textContent =
        new Date().toLocaleDateString(
            undefined,
            {
                year: "numeric",
                month: "long",
                day: "numeric"
            }
        );

}


/* =========================================================
   YEAR
   ========================================================= */

function updateYear() {

    document.getElementById(
        "year"
    ).textContent =
        new Date().getFullYear();

}


/* =========================================================
   FOOTER
   ========================================================= */

function updateFooter() {

    const footer =
        document.querySelector(
            "footer"
        );

    footer.innerHTML = `

        <div class="footer-title">
            MCQs Practice Set
        </div>

        <div>
            Contact: ${escapeHTML(
                CONTACT_NAME
            )}

            |

            Email:

            <a href="mailto:${escapeHTML(
                CONTACT_EMAIL
            )}">

                ${escapeHTML(
                    CONTACT_EMAIL
                )}

            </a>

        </div>

        <div class="footer-copy">

            © ${new Date().getFullYear()}
            ${escapeHTML(
                CONTACT_NAME
            )}

        </div>

    `;

}


/* =========================================================
   EVENTS
   ========================================================= */

function setupEvents() {

    subjectSelect.addEventListener(
        "change",
        handleSubjectChange
    );


    pageSelect.addEventListener(
        "change",
        handlePageChange
    );


    previousBtn.addEventListener(
        "click",
        previousPage
    );


    nextBtn.addEventListener(
        "click",
        nextPage
    );


    downloadFullBtn.addEventListener(
        "click",
        function() {

            downloadPDF(
                "full"
            );

        }
    );


    downloadAttemptedBtn.addEventListener(
        "click",
        function() {

            downloadPDF(
                "attempted"
            );

        }
    );

}


/* =========================================================
   AUTOMATIC EXCEL LOADING
   ========================================================= */

async function loadExcelAutomatically() {

    try {

        /*
           This is the important part.

           Browser requests:

           same-folder/questions.xlsx
        */

        const response =
            await fetch(
                EXCEL_FILE + "?v=" +
                Date.now()
            );


        if (!response.ok) {

            throw new Error(
                "questions.xlsx could not be found."
            );

        }


        const arrayBuffer =
            await response.arrayBuffer();


        processExcel(
            arrayBuffer
        );

    }

    catch (error) {

        console.error(error);

        showExcelError();

    }

}


/* =========================================================
   EXCEL ERROR
   ========================================================= */

function showExcelError() {

    questionsContainer.innerHTML = `

        <div class="welcome-box">

            <div class="welcome-icon">
                ⚠️
            </div>

            <h2>
                Excel file not found
            </h2>

            <p>
                Please place
                <strong>
                    questions.xlsx
                </strong>
                in the same folder as
                <strong>
                    mcq.html
                </strong>.
            </p>

            <p>

                Required structure:

            </p>

            <p>

                mcq.html<br>
                mcq.css<br>
                mcq.js<br>
                <strong>questions.xlsx</strong>

            </p>

            <p class="small-note">

                If you are opening the HTML directly
                using file://, use a local web server
                such as VS Code Live Server.

            </p>

        </div>

    `;

}


/* =========================================================
   PROCESS EXCEL
   ========================================================= */

function processExcel(data) {

    try {

        workbook =
            XLSX.read(
                data,
                {
                    type: "array"
                }
            );


        questionBank = {};


        workbook.SheetNames.forEach(
            function(sheetName) {

                const worksheet =
                    workbook.Sheets[
                        sheetName
                    ];


                const rows =
                    XLSX.utils.sheet_to_json(
                        worksheet,
                        {
                            header: 1,
                            defval: ""
                        }
                    );


                const questions =
                    convertSheetToQuestions(
                        rows
                    );


                if (
                    questions.length > 0
                ) {

                    questionBank[
                        sheetName
                    ] = questions;

                }

            }
        );


        populateSubjects();


        const subjects =
            Object.keys(
                questionBank
            );


        if (
            subjects.length > 0
        ) {

            currentSubject =
                subjects[0];

            subjectSelect.value =
                currentSubject;

            handleSubjectChange();

        }


    }

    catch (error) {

        console.error(error);

        showExcelError();

    }

}


/* =========================================================
   CONVERT SHEET
   ========================================================= */

function convertSheetToQuestions(rows) {

    if (
        !rows ||
        rows.length < 2
    ) {

        return [];

    }


    let headerIndex = 0;


    const firstRow =
        rows[0].map(
            value =>
                String(value)
                    .trim()
                    .toLowerCase()
        );


    /*
       Locate header row.
    */

    if (
        !firstRow.includes(
            "question"
        )
    ) {

        for (
            let i = 0;
            i < Math.min(
                rows.length,
                10
            );
            i++
        ) {

            const row =
                rows[i].map(
                    value =>
                        String(value)
                            .trim()
                            .toLowerCase()
                );


            if (
                row.includes(
                    "question"
                )
            ) {

                headerIndex = i;

                break;

            }

        }

    }


    const headers =
        rows[
            headerIndex
        ].map(
            value =>
                String(value)
                    .trim()
                    .toLowerCase()
        );


    function findColumn(
        names,
        fallback
    ) {

        for (
            let i = 0;
            i < headers.length;
            i++
        ) {

            if (
                names.includes(
                    headers[i]
                )
            ) {

                return i;

            }

        }

        return fallback;

    }


    const qnColumn =
        findColumn(
            [
                "qn",
                "q.no",
                "qno",
                "question no",
                "question number"
            ],
            0
        );


    const questionColumn =
        findColumn(
            [
                "question",
                "questions"
            ],
            1
        );


    const optionAColumn =
        findColumn(
            [
                "option a",
                "a",
                "optiona"
            ],
            2
        );


    const optionBColumn =
        findColumn(
            [
                "option b",
                "b",
                "optionb"
            ],
            3
        );


    const optionCColumn =
        findColumn(
            [
                "option c",
                "c",
                "optionc"
            ],
            4
        );


    const optionDColumn =
        findColumn(
            [
                "option d",
                "d",
                "optiond"
            ],
            5
        );


    const correctColumn =
        findColumn(
            [
                "right option",
                "right answer",
                "correct option",
                "correct answer",
                "answer"
            ],
            6
        );


    const remarksColumn =
        findColumn(
            [
                "remarks",
                "remark",
                "explanation"
            ],
            7
        );


    const result = [];


    for (
        let i =
            headerIndex + 1;
        i < rows.length;
        i++
    ) {

        const row =
            rows[i];


        const question =
            cleanValue(
                row[
                    questionColumn
                ]
            );


        if (!question) {

            continue;

        }


        const item = {

            qn:
                cleanValue(
                    row[
                        qnColumn
                    ]
                )
                ||
                String(
                    result.length + 1
                ),


            question:
                question,


            options: {

                A:
                    cleanValue(
                        row[
                            optionAColumn
                        ]
                    ),

                B:
                    cleanValue(
                        row[
                            optionBColumn
                        ]
                    ),

                C:
                    cleanValue(
                        row[
                            optionCColumn
                        ]
                    ),

                D:
                    cleanValue(
                        row[
                            optionDColumn
                        ]
                    )

            },


            correct:
                normalizeAnswer(
                    row[
                        correctColumn
                    ]
                ),


            remarks:
                cleanValue(
                    row[
                        remarksColumn
                    ]
                )

        };


        if (
            item.options.A ||
            item.options.B ||
            item.options.C ||
            item.options.D
        ) {

            result.push(
                item
            );

        }

    }


    return result;

}


/* =========================================================
   CLEAN VALUE
   ========================================================= */

function cleanValue(value) {

    if (
        value === undefined ||
        value === null
    ) {

        return "";

    }


    return String(
        value
    ).trim();

}


/* =========================================================
   NORMALIZE ANSWER
   ========================================================= */

function normalizeAnswer(value) {

    let answer =
        cleanValue(
            value
        ).toUpperCase();


    /*
       Handles:

       A
       A.
       A)
       Option A
       OPTION A
       Answer: A
    */

    const match =
        answer.match(
            /\b([ABCD])\b/
        );


    if (match) {

        return match[1];

    }


    /*
       If the cell contains
       exactly A/B/C/D.
    */

    if (
        [
            "A",
            "B",
            "C",
            "D"
        ].includes(answer)
    ) {

        return answer;

    }


    return answer;

}


/* =========================================================
   POPULATE SUBJECTS
   ========================================================= */

function populateSubjects() {

    subjectSelect.innerHTML = "";


    Object.keys(
        questionBank
    ).forEach(
        function(subject) {

            const option =
                document.createElement(
                    "option"
                );


            option.value =
                subject;


            option.textContent =
                `${subject} (${questionBank[subject].length} questions)`;


            subjectSelect.appendChild(
                option
            );

        }
    );

}


/* =========================================================
   SUBJECT CHANGE
   ========================================================= */

function handleSubjectChange() {

    currentSubject =
        subjectSelect.value;


    currentPage = 1;

    answers = {};

    questionResults = {};


    if (
        !currentSubject
    ) {

        clearQuestions();

        return;

    }


    createPageList();

    loadPage();

}


/* =========================================================
   CREATE PAGE LIST
   ========================================================= */

function createPageList() {

    const questions =
        questionBank[
            currentSubject
        ] || [];


    const totalPages =
        Math.ceil(
            questions.length /
            QUESTIONS_PER_PAGE
        );


    pageSelect.innerHTML = "";


    for (
        let i = 1;
        i <= totalPages;
        i++
    ) {

        const start =
            (
                (i - 1) *
                QUESTIONS_PER_PAGE
            ) + 1;


        const end =
            Math.min(
                i *
                QUESTIONS_PER_PAGE,
                questions.length
            );


        const option =
            document.createElement(
                "option"
            );


        option.value =
            i;


        option.textContent =
            `Page ${i} (${start}–${end})`;


        pageSelect.appendChild(
            option
        );

    }


    pageSelect.disabled =
        totalPages === 0;

}


/* =========================================================
   PAGE CHANGE
   ========================================================= */

function handlePageChange() {

    currentPage =
        parseInt(
            pageSelect.value
        ) || 1;


    loadPage();

}


/* =========================================================
   LOAD PAGE
   ========================================================= */

function loadPage() {

    const allQuestions =
        questionBank[
            currentSubject
        ] || [];


    const start =
        (
            currentPage - 1
        ) *
        QUESTIONS_PER_PAGE;


    const end =
        start +
        QUESTIONS_PER_PAGE;


    currentQuestions =
        allQuestions.slice(
            start,
            end
        );


    answers = {};

    questionResults = {};


    renderQuestions();

    updateInterface();

}


/* =========================================================
   RENDER
   ========================================================= */

function renderQuestions() {

    questionsContainer.innerHTML = "";


    currentQuestions.forEach(
        function(
            question,
            index
        ) {

            const card =
                createQuestionCard(
                    question,
                    index
                );


            questionsContainer.appendChild(
                card
            );

        }
    );

}


/* =========================================================
   QUESTION CARD
   ========================================================= */

function createQuestionCard(
    question,
    index
) {

    const card =
        document.createElement(
            "article"
        );


    card.className =
        "question-card";


    card.dataset.index =
        index;


    const globalNumber =
        (
            (
                currentPage - 1
            ) *
            QUESTIONS_PER_PAGE
        ) +
        index +
        1;


    card.innerHTML = `

        <div class="question-number">

            Q${globalNumber}

        </div>


        <div class="question-text">

            ${escapeHTML(
                question.question
            )}

        </div>


        <div class="options">

            ${createOption(
                question,
                "A"
            )}

            ${createOption(
                question,
                "B"
            )}

            ${createOption(
                question,
                "C"
            )}

            ${createOption(
                question,
                "D"
            )}

        </div>


        <div class="answer-status-container">
        </div>


        <div
            class="remark"
            style="display:none">

            <strong>
                Remark:
            </strong>

            ${escapeHTML(
                question.remarks
            )}

        </div>

    `;


    const inputs =
        card.querySelectorAll(
            "input"
        );


    inputs.forEach(
        function(input) {

            input.addEventListener(
                "change",
                function() {

                    handleAnswer(
                        index,
                        input.value
                    );

                }
            );

        }
    );


    return card;

}


/* =========================================================
   OPTION
   ========================================================= */

function createOption(
    question,
    letter
) {

    const id =
        `q_${question.qn}_${letter}`;


    return `

        <div
            class="option"
            data-option="${letter}">

            <input
                type="radio"
                id="${id}"
                name="q_${question.qn}"
                value="${letter}">

            <label for="${id}">

                <span class="option-letter">

                    ${letter}

                </span>

                <span class="option-text">

                    ${escapeHTML(
                        question.options[letter]
                    )}

                </span>

            </label>

        </div>

    `;

}


/* =========================================================
   ANSWER
   ========================================================= */

function handleAnswer(
    index,
    selectedAnswer
) {

    const question =
        currentQuestions[
            index
        ];


    if (
        questionResults[index]
    ) {

        return;

    }


    answers[index] =
        selectedAnswer;


    const isCorrect =
        selectedAnswer ===
        question.correct;


    questionResults[index] = {

        selected:
            selectedAnswer,

        correct:
            isCorrect

    };


    markQuestion(
        index,
        selectedAnswer,
        isCorrect
    );


    updateInterface();

}


/* =========================================================
   MARK
   ========================================================= */

function markQuestion(
    index,
    selectedAnswer,
    isCorrect
) {

    const card =
        document.querySelector(
            `.question-card[data-index="${index}"]`
        );


    if (!card) return;


    card.classList.add(
        "answered"
    );


    const options =
        card.querySelectorAll(
            ".option"
        );


    options.forEach(
        function(option) {

            const letter =
                option.dataset.option;


            if (
                letter ===
                currentQuestions[
                    index
                ].correct
            ) {

                option.classList.add(
                    "correct"
                );

            }


            if (
                letter ===
                selectedAnswer &&
                !isCorrect
            ) {

                option.classList.add(
                    "wrong"
                );

            }


            option.querySelector(
                "input"
            ).disabled = true;

        }
    );


    const status =
        card.querySelector(
            ".answer-status-container"
        );


    if (isCorrect) {

        status.innerHTML = `

            <div class="
                answer-status
                correct-status">

                ✓ Correct Answer

            </div>

        `;

    }

    else {

        status.innerHTML = `

            <div class="
                answer-status
                wrong-status">

                ✗ Incorrect

                — Correct Answer:
                ${currentQuestions[index].correct}

            </div>

        `;

    }


    const remark =
        card.querySelector(
            ".remark"
        );


    if (remark) {

        remark.style.display =
            "block";

    }

}


/* =========================================================
   SCORE
   ========================================================= */

function calculateScore() {

    let score = 0;


    Object.values(
        questionResults
    ).forEach(
        function(result) {

            if (
                result.correct
            ) {

                score++;

            }

        }
    );


    return score;

}


/* =========================================================
   UPDATE INTERFACE
   ========================================================= */

function updateInterface() {

    const total =
        currentQuestions.length;


    const attempted =
        Object.keys(
            questionResults
        ).length;


    const score =
        calculateScore();


    const percentage =
        attempted > 0
            ?
            Math.round(
                (
                    score /
                    attempted
                ) *
                100
            )
            :
            0;


    displaySubject.textContent =
        currentSubject || "—";


    displayPage.textContent =
        currentSubject
            ?
            currentPage
            :
            "—";


    attemptedDisplay.textContent =
        `${attempted} / ${total}`;


    scoreDisplay.textContent =
        `${score} / ${attempted}`;


    percentageDisplay.textContent =
        `${percentage}%`;


    const progress =
        total > 0
            ?
            Math.round(
                (
                    attempted /
                    total
                ) *
                100
            )
            :
            0;


    progressFill.style.width =
        `${progress}%`;


    progressText.textContent =
        `${progress}%`;


    if (total > 0) {

        const allQuestions =
            questionBank[
                currentSubject
            ];


        const start =
            (
                (
                    currentPage - 1
                ) *
                QUESTIONS_PER_PAGE
            ) + 1;


        const end =
            Math.min(
                start +
                total -
                1,
                allQuestions.length
            );


        questionRange.textContent =
            `${start}–${end}`;


        practiceTitle.textContent =
            currentSubject;


        practiceSubtitle.textContent =
            `${total} questions on this page`;


        pageBadge.textContent =
            `Page ${currentPage}`;


        previousBtn.disabled =
            currentPage <= 1;


        const totalPages =
            Math.ceil(
                allQuestions.length /
                QUESTIONS_PER_PAGE
            );


        nextBtn.disabled =
            currentPage >=
            totalPages;


        /*
           Enable PDF buttons.

           Full page:
           enabled when questions exist.

           Attempted:
           enabled only if
           at least one question
           has been attempted.
        */

        downloadFullBtn.disabled =
            total === 0;


        downloadAttemptedBtn.disabled =
            attempted === 0;

    }

}


/* =========================================================
   NEXT
   ========================================================= */

function nextPage() {

    const allQuestions =
        questionBank[
            currentSubject
        ] || [];


    const totalPages =
        Math.ceil(
            allQuestions.length /
            QUESTIONS_PER_PAGE
        );


    if (
        currentPage >=
        totalPages
    ) {

        return;

    }


    currentPage++;


    pageSelect.value =
        currentPage;


    loadPage();


    window.scrollTo(
        {
            top: 0,
            behavior: "smooth"
        }
    );

}


/* =========================================================
   PREVIOUS
   ========================================================= */

function previousPage() {

    if (
        currentPage <= 1
    ) {

        return;

    }


    currentPage--;


    pageSelect.value =
        currentPage;


    loadPage();


    window.scrollTo(
        {
            top: 0,
            behavior: "smooth"
        }
    );

}


/* =========================================================
   PDF — MAIN FUNCTION
   ========================================================= */

async function downloadPDF(
    mode
) {

    /*
       mode:

       "full"
       "attempted"
    */


    if (
        currentQuestions.length === 0
    ) {

        return;

    }


    let questionsToPrint = [];


    if (
        mode === "attempted"
    ) {

        questionsToPrint =
            currentQuestions.filter(
                function(
                    question,
                    index
                ) {

                    return Boolean(
                        questionResults[
                            index
                        ]
                    );

                }
            );


        if (
            questionsToPrint.length === 0
        ) {

            alert(
                "No attempted questions on this page."
            );

            return;

        }

    }

    else {

        questionsToPrint =
            currentQuestions;

    }


    const pdfElement =
        createPDFDocument(
            questionsToPrint,
            mode
        );


    document.body.appendChild(
        pdfElement
    );


    const filename =
        sanitizeFilename(
            `MCQs_Practice_${currentSubject}_Page_${currentPage}_${mode}.pdf`
        );


    const options = {

        margin: [
            10,
            10,
            12,
            10
        ],

        filename:
            filename,

        image: {

            type: "jpeg",

            quality: 0.95

        },

        html2canvas: {

            scale: 2,

            useCORS: true,

            backgroundColor:
                "#ffffff"

        },

        jsPDF: {

            unit: "mm",

            format: "a4",

            orientation:
                "portrait"

        },

        pagebreak: {

            mode: [
                "css",
                "legacy"
            ],

            avoid: [
                ".pdf-question"
            ]

        }

    };


    try {

        await html2pdf()
            .set(options)
            .from(pdfElement)
            .save();

    }

    catch (error) {

        console.error(error);

        alert(
            "Unable to create PDF."
        );

    }

    finally {

        pdfElement.remove();

    }

}


/* =========================================================
   CREATE PDF DOCUMENT
   ========================================================= */

function createPDFDocument(
    questions,
    mode
) {

    const wrapper =
        document.createElement(
            "div"
        );


    wrapper.className =
        "pdf-document";


    /*
       Header
    */

    wrapper.innerHTML = `

        <div class="pdf-header">

            <div class="pdf-main-title">
                MCQs Practice Set
            </div>

            <div class="pdf-subtitle">

                Subject:
                ${escapeHTML(
                    currentSubject
                )}

                &nbsp; | &nbsp;

                Page:
                ${currentPage}

            </div>

            <div class="pdf-subtitle">

                ${
                    mode === "attempted"
                    ?
                    "Attempted Questions Only"
                    :
                    "Complete Page"
                }

            </div>

        </div>

    `;


    /*
       Score
    */

    const attempted =
        Object.keys(
            questionResults
        ).length;


    const score =
        calculateScore();


    const percentage =
        attempted > 0
            ?
            Math.round(
                (
                    score /
                    attempted
                ) *
                100
            )
            :
            0;


    const scoreBox =
        document.createElement(
            "div"
        );


    scoreBox.className =
        "pdf-score";


    scoreBox.innerHTML = `

        <strong>
            Score:
        </strong>

        ${score} / ${attempted}

        &nbsp;&nbsp;

        <strong>
            Percentage:
        </strong>

        ${percentage}%

    `;


    wrapper.appendChild(
        scoreBox
    );


    /*
       Questions
    */

    questions.forEach(
        function(
            question
        ) {

            /*
               Find original index.
            */

            const originalIndex =
                currentQuestions.indexOf(
                    question
                );


            const result =
                questionResults[
                    originalIndex
                ];


            const questionBox =
                document.createElement(
                    "div"
                );


            questionBox.className =
                "pdf-question";


            const globalNumber =
                (
                    (
                        currentPage - 1
                    ) *
                    QUESTIONS_PER_PAGE
                ) +
                originalIndex +
                1;


            let optionsHTML = "";


            [
                "A",
                "B",
                "C",
                "D"
            ].forEach(
                function(letter) {

                    let className =
                        "pdf-option";


                    if (
                        result &&
                        letter ===
                        question.correct
                    ) {

                        className +=
                            " pdf-correct";

                    }


                    if (
                        result &&
                        letter ===
                        result.selected &&
                        !result.correct
                    ) {

                        className +=
                            " pdf-wrong";

                    }


                    optionsHTML += `

                        <div class="${className}">

                            <strong>
                                ${letter}.
                            </strong>

                            ${escapeHTML(
                                question.options[
                                    letter
                                ]
                            )}

                        </div>

                    `;

                }
            );


            let resultHTML = "";


            if (result) {

                if (
                    result.correct
                ) {

                    resultHTML = `

                        <div class="pdf-result pdf-right">

                            ✓ Correct

                            &nbsp; | &nbsp;

                            Your Answer:
                            ${result.selected}

                        </div>

                    `;

                }

                else {

                    resultHTML = `

                        <div class="pdf-result pdf-wrong-result">

                            ✗ Wrong

                            &nbsp; | &nbsp;

                            Your Answer:
                            ${result.selected}

                            &nbsp; | &nbsp;

                            Correct:
                            ${question.correct}

                        </div>

                    `;

                }

            }


            let remarkHTML = "";


            if (
                result &&
                question.remarks
            ) {

                remarkHTML = `

                    <div class="pdf-remark">

                        <strong>
                            Remark:
                        </strong>

                        ${escapeHTML(
                            question.remarks
                        )}

                    </div>

                `;

            }


            questionBox.innerHTML = `

                <div class="pdf-question-number">

                    Q${globalNumber}.

                </div>


                <div class="pdf-question-text">

                    ${escapeHTML(
                        question.question
                    )}

                </div>


                <div class="pdf-options">

                    ${optionsHTML}

                </div>


                ${resultHTML}


                ${remarkHTML}

            `;


            wrapper.appendChild(
                questionBox
            );

        }
    );


    /*
       Footer
    */

    const footer =
        document.createElement(
            "div"
        );


    footer.className =
        "pdf-footer";


    footer.innerHTML = `

        <div>
            Contact: ${escapeHTML(
                CONTACT_NAME
            )}
        </div>

        <div>
            Email:
            ${escapeHTML(
                CONTACT_EMAIL
            )}
        </div>

        <div>
            MCQs Practice Set
        </div>

    `;


    wrapper.appendChild(
        footer
    );


    /*
       PDF-specific styles
    */

    const style =
        document.createElement(
            "style"
        );


    style.textContent = `

        .pdf-document {

            width: 190mm;

            background: white;

            color: #111827;

            font-family:
                Arial,
                Helvetica,
                sans-serif;

            font-size: 9.5pt;

            line-height: 1.35;

            padding: 0;

        }


        .pdf-header {

            text-align: center;

            border-bottom:
                1px solid #222;

            padding-bottom:
                7px;

            margin-bottom:
                7px;

        }


        .pdf-main-title {

            font-size:
                17pt;

            font-weight:
                bold;

            margin-bottom:
                2px;

        }


        .pdf-subtitle {

            font-size:
                9pt;

            margin-top:
                1px;

        }


        .pdf-score {

            background:
                #f3f4f6;

            border:
                1px solid #d1d5db;

            padding:
                5px 7px;

            margin-bottom:
                7px;

            text-align:
                center;

            font-size:
                9pt;

        }


        .pdf-question {

            border-bottom:
                0.5px solid #d1d5db;

            padding:
                5px 0;

            margin-bottom:
                3px;

            page-break-inside:
                avoid;

            break-inside:
                avoid;

        }


        .pdf-question-number {

            display:
                inline-block;

            font-weight:
                bold;

            margin-right:
                3px;

        }


        .pdf-question-text {

            display:
                inline;

            font-weight:
                bold;

        }


        .pdf-options {

            display:
                grid;

            grid-template-columns:
                1fr 1fr;

            gap:
                2px 10px;

            margin-top:
                3px;

            margin-left:
                10px;

        }


        .pdf-option {

            padding:
                1px 2px;

        }


        .pdf-correct {

            background:
                #dcfce7;

            color:
                #166534;

            border-radius:
                2px;

            padding:
                2px 3px;

        }


        .pdf-wrong {

            background:
                #fee2e2;

            color:
                #991b1b;

            border-radius:
                2px;

            padding:
                2px 3px;

        }


        .pdf-result {

            margin-top:
                3px;

            font-size:
                8.5pt;

            font-weight:
                bold;

        }


        .pdf-right {

            color:
                #166534;

        }


        .pdf-wrong-result {

            color:
                #991b1b;

        }


        .pdf-remark {

            margin-top:
                3px;

            padding:
                3px 5px;

            background:
                #f9fafb;

            border-left:
                2px solid #2563eb;

            font-size:
                8.5pt;

        }


        .pdf-footer {

            margin-top:
                8px;

            padding-top:
                5px;

            border-top:
                1px solid #222;

            display:
                flex;

            justify-content:
                space-between;

            gap:
                10px;

            font-size:
                7.5pt;

        }

    `;


    wrapper.appendChild(
        style
    );


    return wrapper;

}


/* =========================================================
   CLEAR
   ========================================================= */

function clearQuestions() {

    questionsContainer.innerHTML = `

        <div class="welcome-box">

            <div class="welcome-icon">
                📚
            </div>

            <h2>
                Select a subject
            </h2>

            <p>
                Choose a subject to begin.
            </p>

        </div>

    `;

}


/* =========================================================
   ESCAPE HTML
   ========================================================= */

function escapeHTML(value) {

    if (
        value === undefined ||
        value === null
    ) {

        return "";

    }


    return String(
        value
    )
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


/* =========================================================
   SANITIZE FILE NAME
   ========================================================= */

function sanitizeFilename(
    filename
) {

    return filename.replace(
        /[<>:"/\\|?*]/g,
        "_"
    );

}
```
