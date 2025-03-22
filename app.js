const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");

const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const scoreDisplay = document.querySelector("#right-answers");

let shuffledQuestions, currentQuestionIndex;
let quizScore = 0;

startButton.addEventListener("click", startQuiz);

nextButton.addEventListener("click", () => {
	currentQuestionIndex++;
	setNextQuestion();
});

function startQuiz() {
	startButton.classList.add("hide");
	// shuffledQuestions = questions.sort(() => Math.random() - 0.5);
	shuffledQuestions = shuffleQuestions([...questions]);
	currentQuestionIndex = 0;
	quizScore = 0;
	questionContainer.classList.remove("hide");
	scoreDisplay.innerText = "";
	scoreDisplay.parentElement.classList.add("hide");
	setNextQuestion();
}

// Using Fisher-Yates Shuffle algorithm
function shuffleQuestions(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * i + 1);
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
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
	const options = Array.from(answerButtons.children);
	options.forEach(option => {
		setStatus(option, option.dataset.correct);
	});

	if (shuffledQuestions.length > currentQuestionIndex + 1) {
		nextButton.classList.remove("hide");
	} else {
		startButton.innerText = "Restart";
		startButton.classList.remove("hide");

		questionContainer.classList.add("hide");
		nextButton.classList.add("hide");

		scoreDisplay.innerText = `🎉 Quiz Completed! Your Score: ${quizScore}/${shuffledQuestions.length}`;
		scoreDisplay.parentElement.classList.remove("hide");
		return;
	}
	scoreDisplay.innerText = `Score: ${quizScore}`;
	scoreDisplay.parentElement.classList.remove("hide");
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
		question:
			"Which of the following is the most important feature that makes Java suitable for Internet applications?",
		answers: [
			{ text: "Object-oriented & robust", correct: false },
			{ text: "Portable & distributed", correct: true },
			{ text: "Faster execution", correct: false },
			{ text: "Simple & secure", correct: false },
		],
	},
	{
		question:
			"Which approach of system development is easy to accommodate product changes, but not suitable for large high-risk or mission-critical projects?",
		answers: [
			{ text: "Agile", correct: true },
			{ text: "Spiral", correct: false },
			{ text: "Rapid Application Development (RAD)", correct: false },
			{ text: "Prototype", correct: false },
		],
	},
	{
		question:
			"Which software testing is used to check the defects in a software without executing the actual code?",
		answers: [
			{ text: "White Box", correct: false },
			{ text: "Black Box", correct: false },
			{ text: "Performance Analysis testing", correct: false },
			{ text: "Static testing", correct: true },
		],
	},
	{
		question: "The size of the 'total length field' of IPv4 datagram is?",
		answers: [
			{ text: "16 bits", correct: true },
			{ text: "32 bits", correct: false },
			{ text: "8 bits", correct: false },
			{ text: "4 bits", correct: false },
		],
	},
	{
		question:
			"Indices whose search key specifies an order different from the sequential order of the file are called?",
		answers: [
			{ text: "Primary Indices", correct: false },
			{ text: "Random Indices", correct: false },
			{ text: "Secondary Indices", correct: true },
			{ text: "Sequential Indices", correct: false },
		],
	},
	{
		question:
			"Which of the following Multiple Access Protocols is NOT suitable for wired networks?",
		answers: [
			{ text: "CSMA/CD", correct: false },
			{ text: "TDMA", correct: false },
			{ text: "TGMA", correct: false },
			{ text: "CSMA/CA", correct: true },
		],
	},
];
