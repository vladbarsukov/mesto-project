export default class Section {
  constructor({renderer}, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  setNewItem(element) {
    this._container.prepend(element);
  }

  setItem(element) {
    this._container.append(element);
  }

  renderItems(items) {
    items.forEach( item => {
      this._renderer(item);
    })
  }

  renderItem(item) {
    this._renderer(item);
  }
}
