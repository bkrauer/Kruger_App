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
