let questions = [
  {
    question: "What is 2 + 2?",
    options: [2, 3, 4, 5],
    answer: 4
  },
  {
    question: "Capital of India?",
    options: ["Mumbai", "Delhi", "Pune", "Chennai"],
    answer: "Delhi"
  }
];

let currentQuestion = 0;
let score = 0;

function startQuiz() {
  document.getElementById("quiz").style.display = "block";
  showQuestion();
}

function showQuestion() {
  let q = questions[currentQuestion];
  document.getElementById("question").innerText = q.question;

  let optionsHTML = "";
  q.options.forEach(option => {
    optionsHTML += `<button onclick="checkAnswer('${option}')">${option}</button><br>`;
  });

  document.getElementById("options").innerHTML = optionsHTML;
}

function checkAnswer(selected) {
  let correct = questions[currentQuestion].answer;

  if (selected == correct) {
    score++;
    alert("Correct!");
  } else {
    alert("Wrong!");
  }

  currentQuestion++;

  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  document.getElementById("quiz").innerHTML =
    `<h2>Your Score: ${score}/${questions.length}</h2>`;
}
