export default class Section {
  constructor({renderer}, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(items, userId) {
    items.forEach( (item) => {
      this._container.append(this._renderer(item, userId));
    })
  }

  renderItem(item, userId) {
    this._container.prepend(this._renderer(item, userId));
  }
}
