const questions = [ 
    {
        question: "What is the largest planet in our solar system?",
        answers: [
            { text: "Mercury", correct: false },
            { text: "Jupiter", correct: true },
            { text: "Earth", correct: false },
            { text: "Venus", correct: false }
        ]
    },
    {
        question: "Which element has the chemical symbol 'O'?",
        answers: [
            { text: "Osmium", correct: false },
            { text: "Oxygen", correct: true },
            { text: "Gold", correct: false },
            { text: "Iron", correct: false }
        ]
    },
    {
        question: "Which country is home to the kangaroo?",
        answers: [
            { text: "Brazil", correct: false },
            { text: "India", correct: false },
            { text: "South Africa", correct: false },
            { text: "Australia", correct: true }
        ]
    },
    {
        question: "What is the capital city of Japan?",
        answers: [
            { text: "Tokyo", correct: true },
            { text: "Beijing", correct: false },
            { text: "Seoul", correct: false },
            { text: "Bangkok", correct: false }
        ]
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        answers: [
            { text: "Charles Dickens", correct: false },
            { text: "Mark Twain", correct: false },
            { text: "William Shakespeare", correct: true },
            { text: "Leo Tolstoy", correct: false }
        ]
    },
    {
        question: "What is the hardest natural substance on Earth?",
        answers: [
            { text: "Gold", correct: false },
            { text: "Iron", correct: false },
            { text: "Quartz", correct: false },
            { text: "Diamond", correct: true },
        ]
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Mars", correct: true },
            { text: "Venus", correct: false },
            { text: "Saturn", correct: false },
            { text: "Neptune", correct: false }
        ]
    },
    {
        question: "What is the largest ocean on Earth?",
        answers: [
            { text: "Atlantic Ocean", correct: false },
            { text: "Pacific Ocean", correct: true },
            { text: "Indian Ocean", correct: false },
            { text: "Arctic Ocean", correct: false }
        ]
    },
    {
        question: "In which year did the Titanic sink?",
        answers: [
            { text: "1920", correct: false },
            { text: "1898", correct: false },
            { text: "1905", correct: false },
            { text: "1912", correct: true }
        ]
    },
    {
        question: "What is the chemical symbol for water?",
        answers: [
            { text: "H2O", correct: true },
            { text: "CO2", correct: false },
            { text: "O2", correct: false },
            { text: "H2", correct: false }
        ]
    }
];

const questionElement = document.getElementById("question"); // Displays the current question.
const answerBtn = document.getElementById("answerButton"); // Container for answer buttons.
const nextBtn = document.getElementById("nextButton"); // Button to go to the next question.
const finishMessage = document.querySelector(".finish-message"); // Section to display final score.
const restartBtn = document.getElementById("restartBtn"); // Button to restart the quiz.
const questionWrapper = document.querySelector(".question-wrapper"); // Wrapper for the question and answers.

// State variables to track the quiz progress and user interactions.
let currentQuestionIndex = 0; // Index of the current question in the `questions` array.
let score = 0; // Tracks the user's score.
let selectedAnswer = false; // Boolean to ensure only one answer can be selected per question.

// Initializes the quiz.
function startQuiz() {
    currentQuestionIndex = 0; // Reset to the first question.
    score = 0; // Reset the score.
    nextBtn.style.display = "none"; // Hide the "Next" button at the start.
    finishMessage.style.display = "none"; // Hide the finish message.
    questionWrapper.style.display = "block"; // Show the question wrapper.
    answerBtn.style.display = "flex"; // Ensure the answer buttons are visible.
    showQuestion(); // Display the first question.
}

// Displays the current question and its answers.
function showQuestion() {
    resetState(); // Reset styles and state for the new question.
    let currentQuestion = questions[currentQuestionIndex]; // Get the current question object.
    questionElement.innerHTML = (currentQuestionIndex + 1) + ". " + currentQuestion.question; // Display the question number and text.
    
    // Loop through the answers for the current question and assign text and click handlers to buttons.
    currentQuestion.answers.forEach((answer, index) => {
        const button = document.querySelector(`.answer-buttons .${String.fromCharCode(97 + index)} .btn`); // Select button by its class.
        button.innerHTML = answer.text; // Set the button text.
        button.onclick = () => selectAnswer(button, answer.correct); // Add click handler to handle answer selection.
    });
}

// Resets the state for a new question.
function resetState() {
    nextBtn.style.display = "none"; // Hide the "Next" button.
    selectedAnswer = false; // Allow answer selection for the new question.
    document.querySelectorAll('.btn').forEach(btn => { // Loop through all answer buttons.
        btn.disabled = false; // Enable the buttons.
        btn.classList.remove('correct', 'wrong', 'no-hover'); // Remove previous styles.
    });
}

// Handles the answer selection by the user.
function selectAnswer(button, isCorrect) {
    if (selectedAnswer) return; // Prevent multiple selections.
    selectedAnswer = true; // Mark that an answer has been selected.
    
    // Disable all buttons to prevent further clicks.
    document.querySelectorAll('.btn').forEach(btn => {
        btn.disabled = true;
        btn.classList.add('no-hover'); // Add a class to disable hover effects.
    });

    if (isCorrect) {
        button.classList.add('correct'); // Highlight the correct answer.
        score++; // Increment the score if the answer is correct.
    } else {
        button.classList.add('wrong'); // Highlight the selected wrong answer.
        showCorrectAnswer(); // Highlight the correct answer.
    }

    nextBtn.style.display = "block"; // Show the "Next" button to proceed.
}

// Highlights the correct answer if the user selected incorrectly.
function showCorrectAnswer() {
    const currentQuestion = questions[currentQuestionIndex]; // Get the current question object.
    currentQuestion.answers.forEach((answer, index) => {
        if (answer.correct) { // Find the correct answer.
            const correctButton = document.querySelector(`.answer-buttons .${String.fromCharCode(97 + index)} .btn`); // Select the correct button.
            correctButton.classList.add('correct'); // Highlight the correct answer.
        }
    });
}

// Displays the finish message with the user's score.
function showFinishMessage() {
    finishMessage.style.display = "block"; // Show the finish message.
    questionWrapper.style.display = "none"; // Hide the question wrapper.
    answerBtn.style.display = "none"; // Hide the answer buttons.
    nextBtn.style.display = "none"; // Hide the "Next" button.
    document.getElementById("congrats").innerHTML = `Your score is ${score}`; // Display the user's score.
}

// Handles the "Next" button click to move to the next question or finish the quiz.
nextBtn.addEventListener('click', () => {
    currentQuestionIndex++; // Increment the question index.
    if (currentQuestionIndex < questions.length) { // Check if there are more questions.
        showQuestion(); // Show the next question.
    } else {
        showFinishMessage(); // Display the finish message if the quiz is over.
    }
});

// Handles the "Restart" button click to restart the quiz.
restartBtn.addEventListener('click', startQuiz); 

// Starts the quiz when the script is first loaded.
startQuiz();