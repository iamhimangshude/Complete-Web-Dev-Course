document.addEventListener("DOMContentLoaded", () => {
  let startBtn = document.getElementById("start-btn");
  let nextBtn = document.getElementById("next-btn");
  let restartBtn = document.getElementById("restart-btn");
  let questionContainer = document.getElementById("question-container");
  let questionText = document.getElementById("question-text");
  let choicesList = document.getElementById("choices-list");
  let resultContainer = document.getElementById("result-container");
  let scoreDisplay = document.getElementById("score");

  const questions = [
    {
      question: "What is the capital of India",
      choices: ["Mumbai", "Ahmedabad", "Kolkata", "New Delhi"],
      answer: "New Delhi",
      correct: 2,
    },
    {
      question: "Which one is the mother of all Programming languages?",
      choices: ["Python", "C", "Rust", "Langchain"],
      answer: "C",
      correct: 2,
    },
    {
      question: "Which one of these is an IDE?",
      choices: ["VS Code", "PowerPoint", "Notepad", "Word"],
      answer: "VS Code",
      correct: 1,
    },
  ];

  let currentQuestionIndex = 0;
  let score = 0;
  let totalScore = 0;
  let flag = false;

  startBtn.addEventListener("click", startQuiz);

  nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    flag = false;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  });

  restartBtn.addEventListener("click", restartQuiz);

  function startQuiz() {
    startBtn.classList.add("hidden");
    resultContainer.classList.add("hidden");
    questionContainer.classList.remove("hidden");
    showQuestion();
  }

  function showQuestion() {
    nextBtn.classList.add("hidden");
    questionText.textContent = questions[currentQuestionIndex].question;
    choicesList.innerHTML = ""; // clear previous choices
    questions[currentQuestionIndex].choices.forEach((ch) => {
      const li = document.createElement("li");
      li.textContent = ch;
      li.addEventListener("click", (e) => {
        if (!flag) {
          e.target.style.backgroundColor = "#843aec";
          selectAnswer(ch);
        }
      });

      choicesList.appendChild(li);
    });
  }

  function selectAnswer(choice) {
    flag = true;
    const correctAnswer = questions[currentQuestionIndex].answer;

    if (choice == correctAnswer) {
      score += questions[currentQuestionIndex].correct;
    }
    nextBtn.classList.remove("hidden");
  }

  function showResult() {
    questionContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");
    totalScore = questions.reduce((acc, cur) => acc + cur.correct, 0);
    scoreDisplay.textContent = `${score} out of ${totalScore}`;
  }

  function restartQuiz() {
    score = 0;
    flag = false;
    currentQuestionIndex = 0;
    resultContainer.classList.add("hidden");
    questionContainer.classList.add("hidden");
    startBtn.classList.remove("hidden");
  }
});
