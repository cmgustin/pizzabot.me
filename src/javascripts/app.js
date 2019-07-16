import './modules'

// Generate year for copyright
const year = new Date().getFullYear();
document.querySelector("#copyright span").innerHTML = year;

// Pizza code
const form = document.forms["pizzaMaker"];
const button = document.getElementById("create");
const output = document.getElementById("output");

// Arrays
const meats = ["Pepperoni", "Italian Sausage", "Ham", "Bacon", "Smoked Chicken", "Anchovies", "Meatballs"];
const veggies = ["Green Peppers", "Onions", "Tomatoes", "Spinach", "Green Olives", "Black Olives", "Mushrooms", "Garlic", "Banana Peppers", "Jalapenos", "Broccoli", "Basil", "Calobrian Peppers", "Pineapple", "Cherry Peppers", "Kalamata Olives", "Artichoke Hearts", "Roasted Red Peppers"];
const cheeses = ["Feta", "Extra Mozzarella", "Dal"];

// When the button is clicked, pick 3 random toppings and show them to the user
button.addEventListener("click", automaticPizza);

function automaticPizza(e) {
  e.preventDefault();
  // Create empty array to hold random toppings in
  let randToppings = [];
  // Get value for amount of toppings
  // If value is IDGAF, generate a random number between 1 and 7
  let numToppings = form.numToppings.value;
  console.log(numToppings);
  if (numToppings === "IDGAF") {
    numToppings = Math.floor((Math.random() * 7) + 1);
  } else {
    numToppings = Number(numToppings);
  }
  
  // Check if meats only or veggies only is checked
  const dietRestrict = document.forms["pizzaMaker"].options.value;
  
  for (let i = 0; i < numToppings; i++) {
    if (dietRestrict === "veggies") {
      let veggie = randomVeggie();
      // If already in the array, pick another veggie
      while (randToppings.includes(veggie)) {
        veggie = randomVeggie();
      }
      // Once veggie is unique, push to array
      randToppings.push(veggie);
    } else if (dietRestrict === "meats") {
        let meat = randomMeat();
      // If already in the array, pick another meat
      while (randToppings.includes(meat)) {
        meat = randomMeat();
      }
      // Once meat is unique, push to array
      randToppings.push(meat);
    } else {
      let rando = Math.floor(Math.random() * 100 + 1);
      if (rando % 2 === 0) {
        let randMeat = randomMeat();
        while (randToppings.includes(randMeat)) {
          randMeat = randomMeat();
        }
        randToppings.push(randMeat);
      } else {
        let randVeggie = randomVeggie();
        while (randToppings.includes(randVeggie)) {
          randVeggie = randomVeggie();
        }
        randToppings.push(randVeggie);
      }
    }
  }

  let toppingsString = "";
  let k = 0;
  for (var topping of randToppings) {
    toppingsString += `<li class="animate dl-${k}">${topping}</li>`;
    k += 1;
  }

  output.innerHTML = toppingsString;
}

function randomMeat() {
  return meats[Math.floor(Math.random() * meats.length)];
}

function randomVeggie() {
  return veggies[Math.floor(Math.random() * veggies.length)];
}