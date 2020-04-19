import AbstractComponent from "./abstract-component.js";

const createButtonTemplate = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

export default class ShowMoreButton extends AbstractComponent {
  getTemplate() {
    return createButtonTemplate();
  }

  buttonClickHandler(cb) {
    this.getElement().addEventListener(`click`, cb);
  }
}
