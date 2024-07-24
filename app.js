const animals = [
    {
        name: "Lion",
        image: "lion.jpg",
        options: ["Lion", "Cheetah", "Leopard"],
        fact: "Lions are the only cats that live in groups, called prides. They are apex predators and are known as the 'King of the Jungle'."
    },
    {
        name: "Elephant",
        image: "elephant.jpg",
        options: ["Rhino", "Hippo", "Elephant"],
        fact: "African elephants are the largest land animals on Earth. They can live up to 70 years in the wild."
    },
    // Add more animals here
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
