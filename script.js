
// creating namespace object
const pokedexApp = {};

// creating .init 
pokedexApp.init = function() {

  // function using ID. ID param will be generated with genrandomnum function when called. 
  const pokemonChoice = function(id) {
    $.ajax({
      url: `https://pokeapi.co/api/v2/pokemon/${id}/`,
      method: "GET",
      dataType: "json",
    }).then(function (result) {
      displayInfo(result);
    });
  }
  pokemonChoice(genRandomNum())

}

// Append function

pokedexApp.displayInfo = function(poke){
  // Name and ID
  $("#pokemonName").text(poke.name);
  $('#pokemonID').text(poke.id);
  // Ability
  const ability1 = poke.abilities[0].ability.name;
  $("#pokeAbility").text(ability1);
  // Height
  $("#pokeHeight").text(poke.height);
  // Weight
  $("#pokeWeight").text(poke.weight);
  // Photo (main image)
  const mainImage = poke.sprites.other['official-artwork'].front_default;
  $("#pokemonMainImage").attr("src", mainImage);
  // Moves
  const move1 = poke.moves[0].move.name;
  $("#pokeMoves").append(`<li>${move1}</li>`)
  const move2 = poke.moves[1].move.name;
  $("#pokeMoves").append(`<li>${move2}</li>`);
  // Show sprites
  pokemonApp.showSprites(poke);
}

// Function to display sprites

pokemonApp.showSprites = function(poke){
  $(".frontSprite").html("hi")
}




// TODO random num function from 1-151
const genRandomNum = function() {
  return Math.floor(Math.random() * 151) + 1;  
}

$(document).ready(function() {  
  pokedexApp.init();
})

