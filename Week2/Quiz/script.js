const quiz = [
    {
        question: "Which language runs in a web browser?",
        options: ["Python", "Java", "JavaScript", "C++"],
        answer: "JavaScript"
    },
    {
        question: "What does DOM stand for?",
        options: [
            "Document Object Model",
            "Data Object Management",
            "Digital Ordinance Model",
            "Desktop Oriented Mode"
        ],
        answer: "Document Object Model"
    },
    {
        question: "Which keyword declares a constant?",
        options: ["var", "let", "const", "static"],
        answer: "const"
    },
    {
        question: "Which HTML tag links JavaScript?",
        options: ["<style>", "<script>", "<link>", "<js>"],
        answer: "<script>"
    }
];

let index = 0;
let score = 0;
let time = 15;
let timer;

const question = document.getElementById("question");
const options = document.getElementById("options");
const timerEl = document.getElementById("timer");
const next = document.getElementById("next-btn");
const scoreEl = document.getElementById("score");

function loadQuiz() {
    clearInterval(timer);

    time = 15;
    timerEl.textContent = time;

    question.textContent = quiz[index].question;
    options.innerHTML = "";

    quiz[index].options.forEach(option => {
        const btn = document.createElement("button");
        btn.textContent = option;

        btn.onclick = () => {
            if (option === quiz[index].answer) score++;
            nextQuestion();
        };

        options.appendChild(btn);
    });

    
    timer = setInterval(() => {
        time--;
        timerEl.textContent = time;

        if (time === 0) {
            nextQuestion();
        }
    }, 1000);
}

function nextQuestion() {
    clearInterval(timer);
    index++;

    if (index < quiz.length) {
        loadQuiz();
    } else {
        question.textContent = "Quiz Completed!";
        options.innerHTML = "";
        next.style.display = "none";
        timerEl.textContent = "0";
        scoreEl.textContent = `Score: ${score}/${quiz.length}`;
    }
}

next.onclick = nextQuestion;

loadQuiz();