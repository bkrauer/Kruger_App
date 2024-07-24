let currentLanguage = 'en';
let animals;

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
        weight: "Weight",
        height: "Height",
        age: "Age",
        whereToSpot: "Where to spot",
        funFacts: "Fun Facts"
    },
    de: {
       title: "Krüger National Park Tier-Quiz",
        score: "Punkte",
        nextButton: "Nächsted Tier",
        correct: "Richtig!",
        incorrect: "Leider Falsch. Die richtige Antwort ist",
        quizCompleted: "Quiz fertig!",
        finalScore: "Deine Punktezahl ist:",
        outOf: "von",
        playAgain: "Nochmals spielen",
        weight: "Gewicht",
        height: "Grösse",
        age: "Alter",
        whereToSpot: "Wo finde ich es?",
        funFacts: "Fun Facts"
    }
};

function setLanguage(lang) {
    currentLanguage = lang;
    animals = (lang === 'en') ? animalsEN : animalsDE;
    updateUI();
}

// ... Der Rest Ihres bestehenden app.js-Codes bleibt unverändert ...

// Initialisieren Sie die Sprache und das Quiz
setLanguage('en');
initQuiz();





let currentLanguage = 'en';

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
        weight: "Weight",
        height: "Height",
        age: "Age",
        whereToSpot: "Where to spot",
        funFacts: "Fun Facts"
    },
    de: {
       title: "Krüger National Park Tier-Quiz",
        score: "Punkte",
        nextButton: "Nächsted Tier",
        correct: "Richtig!",
        incorrect: "Leider Falsch. Die richtige Antwort ist",
        quizCompleted: "Quiz fertig!",
        finalScore: "Deine Punktezahl ist:",
        outOf: "von",
        playAgain: "Nochmals spielen",
        weight: "Gewicht",
        height: "Grösse",
        age: "Alter",
        whereToSpot: "Wo finde ich es?",
        funFacts: "Fun Facts"
    }
};

const animals = [
    {
        name: "Lion",
        image: "images/lion.jpg",
        options: ["Tiger", "Leopard", "Lion"],
        weight: "250 kg",
        height: "1.2 meters",
        age: "15 years",
        spot: "You can see lions in open savannah areas, especially in the early morning or late afternoon.",
        fun_facts: [
            "Lions are the only cats that live in groups called prides.",
            "A lion's roar can be heard up to 8 kilometers away.",
            "Male lions have majestic manes."
        ]
    },
    {
        name: "Elephant",
        image: "images/elephant.jpg",
        options: ["Elephant", "Giraffe", "Buffalo"],
        weight: "6000 kg",
        height: "3.3 meters",
        age: "70 years",
        spot: "Look for elephants near waterholes and rivers, especially during the dry season.",
        fun_facts: [
            "Elephants use their trunks to drink and pick up food.",
            "They have the largest brains of any land animal.",
            "Elephants are excellent swimmers."
        ]
    },
    // Add more animals here
];

let currentAnimalIndex;
let score = 0;
let animalsToShow;

function setLanguage(lang) {
    currentLanguage = lang;
    updateUI();
}

function updateUI() {
    document.getElementById('title').innerText = translations[currentLanguage].title;
    document.getElementById('score').innerText = `${translations[currentLanguage].score}: ${score}`;
    document.getElementById('next-button').innerText = translations[currentLanguage].nextButton;
    if (currentAnimalIndex < animalsToShow.length) {
        displayAnimal();
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function initQuiz() {
    animalsToShow = [...animals];
    shuffleArray(animalsToShow);
    currentAnimalIndex = 0;
    score = 0;
    updateUI();
}

function displayAnimal() {
    const animal = animalsToShow[currentAnimalIndex];
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
initQuiz();

const animals = [
    {
        name: "Hyena",
        image: "images/hyena_2.jpg",
        options: ["Cat", "Hyena", "Leopard"],
        fact: ""
    },
    {
        name: "Hyena",
        image: "images/hyena_1.jpg",
        options: ["Cat", "Genet", "Hyena"],
        fact: ""
    },
    {
        name: "Zebra",
        image: "images/zebra_1.jpg",
        options: ["Cat", "Genet", "Zebra"],
        fact: ""
    },
    {
        name: "Rhino",
        image: "images/rhino.jpg",
        options: ["Cat", "Genet", "Rhino"],
        fact: ""
    },
    {
        name: "Leopard",
        image: "images/leopard_2.jpg",
        options: ["Cat", "Genet", "Leopard"],
        fact: ""
    },
    {
        name: "Leopard",
        image: "images/leopard_1.jpg",
        options: ["Cat", "Genet", "Leopard"],
        fact: ""
    },
    {
        name: "Kingfisher",
        image: "images/kingfisher.jpg",
        options: ["Kingfisher", "Genet", "Leopard"],
        fact: ""
    },
    {
        name: "Impala",
        image: "images/impala_1.jpg",
        options: ["Cat", "Impala", "Leopard"],
        fact: ""
    },
    {
        name: "Hippo",
        image: "images/hippo_1.jpg",
        options: ["Hyppo", "Genet", "Leopard"],
        fact: ""
    },
    {
        name: "Giraffe",
        image: "images/giraffe.jpg",
        options: ["Cat", "Genet", "Leopard"],
        fact: ""
    },
    {
        name: "genet",
        image: "images/genet.jpg",
        options: ["Cat", "Giraffe", "Leopard"],
        fact: ""
    {
        name: "Elephant",
        image: "images/elephant_1.jpg",
        options: ["Lion", "Elephant", "Leopard"],
        fact: "African elephants are the largest land animals on Earth. They can live up to 70 years in the wild."
    },
        {
        name: "Buffalo",
        image: "images/buffalo.jpg",
        options: ["Lion", "Cheetah", "Buffalo"],
        fact: "Lions are the only cats that live in groups, called prides. They are apex predators and are known as the 'King of the Jungle'."
    },
    {
        name: "Lion",
        image: "images/lion.jpg",
        options: ["Lion", "Cheetah", "Leopard"],
        fact: "Lions are the only cats that live in groups, called prides. They are apex predators and are known as the 'King of the Jungle'."
    },
    {
        name: "Lion",
        image: "images/lion_2.jpg",
        options: ["Lion", "Cheetah", "Leopard"],
        fact: "Lions are the only cats that live in groups, called prides. They are apex predators and are known as the 'King of the Jungle'."
    },
    {
        name: "Elephant",
        image: "images/elephant.jpg",
        options: ["Cat", "Genet", "Elephant"],
        fact: "African elephants are the largest land animals on Earth. They can live up to 70 years in the wild."
    }
];

let currentAnimal = 0;

function displayAnimal() {
    const animal = animals[currentAnimal];
    document.getElementById('image-container').innerHTML = `<img src="${animal.image}" alt="${animal.name}">`;
    
    const optionsHtml = animal.options.map(option => 
        `<button onclick="checkAnswer('${option}')">${option}</button>`
    ).join('');
    
    document.getElementById('options-container').innerHTML = optionsHtml;
    document.getElementById('result').innerHTML = '';
    document.getElementById('fact-container').innerHTML = '';
    document.getElementById('next-button').style.display = 'none';
}

function checkAnswer(selectedOption) {
    const animal = animals[currentAnimal];
    if (selectedOption === animal.name) {
        document.getElementById('result').innerHTML = 'Correct!';
    } else {
        document.getElementById('result').innerHTML = `Incorrect. The correct answer is ${animal.name}.`;
    }
    document.getElementById('fact-container').innerHTML = `<p>${animal.fact}</p>`;
    document.getElementById('next-button').style.display = 'block';
}

function nextAnimal() {
    currentAnimal = (currentAnimal + 1) % animals.length;
    displayAnimal();
}

document.getElementById('next-button').addEventListener('click', nextAnimal);

// Start the quiz
displayAnimal();

