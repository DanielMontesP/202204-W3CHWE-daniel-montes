import Component from "./Component.js";

class CardComponent extends Component {
  id;
  name;
  url;

  constructor(parentElement, id, name, url) {
    super(parentElement, "li", `poke poke--${id}`);

    this.id = id;
    this.name = name;
    this.url = url;

    this.render();
  }

  render() {
    this.element.innerHTML = ` <img class="update_img_${this.id}"
                  src=${this.url}
                  alt="${this.name} poster"
                />
                <h4 class="update__name_${this.id}">${this.name}</h4>
                <h4 class="update__candy_title_${this.id}">${this.name}</h4>`;
  }
}

export default CardComponent;
