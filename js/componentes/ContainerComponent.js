import Component from "./Component.js";

class ContainerComponent extends Component {
  pokemonsList;
  constructor(parentElement, pokemonsList) {
    super(parentElement, "div", "container");
    this.pokemonsList = pokemonsList;

    this.render();
  }

  render() {
    this.element.innerHTML = `<header class="main-header">
        <h1 class="main-title">Pokemons</h1>
      </header>
      <main class="main">
        <section class="pokemons">
          <h2 class="section-title">Pokemons list</h2>
          <section class="pokemons-pending">
            <h3 class="subsection-title">Pokemon</h3>
            <ul class="pokemons-list">
            </ul>
          </section>          
        </section>
      </main>`;
  }
}

export default ContainerComponent;
