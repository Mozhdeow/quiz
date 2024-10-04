const startBtn = document.querySelector('.start-btn');
const popupInfo = document.querySelector('.popup-info');
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const continueBtn = document.querySelector('.continue-btn');
const quizSection = document.querySelector('.quiz-section');
const quizBox = document.querySelector('.quiz-box');
const resultBox = document.querySelector('.result-box');
const tryAgainBtn = document.querySelector('.tryAgain-btn');
const goHomeBtn = document.querySelector('.goHome-btn');

//open
startBtn.onclick = () => {
    popupInfo.classList.add('active');
    //blur bg
    main.classList.add('active');
}

//colse
exitBtn.onclick = () => {
    //open popup
    popupInfo.classList.remove('active');
    //rem blur bg
    main.classList.remove('active');
}

//continue btn -> slide right
continueBtn.onclick = () => {
    quizSection.classList.add('active');
    popupInfo.classList.remove('active');
    main.classList.remove('active');
    quizBox.classList.add('active');

    showQuestions(0);
    questionCounter(1);
    headerScore();
}

//try again
tryAgainBtn.onclick = () => {
    quizBox.classList.add('active');
    nextbtn.classList.remove('active');
    resultBox.classList.remove('active');

    questionCount = 0;
    questionNumb = 1;
    userScore = 0;
    showQuestions(questionCount);
    questionCounter(questionNumb);

    headerScore();
}

//go home btn
goHomeBtn.onclick = () => {
    quizSection.classList.remove('active');
    nextbtn.classList.remove('active');
    resultBox.classList.remove('active');

    questionCount = 0;
    questionNumb = 1;
    userScore = 0;
    showQuestions(questionCount);
    questionCounter(questionNumb);

}


let questionCount = 0;
let questionNumb = 1;
let userScore = 0;

const nextbtn = document.querySelector('.next-btn');

//start numb 1 to 5 
nextbtn.onclick = () => {
    if (questionCount < questions.length - 1) {
        questionCount++;
        showQuestions(questionCount);

        questionNumb++;
        questionCounter(questionNumb);

        nextbtn.classList.remove('active');
    }
    else {
        showResultBox();
    }
    
}


const optionList = document.querySelector('.option-list');
//questions and option -> array
function showQuestions(index) {
    const questionText = document.querySelector('.question-text');
    questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;

    //answere from array
    let optionTag = `<div class="option"><span>${questions[index].options[0]}</span></div>
        <div class="option"><span>${questions[index].options[1]}</span></div>
        <div class="option"><span>${questions[index].options[2]}</span></div>
        <div class="option"><span>${questions[index].options[3]}</span></div>`;

    optionList.innerHTML = optionTag;

    const option = document.querySelectorAll('.option');
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute('onclick', 'optionSelected(this)');
    }
}

//user answer
function optionSelected(answer) {
    let userAnswer = answer.textContent;
    let correctAnswer = questions[questionCount].answer;
    let allOptions = optionList.children.length;

    if (userAnswer == correctAnswer) {
        answer.classList.add('correct');
        userScore += 1;
        headerScore();
    }    
    else {
        answer.classList.add('incorrect');

        //auto correct answer
        for (let i = 0; i < allOptions; i++){
            if (optionList.children[i].textContent == correctAnswer) {
                optionList.children[i].setAttribute('class', 'option correct');
            }
        }
    }

    //if user has selected disable all options
    for (let i = 0; i < allOptions; i++){
        optionList.children[i].classList.add('disabled');
    }

    nextbtn.classList.add('active');
}

function questionCounter(index) {
    const questionTotal = document.querySelector('.question-total');
    questionTotal.textContent = `${index} از ${questions.length} سوال`
}

//user score
function headerScore() {
    const headerScoreText = document.querySelector('.header-score');
    headerScoreText.textContent = `Score: ${userScore} / ${questions.length}`;
}

//result 
function showResultBox() {
    quizBox.classList.remove('active');
    resultBox.classList.add('active');

    //finall score
    const scoreText = document.querySelector('.score-text');
    scoreText.textContent = `نمره شما ${userScore} از ${questions.length}`;

    const circularProgress = document.querySelector('.circlar-progress');
    const progressValue = document.querySelector('.progress-value');
    let progressStartValue = -1;
    let progressEndValue = (userScore / questions.length) * 100;
    let speed = 20;

    let progress = setInterval(() => {
        progressStartValue++;
        progressValue.textContent = `${progressStartValue}`;

        circularProgress.style.background = `conic-gradient(#c40094 ${progressStartValue * 3.6}deg, rgba(255, 255, 255, .1) 0deg)`;
        if (progressStartValue == progressEndValue) {
            clearInterval(progress);
        }
    }, speed);
}