import Component from "./Component.js";

let counter = 0;
class CardContainerComponent extends Component {
  id;
  name;

  constructor(name) {
    counter += 1;

    const parentElement = document.querySelector(".container");

    super(parentElement, "div", `card-poke--${counter}`);

    this.id = counter;
    this.name = name;

    this.render();
  }

  render() {
    this.element.innerHTML = ` <ul class="list-${this.id}"></ul>`;
  }
}

export default CardContainerComponent;
