import AbstractComponent from "./abstract-component.js";
import {createElement} from '../utils/render';
import {SortType} from '../constants/constants';
import {boardController} from '../main';

export const createStatTemplate = (sortType) => {
  return (
    `<ul class="sort">
      <li><a href="#" data-sort-type=${SortType.DEFAULT} class="sort__button ${SortType.DEFAULT === sortType ? `sort__button--active` : ``}">Sort by default</a></li>
      <li><a href="#" data-sort-type=${SortType.BY_DATE} class="sort__button ${SortType.BY_DATE === sortType ? `sort__button--active` : ``}">Sort by date</a></li>
      <li><a href="#" data-sort-type=${SortType.BY_RATING} class="sort__button ${SortType.BY_RATING === sortType ? `sort__button--active` : ``}">Sort by rating</a></li>
    </ul>`
  );
};

export default class Sort extends AbstractComponent {
  constructor() {
    super();
    this._currentSortType = SortType.DEFAULT;
  }

  getTemplate() {
    return createStatTemplate(this._currentSortType);
  }

  getSortType() {
    return this._currentSortType;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
      this.setSortListener();
    }
    return this._element;
  }

  setSortListener() {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const sortType = evt.target.dataset.sortType;

      if (this._currentSortType === sortType) {
        return;
      } else {
        this._currentSortType = sortType;
        this._element = null;
        // this._element = this.getElement();
        boardController.setFilmsSort.call(boardController, sortType);

      }
    });
  }
}
