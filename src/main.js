import {createUserRangeTemplate} from './components/range';
import {createFilterTemplate} from './components/filter';
import {createStatTemplate} from './components/stats';
import {createFilmListTemplate} from './components/film-list';
import {createTopRatedTemplate} from './components/top-rated';
import {createMostCommentedTemplate} from './components/most-commented';
import {createFilmCards} from './mock/mock';
import {createFilmCardTemplate} from './components/film-card';

let SHOWING_CARD_COUNT = 5;
const SHOWING_FILM_CARDS_BY_BUTTON = 5;

const tasks = createFilmCards();

const DOM = {
  userRange: document.querySelector(`.header`),
  mainContainer: document.querySelector(`.main`)
};

const render = (container, node, place = `beforeend`) => {
  container.insertAdjacentHTML(place, node);
};

render(DOM.userRange, createUserRangeTemplate());
render(DOM.mainContainer, createFilterTemplate());
render(DOM.mainContainer, createStatTemplate());
render(DOM.mainContainer, createFilmListTemplate());
render(DOM.mainContainer, createTopRatedTemplate());
render(DOM.mainContainer, createMostCommentedTemplate());

DOM.filmListContainer = document.querySelector(`.films-list__container`);

tasks.slice(0, SHOWING_CARD_COUNT)
  .forEach((card) => render(DOM.filmListContainer, createFilmCardTemplate(card)));

const showMoreButton = DOM.mainContainer.querySelector(`.films-list__show-more`);
let showingFilmsCount = SHOWING_CARD_COUNT;

showMoreButton.addEventListener(`click`, (evt) => {
  evt.preventDefault();

  const prevTasksCount = showingFilmsCount;
  showingFilmsCount = showingFilmsCount + SHOWING_FILM_CARDS_BY_BUTTON;

  tasks.slice(prevTasksCount, showingFilmsCount)
    .forEach((card) => render(DOM.filmListContainer, createFilmCardTemplate(card)));
  SHOWING_CARD_COUNT += SHOWING_FILM_CARDS_BY_BUTTON;

  if (showingFilmsCount >= tasks.length) {
    showMoreButton.remove();
  }
});
