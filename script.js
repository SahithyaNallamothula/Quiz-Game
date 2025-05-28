const quizData = [
  // CSE-related questions
  {
    question: "What does CPU stand for in computing?",
    options: [
      "Central Process Unit",
      "Central Processing Unit",
      "Computer Personal Unit",
      "Central Processor Unit"
    ],
    answer: "Central Processing Unit"
  },
  {
    question: "Which data structure uses FIFO (First In, First Out) principle?",
    options: ["Stack", "Queue", "Tree", "Graph"],
    answer: "Queue"
  },
  {
    question: "Which programming language is primarily used for web development?",
    options: ["Python", "C++", "HTML", "Java"],
    answer: "HTML"
  },
  {
    question: "Which programming language is known for its use in data analysis and machine learning?",
    options: ["Java", "Python", "C#", "Ruby"],
    answer: "Python"
  },
  // Pahalgam attack and Operation Sindoor questions
  {
    question: "What was the primary target of the 2025 Pahalgam attack?",
    options: ["Military personnel", "Tourists", "Political leaders", "Religious sites"],
    answer: "Tourists"
  },
  {
    question: "Which terrorist group claimed responsibility for the 2025 Pahalgam attack?",
    options: ["Jaish-e-Mohammed", "Lashkar-e-Taiba", "The Resistance Front", "Hizbul Mujahideen"],
    answer: "The Resistance Front"
  },
  {
    question: "What was Operation Sindoor launched in response to?",
    options: ["Border skirmishes", "Pahalgam attack", "Cyber attack", "Economic sanctions"],
    answer: "Pahalgam attack"
  },
  {
    question: "Which indigenous air defense system was highlighted during Operation Sindoor?",
    options: ["Akash", "Akashteer", "Barak-8", "Prithvi"],
    answer: "Akashteer"
  },
  {
    question: "Which artillery system was used in Operation Sindoor to target terror camps?",
    options: ["Bofors", "Dhanush", "M-777 Howitzer", "Pinaka"],
    answer: "M-777 Howitzer"
  },
  {
    question: "Which valley in PoK saw significant destruction during Operation Sindoor?",
    options: ["Neelum Valley", "Leepa Valley", "Swat Valley", "Kurram Valley"],
    answer: "Leepa Valley"
  }
];

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const timerEl = document.getElementById("timer");
const nextBtn = document.getElementById("next-btn");
const resultEl = document.getElementById("result");
const scoreEl = document.getElementById("score");
const restartBtn = document.getElementById("restart-btn");

let currentQuestion = 0;
let score = 0;
let timeLeft = 15;
let timer;

function loadQuestion() {
  clearInterval(timer);
  timeLeft = 15;
  timerEl.textContent = `Time left: ${timeLeft}s`;
  timer = setInterval(updateTimer, 1000);

  const currentQuiz = quizData[currentQuestion];
  questionEl.textContent = currentQuiz.question;
  optionsEl.innerHTML = "";

  currentQuiz.options.forEach(option => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.textContent = option;
    button.addEventListener("click", () => selectAnswer(button, currentQuiz.answer));
    li.appendChild(button);
    optionsEl.appendChild(li);
  });
}

function updateTimer() {
  timeLeft--;
  timerEl.textContent = `Time left: ${timeLeft}s`;
  if (timeLeft === 0) {
    clearInterval(timer);
    disableOptions();
    nextBtn.disabled = false;
  }
}

function selectAnswer(button, correctAnswer) {
  clearInterval(timer);
  const selected = button.textContent;
  if (selected === correctAnswer) {
    score++;
    button.classList.add("correct");
  } else {
    button.classList.add("incorrect");
    // Highlight the correct answer
    const buttons = optionsEl.querySelectorAll("button");
    buttons.forEach(btn => {
      if (btn.textContent === correctAnswer) {
        btn.classList.add("correct");
      }
    });
  }
  disableOptions();
  nextBtn.disabled = false;
}

function disableOptions() {
  const buttons = optionsEl.querySelectorAll("button");
  buttons.forEach(btn => btn.disabled = true);
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
    nextBtn.disabled = true;
  } else {
    showResult();
  }
});

restartBtn.addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  resultEl.classList.add("hidden");
  document.getElementById("quiz").classList.remove("hidden");
  loadQuestion();
  nextBtn.disabled = true;
});

function showResult() {
  document.getElementById("quiz").classList.add("hidden");
  resultEl.classList.remove("hidden");
  scoreEl.textContent = `${score} / ${quizData.length}`;
}

// Initialize quiz
loadQuestion();
nextBtn.disabled = true;
