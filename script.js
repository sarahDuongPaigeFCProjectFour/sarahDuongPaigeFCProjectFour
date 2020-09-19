// creating namespace object
const pokedexApp = {};

// creating .init
pokedexApp.init = function () {
  const pokeNum = pokedexApp.genRandomNum();

  pokedexApp.pokemonChoice(pokeNum);

  // 
  
};

// function using ID. ID param will be generated with genrandomnum function when called.
pokedexApp.pokemonChoice = function (id) {
  $.ajax({
    url: `https://pokeapi.co/api/v2/pokemon/${id}/`,
    method: "GET",
    dataType: "json",
  }).then(function (result) {
    pokedexApp.displayInfo(result);
    $("#spriteContainer").on('mouseenter', function() {
      pokedexApp.shinySprites(result);
    });
    $('#spriteContainer').on('mouseleave', function(){
      $('.sprites').empty();
      pokedexApp.showSprites(result);
    })
  });
};

// Append function

pokedexApp.displayInfo = function (poke) {
  // Name and ID
  $("#pokemonName").text(poke.name);
  $("#pokemonID").text(poke.id);
  // Ability
  const ability1 = poke.abilities[0].ability.name;
  $("#pokeAbility").text(ability1);
  // Height
  $("#pokeHeight").text(poke.height);
  // Weight
  $("#pokeWeight").text(poke.weight);
  // Photo (main image)
  const mainImage = poke.sprites.other["official-artwork"].front_default;
  // changed the src attr to point to the retrieved mainImage
  $("#pokemonMainImage").attr("src", mainImage);
  // Moves
  const move1 = poke.moves[0].move.name;
  $("#pokeMoves").append(`<li>${move1}</li>`);
  const move2 = poke.moves[1].move.name;
  $("#pokeMoves").append(`<li>${move2}</li>`);
  // Show sprites
  pokedexApp.showSprites(poke);
};

// Function to display sprites
pokedexApp.showSprites = function (poke) {
  // 
  const frontSprite = $('<img>');
  $(frontSprite).attr('src', poke.sprites.front_default);
  $('#frontSprite').append(frontSprite)
  
  // repeat the above for the backSprite
  const backSprite = $('<img>');
  $(backSprite).attr('src', poke.sprites.back_default);
  $('#backSprite').append(backSprite);
};

// Function to show shinies (activated on mouseenter)
pokedexApp.shinySprites = function(poke) {
  console.log('hi');
  $('#frontSprite img').attr('src', poke.sprites.front_shiny);
  $('#backSprite img').attr('src', poke.sprites.back_shiny)
}


// TODO random num function from 1-151
pokedexApp.genRandomNum = function () {
  return Math.floor(Math.random() * 151) + 1;
};

$(document).ready(function () {
  pokedexApp.init();
});
