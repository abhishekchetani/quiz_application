const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");

const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");

let shuffledQuestions, currentQuestionIndex;
let quizScore = 0;

const questions = [
	{
		question: "Which of the following is a JavaScript Framework?",
		answers: [
			{ text: "Django", correct: false },
			{ text: "React", correct: true },
			{ text: "Spring", correct: false },
			{ text: "Bootstrap", correct: false },
		],
	},
	{
		question: "Which of the following is a Version Control System?",
		answers: [
			{ text: "Azure", correct: false },
			{ text: "Docker", correct: false },
			{ text: "Git", correct: true },
			{ text: "NPM", correct: false },
		],
	},
	{
		question: "Which of the following is a JavaScript Framework?",
		answers: [
			{ text: "Django", correct: false },
			{ text: "React", correct: true },
			{ text: "Spring", correct: false },
			{ text: "Bootstrap", correct: false },
		],
	},
	{
		question: "Which of the following is a JavaScript Framework?",
		answers: [
			{ text: "Django", correct: false },
			{ text: "React", correct: true },
			{ text: "Spring", correct: false },
			{ text: "Bootstrap", correct: false },
		],
	},
];

startButton.addEventListener("click", startQuiz);

nextButton.addEventListener("click", () => {
	currentQuestionIndex++;
	setNextQuestion();
});

function startQuiz() {
	startButton.classList.add("hide");
	shuffledQuestions = questions.sort(() => Math.random() - 0.5);
	currentQuestionIndex = 0;
	questionContainer.classList.remove("hide");
	setNextQuestion();
	quizScore = 0;
}

function setNextQuestion() {
	resetState();
	showQuestion(shuffledQuestions[currentQuestionIndex]);
}

const showQuestion = question => {
	questionElement.innerText = question.question;
	question.answers.forEach(answer => {
		const button = document.createElement("button");
		button.innerText = answer.text;
		button.classList.add("btn");
		if (answer.correct) {
			button.dataset.correct = answer.correct;
		}
		button.addEventListener("click", selectAnswer);
		answerButtons.appendChild(button);
	});
};

const resetState = () => {
	clearStatus(document.body);
	nextButton.classList.add("hide");
	while (answerButtons.firstChild) {
		answerButtons.removeChild(answerButtons.firstChild);
	}
};

function selectAnswer(e) {
	const selectedOption = e.target;
	const correct = selectedOption.dataset.correct;
	setStatus(document.body, correct);
	if (correct) {
		quizScore++;
	}
	Array.from(answerButtons.children).forEach(option => {
		setStatus(option, option.dataset.correct);
	});

	if (shuffledQuestions.length > currentQuestionIndex + 1) {
		nextButton.classList.remove("hide");
	} else {
		startButton.innerText = "Restart";
		startButton.classList.remove("hide");
	}
	document.querySelector("#right-answers").innerText = quizScore;
}

function setStatus(option, correct) {
	clearStatus(option);
	if (correct) {
		option.classList.add("correct");
	} else {
		option.classList.add("wrong");
	}
}

function clearStatus(option) {
	option.classList.remove("correct");
	option.classList.remove("wrong");
}
