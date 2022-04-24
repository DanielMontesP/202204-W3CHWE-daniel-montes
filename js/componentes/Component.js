class Component {
  element;

  constructor(parentElement, element, clase) {
    // debugger;
    this.element = document.createElement(element);
    this.element.className = clase;

    parentElement.append(this.element);
  }
}

export default Component;
