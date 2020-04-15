import {Constants} from '../constants/constants';
import {createElement} from '../utils/utils.js';

const createFilmCardTemplate = ({name, poster, description}) => {
  const newDescription = description.length < Constants.DESCRIPTION_LENGTH ? description : `${description.slice(0, 163)} ...`;
  return `<article class="film-card">
    <h3 class="film-card__title">${name}</h3>
    <p class="film-card__rating">6.3</p>
    <p class="film-card__info">
      <span class="film-card__year">1936</span>
      <span class="film-card__duration">16m</span>
      <span class="film-card__genre">Cartoon</span>
    </p>
    <img src="./${poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${newDescription}</p>
    <a class="film-card__comments">0 comments</a>
    <form class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist film-card__controls-item--active">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched film-card__controls-item--active">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite film-card__controls-item--active">Mark as favorite</button>
    </form>
  </article>`;
};

export default class FilmCard {
  constructor(card) {
    this._card = card;
    this._element = null;
  }


  getTemplate() {
    return createFilmCardTemplate(this._card);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
