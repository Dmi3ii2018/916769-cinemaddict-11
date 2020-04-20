import FilmList from '../components/film-list';
import Filter from '../components/filter';
import Sort from '../components/sort';
// import TopRated from './components/top-rated';
// import MostCommented from './components/most-commented';
import ShowMoreButton from '../components/show-more-button';
import FilmCard from '../components/film-card';
import FilmInfo from '../components/film-info';
import NoFilms from '../components/no-films';
import {render, remove, addElement} from '../utils/render';
import {FilmCardElementsShowPopup, ShowingFilmsNumber, SortType, RenderPosition} from '../constants/constants';

const filmCardValues = Object.values(FilmCardElementsShowPopup);

const renderFilmCard = (filmListElement, film) => {
  const closePopup = () => {
    if (filmListElement.contains(filmInfoComponent.getElement())) {
      remove(filmInfoComponent);
    } else {
      return;
    }
  };

  const onOpenPopup = (evt) => {
    event.stopPropagation();
    const anotherOpenPopup = document.querySelector(`.film-details`);
    if (anotherOpenPopup) {
      filmListElement.removeChild(anotherOpenPopup);
    }
    const isPopupElement = filmCardValues.some((it) => it === evt.target.className);
    if (isPopupElement) {
      addElement(filmListElement, filmInfoComponent);
      document.addEventListener(`keydown`, onEscKeyDown);
      document.addEventListener(`click`, onOutBorderClick);
      filmInfoComponent.setCloseButtonHandler(onClosePopup);
    }
  };

  const onClosePopup = (evt) => {
    evt.preventDefault();
    closePopup();
    document.removeEventListener(`keydown`, onEscKeyDown);
    document.removeEventListener(`keydown`, onEscKeyDown);
    filmInfoComponent.removeCloseButtonListener(onClosePopup);

  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      closePopup();
      document.removeEventListener(`keydown`, onEscKeyDown);
      document.removeEventListener(`click`, onOutBorderClick);
      filmInfoComponent.removeCloseButtonListener(onClosePopup);
    }
  };

  const onOutBorderClick = (evt) => {
    const isOutClick = evt.path.some((element) => element.className === `film-details`);
    if (!isOutClick) {
      evt.preventDefault();
      evt.stopPropagation();
      closePopup();
      document.removeEventListener(`click`, onOutBorderClick);
      document.removeEventListener(`keydown`, onEscKeyDown);
      filmInfoComponent.removeCloseButtonListener(onClosePopup);
    } else {
      return;
    }
  };

  const filmInfoComponent = new FilmInfo(film);
  filmInfoComponent.setCloseButtonHandler(onClosePopup);

  const filmCardComponent = new FilmCard(film);
  filmCardComponent.setOpenPopupHandler(onOpenPopup);

  render(filmListElement, filmCardComponent);
};

const renderFilms = (filmListElement, tasks) => {
  tasks.forEach((task) => {
    renderFilmCard(filmListElement, task);
  });
};

const getSortedFilms = (films, sortType, from, to) => {
  let sortedFilms = [];
  const showingFilms = films.slice();

  switch (sortType) {
    case SortType.BY_DATE:
      sortedFilms = showingFilms.sort((a, b) => a.dueDate - b.dueDate);
      break;
    case SortType.BY_RATING:
      sortedFilms = showingFilms.sort((a, b) => b.dueDate - a.dueDate); // TODO: change by rating
      break;
    case SortType.DEFAULT:
      sortedFilms = showingFilms;
      break;
  }

  return sortedFilms.slice(from, to);
};

export default class BoardController {
  constructor(container) {
    this._container = container;

    this._sortComponent = new Sort(SortType.DEFAULT);
    this._filter = new Filter();
    this._noFilmsComponent = new NoFilms();
    this._showMoreButton = new ShowMoreButton();
    this._filmList = new FilmList();
    this.renderLoadMoreButton = null;
  }

  render(films) {
    this.films = films;
    this.showingFilmsCount = ShowingFilmsNumber.BY_START;
    const container = this._container;

    render(container, this._filter);
    render(container, this._sortComponent);
    render(container, new FilmList());

    this.filmListContainer = container.querySelector(`.films-list__container`);
    const filmList = container.querySelector(`.films-list`);
    this.filmContainer = container.querySelector(`.films`);

    this.renderLoadMoreButton = () => {
      if (this.showingFilmsCount >= films.length) {
        return;
      }
      render(filmList, this._showMoreButton);

      this._showMoreButton.buttonClickHandler(() => {
        const prevFilmsCount = this.showingFilmsCount;
        this.showingFilmsCount = this.showingFilmsCount + ShowingFilmsNumber.BY_BUTTON;

        const sortedFilms = getSortedFilms(films, this._sortComponent.getSortType(), prevFilmsCount, this.showingFilmsCount);

        renderFilms(this.filmListContainer, sortedFilms);

        if (this.showingFilmsCount >= films.length) {
          remove(this._showMoreButton);
        }
      });
    };

    this.renderLoadMoreButton();

    if (!films.length) {
      render(this.filmListContainer, this._noFilmsComponent);
      return;
    }

    renderFilms(this.filmListContainer, films.slice(0, this.showingFilmsCount));

    this._sortComponent.setSortListener();
  }

  setFilmsSort(sortType) {
    this.showingFilmsCount = ShowingFilmsNumber.BY_BUTTON;

    const sortedFilms = getSortedFilms(this.films, sortType, 0, this.showingFilmsCount);

    this.filmListContainer.innerHTML = ``;
    remove(this._sortComponent);
    this._container.removeChild(this._sortComponent.getElement());
    render(this.filmContainer, this._sortComponent, RenderPosition.BEFORE);

    renderFilms(this.filmListContainer, sortedFilms);

    this.renderLoadMoreButton();
  }
}
