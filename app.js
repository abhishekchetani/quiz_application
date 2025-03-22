const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");

const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const scoreDisplay = document.querySelector("#right-answers");

const summary = document.getElementById("summary");
const liveScore = document.getElementById("live-score");
const remainingQuestions = document.getElementById("remaining-questions");
const feedback = document.getElementById("feedback");

const progressBar = document.getElementById("progress-bar");
const progressWrapper = document.getElementById("progress-wrapper");

let shuffledQuestions, currentQuestionIndex;
let quizScore = 0;

// Starting the quiz
startButton.addEventListener("click", startQuiz);

// Moving to the next question
nextButton.addEventListener("click", () => {
	currentQuestionIndex++;
	setNextQuestion();
});

function startQuiz() {
	startButton.classList.add("hide");

	// Shuffling questions using random comparison method
	// shuffledQuestions = questions.sort(() => Math.random() - 0.5);

	// Randomizing the questions array using Fisher-Yates algorithm
	shuffledQuestions = shuffleQuestions([...questions]);
	// Initializing variables
	currentQuestionIndex = 0;
	quizScore = 0;
	liveScore.innerText = quizScore;
	remainingQuestions.innerText = shuffledQuestions.length;

	// Setting appropriate classes
	questionContainer.classList.remove("hide");
	feedback.classList.add("hide");
	feedback.innerText = "";

	scoreDisplay.innerText = "";
	scoreDisplay.parentElement.classList.add("hide");
	scoreDisplay.parentElement.classList.remove("reveal");

	// Displaying the first question
	setNextQuestion();
	// Showing the progress bar
	progressWrapper.classList.remove("hide");
	updateProgressBar();
}

// Using Fisher-Yates Shuffle algorithm
function shuffleQuestions(array) {
	for (let currentIndex = array.length - 1; currentIndex > 0; currentIndex--) {
		const randomIndex = Math.floor(Math.random() * currentIndex + 1);
		[array[currentIndex], array[randomIndex]] = [
			array[randomIndex],
			array[currentIndex],
		];
	}
	return array;
}

const updateProgressBar = () => {
	const total = shuffledQuestions.length;
	const current = currentQuestionIndex + 1;
	const percent = Math.min((current / total) * 100, 100);
	progressBar.style.width = `${percent}%`;
};

function setNextQuestion() {
	// Clearing previous answers & styles
	resetState();
	// Displaying the next question
	showQuestion(shuffledQuestions[currentQuestionIndex]);
}

const showQuestion = question => {
	questionElement.innerText = question.question;

	// Dynamically creating buttons for each answer/option
	question.answers.forEach(answer => {
		const button = document.createElement("button");
		button.innerText = answer.text;
		button.classList.add("btn");

		// Setting the data-correct attribute of correct answer
		if (answer.correct) {
			button.dataset.correct = answer.correct;
		}
		// Starting main quiz logic
		button.addEventListener("click", selectAnswer);
		answerButtons.appendChild(button);
	});
};

const resetState = () => {
	// Clearing body styles
	clearStatus(document.body);
	nextButton.classList.add("hide");
	// Removing previous options
	while (answerButtons.firstChild) {
		answerButtons.removeChild(answerButtons.firstChild);
	}
	feedback.classList.add("hide");
	feedback.innerText = "";
};

function selectAnswer(e) {
	const selectedOption = e.target;
	const correct = selectedOption.dataset.correct;
	// Updating the body color based on answer
	setStatus(document.body, correct);

	if (correct) {
		quizScore++;
	}

	// Displaying live score during the quiz
	liveScore.innerText = quizScore;
	remainingQuestions.innerText =
		shuffledQuestions.length - (currentQuestionIndex + 1);
	summary.classList.remove("hide");

	// Applying styles to each option
	const options = Array.from(answerButtons.children);
	options.forEach(option => {
		setStatus(option, option.dataset.correct);
	});

	// Displaying feedback & progress bar
	feedback.classList.remove("hide");
	feedback.innerText = correct ? "✅ Correct!" : "❌ Oops! That was wrong.";
	updateProgressBar();

	// Showing next/restart button based on question count
	if (shuffledQuestions.length > currentQuestionIndex + 1) {
		nextButton.classList.remove("hide");
	} else {
		startButton.innerText = "Restart";
		startButton.classList.remove("hide");

		questionContainer.classList.add("hide");
		nextButton.classList.add("hide");

		// Final Scoreboard after last question
		scoreDisplay.innerText = `🎉 Quiz Completed! Your Score: ${quizScore}/${shuffledQuestions.length}`;
		scoreDisplay.parentElement.classList.remove("hide");
		scoreDisplay.parentElement.classList.add("reveal");

		confetti({
			particleCount: 100,
			spread: 70,
			origin: { y: 0.6 },
		});

		// Hiding feedback & progress bar after quiz completion
		summary.classList.add("hide");
		setTimeout(() => {
			feedback.innerText = "";
			feedback.classList.add("hide");
			progressWrapper.classList.add("hide");
		}, 1200);

		return;
	}
}

// Applying styles based on correct/wrong answers
function setStatus(option, correct) {
	clearStatus(option);
	if (correct) {
		option.classList.add("correct");
	} else {
		option.classList.add("wrong");
	}
}

// Removing any previous styles
function clearStatus(option) {
	option.classList.remove("correct");
	option.classList.remove("wrong");
}

// Quiz Questions & Answers
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
