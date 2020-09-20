// creating namespace object
const pokedexApp = {};

// creating .init
pokedexApp.init = function () {
  const pokeNum = pokedexApp.genRandomNum();
  pokedexApp.pokemonInfo(pokeNum);
  $(".btnRandom").on("click", function () {
    pokedexApp.buttonRandom();
  });

  // event listener for click to display clicked pokemon
};

// function using ID. ID param will be generated with genrandomnum function when called.
pokedexApp.pokemonInfo = function (id) {
  // ajax call for the general pokemon information
  $.ajax({
    url: `https://pokeapi.co/api/v2/pokemon/${id}/`,
    method: "GET",
    dataType: "json",
  }).then(function (result) {
    pokedexApp.displayInfo(result);
    pokedexApp.showSprites(result, "normal");
    // calling the function that will dispaly the evolution information
    pokedexApp.pokemonEvolutions(result.id);
    $("#spriteContainer").on("mouseenter", function () {
      pokedexApp.showSprites(result, "shiny");
    });
    $("#spriteContainer").on("mouseleave", function () {
      pokedexApp.showSprites(result, "normal");
    });
  });
};
// evoltuion info
// ajax call for the flavour text information
pokedexApp.pokemonEvolutions = function (id) {
  $.ajax({
    url: `https://pokeapi.co/api/v2/pokemon-species/${id}`,
    method: "GET",
    dataType: "json",
  }).then(function (result) {
    const evolutionUrl = result.evolution_chain.url;
    $.ajax({
      url: evolutionUrl,
      method: "GET",
      dataType: "json",
    }).then(function (result) {
      pokedexApp.showEvolutions(result);
      // event listener for user click on evolution tree, makes new ajax call and links to user choice.
      $("li").on("click", function (e) {
        e.preventDefault();
        // retrieving the attached class to the evolution list. then calling pokemonINfo and pasing clas name to get that pokemon's info.
        const className = $(this).attr("class");
        pokedexApp.pokemonInfo(className);
      });
    });
  });
};

// pokedexApp.flavorText = function(result) {
//   console.log(result)
//   result.flavor_text_entries.forEach(key => {
//     console.log(key);
//     console.log(key.language);
//     if(key.language.name === 'en') {
//       console.log(key.flavor_text);
//       const flavorText = key.flavor_text;
//       return flavorText;
//     }
//   });
// }

pokedexApp.showEvolutions = function (result) {
  // storing base evolution name, and the base link to make it easier to chain things.
  const baseEvoLink = result.chain;
  const baseEvoName = result.chain.species.name;
  $("#evolutionChain").append(
    `<li class="${baseEvoName}"> <a href="#">${baseEvoName}`
  );
  // checking for first evolution (base evolve into another pokemon)
  if (baseEvoLink.evolves_to.length > 0) {
    const firstEvoName = baseEvoLink.evolves_to[0].species.name;
    const firstEvoLink = baseEvoLink.evolves_to[0];
    $("#evolutionChain").append(
      `<li class="${firstEvoName}"> <a href="#">${firstEvoName}`
    );
    // checking for second evolution
    if (firstEvoLink.evolves_to.length > 0) {
      const secondEvoName = firstEvoLink.evolves_to[0].species.name;
      $("#evolutionChain").append(
        `<li class="${secondEvoName}"> <a href="#"> ${secondEvoName}`
      );
    }
  }
};

// Append function

pokedexApp.displayInfo = function (poke) {
  this.clearInfo();
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
};

// clears the information out of the UL
pokedexApp.clearInfo = function () {
  $("ul").empty();
  $("ol").empty();
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
  $(".sprites").empty();
  const frontSprite = $("<img>");
  const backSprite = $("<img>");
  // storing the sprite values
  const frontDefault = poke.sprites.front_default;
  const backDefault = poke.sprites.back_default;
  const frontShiny = poke.sprites.front_shiny;
  const backShiny = poke.sprites.back_shiny;
  if (choice === "normal") {
    $(frontSprite).attr("src", frontDefault);
    $(backSprite).attr("src", backDefault);
  } else {
    $(frontSprite).attr("src", frontShiny);
    $(backSprite).attr("src", backShiny);
  }
  $("#frontSprite").append(frontSprite);
  $("#backSprite").append(backSprite);
};

// Button randomizer
pokedexApp.buttonRandom = function () {
  const ranNum = pokedexApp.genRandomNum();
  pokedexApp.pokemonInfo(ranNum);
};

// TODO random num function from 1-151
pokedexApp.genRandomNum = function () {
  return Math.floor(Math.random() * 151) + 1;
};

$(document).ready(function () {
  pokedexApp.init();
});
