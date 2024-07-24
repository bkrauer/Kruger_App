console.log("App.js loaded");

let animalsEN = [];
let animalsDE = [];
let currentLanguage = 'en';
let animals = [];

const translations = {
    en: {
        title: "Kruger National Park Animal Quiz",
        score: "Score",
        nextButton: "Next Animal",
        correct: "Correct!",
        incorrect: "Incorrect. The correct answer is",
        quizCompleted: "Quiz Completed!",
        finalScore: "Your final score is:",
        outOf: "out of",
        playAgain: "Play Again",
        weight: "Weight up to",
        height: "Height up to",
        age: "Age up to",
        whereToSpot: "Where to spot",
        funFacts: "Fun Facts",
        startButton: "Start Quiz"
    },
    de: {
        title: "Krüger National Park Tier-Quiz",
        score: "Punkte",
        nextButton: "Nächstes Tier",
        correct: "Richtig!",
        incorrect: "Leider Falsch. Die richtige Antwort ist",
        quizCompleted: "Quiz fertig!",
        finalScore: "Deine Punktezahl ist:",
        outOf: "von",
        playAgain: "Nochmals spielen",
        weight: "Gewicht bis",
        height: "Grösse bis",
        age: "Alter bis",
        whereToSpot: "Wo finde ich es?",
        funFacts: "Fun Facts",
        startButton: "Quiz starten"
    }
};

let currentAnimalIndex;
let score = 0;
let animalsToShow;

function setLanguage(lang) {
    console.log("Setting language to:", lang);
    currentLanguage = lang;
    if (lang === 'en' && animalsEN.length > 0) {
        animals = animalsEN;
    } else if (lang === 'de' && animalsDE.length > 0) {
        animals = animalsDE;
    } else {
        console.error("Animal data not loaded for language:", lang);
        return;
    }
    updateUI();
}

function updateUI() {
    document.getElementById('title').innerText = translations[currentLanguage].title;
    document.getElementById('score').innerText = `${translations[currentLanguage].score}: ${score}`;
    document.getElementById('next-button').innerText = translations[currentLanguage].nextButton;
    document.getElementById('start-button').innerText = translations[currentLanguage].startButton;
}

function startQuiz() {
    console.log("startQuiz function called");
    document.getElementById('start-button').style.display = 'none';
    document.getElementById('quiz-content').style.display = 'block';
    initQuiz();
}

function initQuiz() {
    console.log("initQuiz function called");
    if (!animals || animals.length === 0) {
        console.error("No animals data loaded!");
        return;
    }
    animalsToShow = [...animals];
    shuffleArray(animalsToShow);
    currentAnimalIndex = 0;
    score = 0;
    updateUI();
    displayAnimal();
}

function loadAnimalData() {
    console.log("Loading animal data");
    // This assumes that animals_en.js and animals_de.js define animalsEN and animalsDE
    if (typeof window.animalsEN !== 'undefined') {
        animalsEN = window.animalsEN;
    }
    if (typeof window.animalsDE !== 'undefined') {
        animalsDE = window.animalsDE;
    }

    if (animalsEN.length === 0 && animalsDE.length === 0) {
        console.error("No animal data loaded!");
    } else {
        console.log("Animal data loaded successfully");
        setLanguage(currentLanguage);
    }
}

function displayAnimal() {
    console.log("displayAnimal function called");
    if (currentAnimalIndex >= animalsToShow.length) {
        console.log("No more animals to display");
        endQuiz();
        return;
    }
    const animal = animalsToShow[currentAnimalIndex];
    console.log("Displaying animal:", animal);
    document.getElementById('image-container').innerHTML = `<img src="${animal.image}" alt="${animal.name}">`;

    document.getElementById('animal-info').innerHTML = `
        <p><strong>${translations[currentLanguage].weight}:</strong> ${animal.weight}</p>
        <p><strong>${translations[currentLanguage].height}:</strong> ${animal.height}</p>
        <p><strong>${translations[currentLanguage].age}:</strong> ${animal.age}</p>
        <p><strong>${translations[currentLanguage].whereToSpot}:</strong> ${animal.spot}</p>
    `;

    const optionsHtml = animal.options.map(option =>
        `<button onclick="checkAnswer('${option}')">${option}</button>`
    ).join('');

    document.getElementById('options-container').innerHTML = optionsHtml;
    document.getElementById('result').innerHTML = '';
    document.getElementById('fact-container').innerHTML = '';
    document.getElementById('next-button').style.display = 'none';
}

function checkAnswer(selectedOption) {
    const animal = animalsToShow[currentAnimalIndex];
    if (selectedOption === animal.name) {
        document.getElementById('result').innerHTML = translations[currentLanguage].correct;
        score++;
        updateUI();
    } else {
        document.getElementById('result').innerHTML = `${translations[currentLanguage].incorrect} ${animal.name}.`;
    }
    displayFunFacts(animal);
    document.getElementById('next-button').style.display = 'block';
}

function displayFunFacts(animal) {
    const factsHtml = `
        <h3>${translations[currentLanguage].funFacts}:</h3>
        <ul>
            ${animal.fun_facts.map(fact => `<li>${fact}</li>`).join('')}
        </ul>
    `;
    document.getElementById('fact-container').innerHTML = factsHtml;
}

function nextAnimal() {
    currentAnimalIndex++;
    if (currentAnimalIndex < animalsToShow.length) {
        displayAnimal();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    document.getElementById('app').innerHTML = `
        <h1>${translations[currentLanguage].quizCompleted}</h1>
        <p>${translations[currentLanguage].finalScore} ${score} ${translations[currentLanguage].outOf} ${animalsToShow.length}</p>
        <button onclick="initQuiz()">${translations[currentLanguage].playAgain}</button>
    `;
}

document.getElementById('next-button').addEventListener('click', nextAnimal);

// Start the quiz
window.onload = function() {
    loadAnimalData();
    setLanguage('en');
};

// Helper function to shuffle the array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
