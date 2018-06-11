import './modules'

var button = document.getElementById("create");
var output = document.getElementById("output");
var toppingsSelect = document.getElementById("toppingsNumber");
var appendString = "";

for (var i = 1; i <= 7; i++) {
  appendString += "<option value='"+i+"'>"+i+"</option>";
}

toppingsSelect.innerHTML += appendString;

var meats = ["Pepperoni", "Italian Sausage", "Ham", "Bacon", "Smoked Chicken", "Anchovies", "Meatballs"];
var veggies = ["Green Peppers", "Onions", "Tomatoes", "Spinach", "Green Olives", "Black Olives", "Mushrooms", "Garlic", "Banana Peppers", "Jalapenos", "Broccoli", "Basil", "Calobrian Peppers", "Pineapple", "Cherry Peppers", "Kalamata Olives", "Artichoke Hearts", "Roasted Red Peppers"];
var cheeses = ["Feta", "Extra Mozzarella", "Dal"];


// When the button is clicked, pick 3 random toppings and show them to the user
button.addEventListener("click", automaticPizza);

function automaticPizza(e) {
  e.preventDefault();
  // Create empty array to hold random toppings in
  var randToppings = [];
  // Get value for amount of toppings
  // If value is IDGAF, generate a random number between 1 and 7
  var numToppings = toppingsSelect.value;
  if (numToppings === "IDGAF") {
    numToppings = Math.floor((Math.random() * 7) + 1);
  } else {
    numToppings = Number(numToppings);
  }
  
  // Check if meats only or veggies only is checked
  var dietRestrict = document.forms["pizzaMaker"].options.value;
  
  for (var i = 0; i < numToppings; i++) {
    if (dietRestrict === "veggies") {
      var veggie = randomVeggie();
      // If already in the array, pick another veggie
      while (randToppings.includes(veggie)) {
        veggie = randomVeggie();
      }
      // Once veggie is unique, push to array
      randToppings.push(veggie);
    } else if (dietRestrict === "meats") {
      var meat = randomMeat();
      // If already in the array, pick another meat
      while (randToppings.includes(meat)) {
        meat = randomMeat();
      }
      // Once meat is unique, push to array
      randToppings.push(meat);
    } else {
      var rando = Math.floor(Math.random() * 100 + 1);
      if (rando % 2 === 0) {
        var randMeat = randomMeat();
        while (randToppings.includes(randMeat)) {
          randMeat = randomMeat();
        }
        randToppings.push(randMeat);
      } else {
        var randVeggie = randomVeggie();
        while (randToppings.includes(randVeggie)) {
          randVeggie = randomVeggie();
        }
        randToppings.push(randVeggie);
      }
    }
  }

  var toppingsString = "";
  for (var k = 0; k < randToppings.length; k++) {
    toppingsString += `<li>${randToppings[k]}</li>`;
  }
  output.innerHTML = toppingsString;
}

function randomMeat() {
  return meats[Math.floor(Math.random() * meats.length)];
}

function randomVeggie() {
  return veggies[Math.floor(Math.random() * veggies.length)];
}
