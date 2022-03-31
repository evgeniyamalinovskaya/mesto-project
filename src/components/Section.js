//Отвечает за отрисовку элементов на странице
export default class Section{
    constructor({ items, renderer }, selector) {
        this._renderedItems = items;
        this._renderer = renderer;
        
        this._container = document.querySelector(selector);
      }
      //Функция, которая отвечает за создание и отрисовку данных на странице
      renderItems() {
        this._renderedItems.forEach(item => {this._renderer(item)})
      }
      //Функция, которая принимает DOM - элемент и добавляет его в контейнер
      appendItem(element) {
        this._container.append(element);
      }
      prependItem(element) {
        this._container.prepend(element);
      }
}