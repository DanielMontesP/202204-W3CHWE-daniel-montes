import AComponent from "./componentes/AComponent.js";

function createTypes(types, ul) {
  types.forEach((type) => {
    const typeLi = document.createElement("li");

    typeLi.innerText = type.type.name;
    ul.append(typeLi);
  });
}
function createAbilities(types, ul) {
  types.forEach((type) => {
    const typeLi = document.createElement("li");

    typeLi.innerText = type.ability.name;
    ul.append(typeLi);
  });
}
function createPokeImage(pokeID, containerDiv, url) {
  const pokeImgContainer = document.createElement("div");
  pokeImgContainer.classList.add("image");
  const pokeImage = document.createElement("img");
  pokeImage.srcset = url;
  pokeImgContainer.append(pokeImage);
  containerDiv.append(pokeImgContainer);
}

function renderPokemon(pokeData) {
  const allPokemonContainer = document.getElementById("poke-container");
  const pokeContainer = document.createElement("div"); // div will be used to hold the data/details for indiviual pokemon.{}
  pokeContainer.classList.add("cardPoke");
  const url = pokeData.sprites.front_default;

  createPokeImage(pokeData.id, pokeContainer, url);

  const pokeName = document.createElement("h4");
  pokeName.innerText = pokeData.name;

  const pokeNumber = document.createElement("p");
  pokeNumber.innerText = `#${pokeData.id}`;

  const pokeTypes = document.createElement("ul");
  const pokeAbilities = document.createElement("ul");

  createTypes(pokeData.types, pokeTypes); // helper function to go through the types array and create li tags for each one

  createAbilities(pokeData.abilities, pokeAbilities);
  pokeContainer.append(pokeName, pokeNumber, pokeTypes, pokeAbilities); // appending all details to the pokeContainer div
  allPokemonContainer.appendChild(pokeContainer); // appending that pokeContainer div to the main div which will                                                             hold all the pokemon cards
}

function fetchPokemonData(pokemon) {
  const { url } = pokemon; // <--- this is saving the pokemon url to a variable to use in the fetch.
  // Example: https://pokeapi.co/api/v2/pokemon/1/"
  fetch(url)
    .then((response) => response.json())
    .then((pokeData) => {
      renderPokemon(pokeData);
    });
}
function renderEverything(url) {
  const allPokemonContainer = document.querySelector("#poke-container");
  allPokemonContainer.innerText = "";
  fetchKantoPokemon(url);
}

function fetchKantoPokemon(url) {
  let urlToProcess = "";
  if (url === "") {
    urlToProcess = "https://pokeapi.co/api/v2/pokemon?limit=1000&offset=10";
  } else {
    urlToProcess = url;
  }

  fetch(urlToProcess)
    .then((response) => response.json())
    .then((allpokemon) => {
      const container = document.querySelector("#poke-container");
      const newDivContainer = document.createElement("div");
      newDivContainer.className = "nav";
      const newH3 = document.createElement("h3");

      const newPrevBt = document.createElement("a");

      const newPrevBtSpan = document.createElement("span");
      newPrevBtSpan.className = "wwwPrev";
      newPrevBtSpan.innerHTML = allpokemon.previous;
      newPrevBt.href = "";
      newPrevBt.className = "btPrev";
      newPrevBt.innerText = `Anterior`;
      const newNextBt = document.createElement("a");
      const newNextBtSpan = document.createElement("span");
      newNextBtSpan.className = "wwwNext";
      newNextBtSpan.innerHTML = allpokemon.next;
      newNextBt.href = "";
      newNextBt.className = "btNext";
      newNextBt.innerText = `Siguiente`;
      newH3.innerText = `Total: ${allpokemon.count}`;
      container.append(newDivContainer);
      newDivContainer.append(
        newPrevBt,
        newH3,
        newNextBt,
        newPrevBtSpan,
        newNextBtSpan
      );
      newPrevBt.addEventListener("click", () => {
        renderEverything(document.querySelector(".wwwPrev").innerHTML);
      });
      newNextBt.addEventListener("click", () => {
        renderEverything(document.querySelector(".wwwNext").innerHTML);
      });
      allpokemon.results.forEach((pokemon) => {
        fetchPokemonData(pokemon);
      });
    });
}

function deleteEverything(event) {
  const eventToDel = event;
  eventToDel.target.style = "none";
  const allPokemonContainer = document.querySelector("#poke-container");
  allPokemonContainer.innerText = "";

  const generateBtn = document.createElement("button");
  generateBtn.innerText = "Generate Pokemon";
  generateBtn.id = "generate-pokemon";
  generateBtn.classList.add("ui", "secondary", "button");
  // generateBtn.addEventListener("click", renderEverything);

  allPokemonContainer.append(generateBtn);
}

renderEverything("");
