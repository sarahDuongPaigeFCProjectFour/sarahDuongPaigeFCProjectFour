
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

      // testing if name appends
      $("#pokemonName").text(result.name);
      $('#pokemonID').text(result.id);
    });
  }
  pokemonChoice(genRandomNum())
}

// function that will append all text based info

// TODO function that will append sprite for main image


// TODO random num function from 1-151
const genRandomNum = function() {
  return Math.floor(Math.random() * 151) + 1;  
}

$(document).ready(function() {  
  pokedexApp.init();
})

