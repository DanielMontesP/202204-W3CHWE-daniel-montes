import Component from "./Component.js";

class AComponent extends Component {
  parentElement;
  tagClass;
  constructor(parentElement, tagClass) {
    // const parentElement = document.querySelector(".container");

    super(parentElement, "a", tagClass);

    this.class = tagClass;
    this.render();
  }

  render() {
    this.element.innerHTML = ` <a href class="${this.class}"></a>`;
  }
}

export default AComponent;
