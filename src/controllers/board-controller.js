import FilmList from '../components/film-list';
import Filter from '../components/filter';
import Sort from '../components/sort';
// import TopRated from './components/top-rated';
// import MostCommented from './components/most-commented';
import ShowMoreButton from '../components/show-more-button';
import FilmCard from '../components/film-card';
import FilmInfo from '../components/film-info';
import NoFilms from '../components/no-films';
import { render, remove, addElement } from '../utils/render';
import { FilmCardElementsShowPopup, ShowingFilmsNumber } from '../constants/constants';

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

export default class BoardController {
  constructor(container) {
    this._container = container;

    this._sort = new Sort();
    this._filter = new Filter();
    this._noFilmsComponent = new NoFilms();
    this._showMoreButton = new ShowMoreButton();
    this._filmList = new FilmList();
  }

  render(films) {
    const container = this._container;

    render(container, this._filter);
    render(container, this._sort);
    render(container, new FilmList());

    const filmListContainer = container.querySelector(`.films-list__container`);
    const filmContainer = container.querySelector(`.films-list`);

    if (!films.length) {
      render(filmContainer, this._noFilmsComponent);
      return;
    }

    let showingFilmsCount = ShowingFilmsNumber.BY_START;
    films.slice(0, showingFilmsCount)
      .forEach((film) => {
        renderFilmCard(filmListContainer, film);
      });

    render(filmContainer, this._showMoreButton);

    this._showMoreButton.buttonClickHandler(() => {
      const prevTasksCount = showingFilmsCount;
      showingFilmsCount = showingFilmsCount + ShowingFilmsNumber.BY_BUTTON;

      films.slice(prevTasksCount, showingFilmsCount)
        .forEach((task) => renderFilmCard(filmListContainer, task));

      if (showingFilmsCount >= films.length) {
        this._showMoreButton.getElement().remove();
        this._showMoreButton.removeElement();
      }
    });
  }
}
