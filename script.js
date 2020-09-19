// creating namespace object
const pokedexApp = {};

// creating .init
pokedexApp.init = function () {
  const pokeNum = pokedexApp.genRandomNum();
  pokedexApp.pokemonChoice(pokeNum);
  $(".btnRandom").on("click", function () {
    pokedexApp.buttonRandom();
  });
};

// function using ID. ID param will be generated with genrandomnum function when called.
pokedexApp.pokemonChoice = function (id) {
  $.ajax({
    url: `https://pokeapi.co/api/v2/pokemon/${id}/`,
    method: "GET",
    dataType: "json",
  }).then(function (result) {
    pokedexApp.displayInfo(result);
    $("#spriteContainer").on("mouseenter", function () {
      pokedexApp.showSprites(result, 'shiny');
    });
    $("#spriteContainer").on("mouseleave", function () {
      pokedexApp.showSprites(result, 'normal');
    });
  });
};

// Append function

pokedexApp.displayInfo = function (poke) {
  // Name and ID
  $("#pokemonName").text(poke.name);
  $("#pokemonID").text(`#${poke.id}`);
  // calling type function.
  this.checkTypes(poke);
  // Ability
  const ability1 = poke.abilities[0].ability.name;
  $("#pokeAbility").text(ability1);
  // Height
  const heightCM = poke.height * 10;
  $("#pokeHeight").text(`${heightCM} cm`);
  // Weight
  const weightKG = poke.weight * 0.1;
  $("#pokeWeight").text(`${weightKG} kg`);
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
  this.showSprites(poke, 'normal');
};

// clears the information out of the UL
pokedexApp.clearInfo = function () {
  $("ul").empty();
};

// runs a for each loop, as there will be more than one object if pokemon has more than one type. adds to the ul with the type information.
pokedexApp.checkTypes = function (pokeNum) {
  pokeNum.types.forEach((element) => {
    const listItem = $("<li>");
    listItem.text(element.type.name);
    $("#pokemonType").append(listItem);
  });
};

// displays the sprites. has various valued stored, including the shiny sprites. parameters are the pokenunmber and the choice, where normal or shiny will be passed in. 
pokedexApp.showSprites = function (poke, choice) {
  $('.sprites').empty();
  const frontSprite = $("<img>");
  const backSprite = $("<img>");
  // storing the sprite values 
  const frontDefault = poke.sprites.front_default;
  const backDefault = poke.sprites.back_default;
  const frontShiny = poke.sprites.front_shiny;
  const backShiny = poke.sprites.back_shiny;
  if(choice === 'normal') {
    $(frontSprite).attr("src", frontDefault);
    $(backSprite).attr("src", backDefault);
  } else {
    $(frontSprite).attr('src', frontShiny);
    $(backSprite).attr('src', backShiny);
  }
  $("#frontSprite").append(frontSprite);
  $("#backSprite").append(backSprite);
};

// Button randomizer
pokedexApp.buttonRandom = function () {
  this.clearInfo();
  const ranNum = pokedexApp.genRandomNum();
  pokedexApp.pokemonChoice(ranNum);
};

// TODO random num function from 1-151
pokedexApp.genRandomNum = function () {
  return Math.floor(Math.random() * 151) + 1;
};

$(document).ready(function () {
  pokedexApp.init();
});
