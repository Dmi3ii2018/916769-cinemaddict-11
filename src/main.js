import {createUserRangeTemplate} from './components/range';
import {createFilterTemplate} from './components/filter';
import {createStatTemplate} from './components/stats';
import {createFilmListTemplate} from './components/film-list';
import {createTopRatedTemplate} from './components/top-rated';
import {createMostCommentedTemplate} from './components/most-commented';

const DOM = {
  userRange: document.querySelector(`.header`),
  mainContainer: document.querySelector(`.main`),
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
