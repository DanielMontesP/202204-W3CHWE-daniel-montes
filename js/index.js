let newPrevBt = "";
let newNextBt = "";
let isFirstRun = true;
let urlToProcess = "";
let isViewTodos = false;
// let isRendered = false;

function createTypes(types, ul) {
  types.forEach((type) => {
    const typeLi = document.createElement("li");

    typeLi.innerText = type.type.name;
    ul.append(typeLi);
  });
}

function createAbilities(types, ul, id) {
  types.forEach((type) => {
    const typeLi = document.createElement("li");
    typeLi.innerText = type.ability.name;
    ul.append(typeLi);
  });
  const typeLi = document.createElement("li");
  const action = document.createElement("a");
  action.className = `poke__details_${id}`;
  action.href = `about.html?id=${id}`;
  action.innerHTML = "Ver más...";
  // action.addEventListener("click", openPokeDetail(id));
  typeLi.append(action);
  ul.append(typeLi);
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
  const pokeContainer = document.createElement("div");
  pokeContainer.classList.add("cardPoke");
  const url = pokeData.sprites.front_default;
  createPokeImage(pokeData.id, pokeContainer, url);
  const pokeName = document.createElement("h4");
  pokeName.innerText = pokeData.name;
  const pokeNumber = document.createElement("p");
  pokeNumber.innerText = `#${pokeData.id}`;
  const pokeTypes = document.createElement("ul");
  const pokeDetailContainer = document.createElement("div");
  const pokeDetailList = document.createElement("ul");
  pokeDetailContainer.className = "cardPoke poke__overlay";
  createTypes(pokeData.types, pokeTypes);
  createAbilities(pokeData.abilities, pokeDetailList, pokeData.id);
  pokeDetailContainer.append(pokeDetailList);
  pokeContainer.append(pokeName, pokeNumber, pokeTypes, pokeDetailContainer);
  allPokemonContainer.appendChild(pokeContainer);
}

function fetchPokemonData(pokemon) {
  const { url } = pokemon;
  fetch(url)
    .then((response) => response.json())
    .then((pokeData) => {
      renderPokemon(pokeData);
    });
}

const createNav = (allpokemon) => {
  const container = document.querySelector("#poke-container");
  const newDivContainer = document.createElement("div");
  newDivContainer.className = "nav";
  const newH3 = document.createElement("h3");
  newPrevBt = document.createElement("a");
  const newPrevBtSpan = document.createElement("span");
  newPrevBtSpan.className = "wwwPrev";
  newPrevBtSpan.innerHTML = allpokemon.previous;
  newPrevBt.href = "";
  newPrevBt.className = "btPrev";
  newPrevBt.id = "btPrev";
  newPrevBt.innerText = `Anterior`;
  newNextBt = document.createElement("a");
  const newNextBtSpan = document.createElement("span");
  newNextBtSpan.className = "wwwNext";
  newNextBtSpan.innerHTML = allpokemon.next;
  newNextBt.href = "";
  newNextBt.className = "btNext";
  newNextBt.innerText = `Siguiente`;
  newH3.innerText = `Total: ${allpokemon.count}`;
  const newCheckViewAll = document.createElement("input");
  newCheckViewAll.type = "checkbox";
  newCheckViewAll.id = "view_All";
  newCheckViewAll.className = "check_ViewAll";

  container.append(newDivContainer);

  newDivContainer.append(
    newPrevBt,
    newH3,
    newNextBt,
    newPrevBtSpan,
    newNextBtSpan,
    newCheckViewAll
  );

  newCheckViewAll.addEventListener("click", () => {
    isViewTodos = true;
    renderEverything("https://pokeapi.co/api/v2/pokemon?limit=1000"); // eslint-disable-line no-use-before-define
  });
  const newLabel = document.createElement("label");
  newLabel.htmlFor = newCheckViewAll.id;
  newLabel.className = "check_ViewAll_label";
  newLabel.checked = true;
  newLabel.innerHTML = "Ver Todos";
  newDivContainer.append(newLabel);

  if (document.querySelector(".btNext")) {
    newNextBt.addEventListener("click", () => {
      const newNext = document.querySelector(".wwwNext").innerHTML;

      renderEverything(newNext); // eslint-disable-line no-use-before-define
    });
  }
  if (document.querySelector(".btPrev")) {
    newPrevBt.addEventListener("click", () => {
      const newPrev = document.querySelector(".wwwPrev").innerHTML;

      renderEverything(newPrev); // eslint-disable-line no-use-before-define
    });
  }
};

function fetchKantoPokemon(url) {
  urlToProcess = url;
  if (urlToProcess === "") {
    urlToProcess = "https://pokeapi.co/api/v2/pokemon?limit=4&offset=20";
  }

  fetch(urlToProcess)
    .then((response) => response.json())
    .then((allpokemon) => {
      // if (isFirstRun) {
      createNav(allpokemon);
      isFirstRun = false;
      // }
      allpokemon.results.forEach((pokemon) => {
        fetchPokemonData(pokemon);
      });
      if (isViewTodos) {
        document.querySelector(".check_ViewAll_label").innerHTML = "Volver";
        // debugger;
        urlToProcess = "https://pokeapi.co/api/v2/pokemon?limit=4&offset=20";
        // renderEverything(urlToProcess);

        // checkbox.removeEventListener("click", () => {
        //   isViewTodos = true;
        //   renderEverything("https://pokeapi.co/api/v2/pokemon?limit=1000"); // eslint-disable-line no-use-before-define
        // }); // eslint-disable-line no-use-before-define
        // debugger;
        // checkbox.addEventListener("click", () => {
        //   renderEverything(
        //     "https://pokeapi.co/api/v2/pokemon?limit=4&offset=20" // eslint-disable-line no-use-before-define
        //   );
        // });
      }
    });
}
function renderEverything(url) {
  const allPokemonContainer = document.querySelector("#poke-container");
  allPokemonContainer.innerText = "";

  fetchKantoPokemon(url);
}
if (isFirstRun) {
  renderEverything(urlToProcess);
}
