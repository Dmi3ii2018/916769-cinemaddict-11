import Range from './components/range';
import Filter from './components/filter';
import Sort from './components/sort';
import FilmList from './components/film-list';
// import TopRated from './components/top-rated';
// import MostCommented from './components/most-commented';
import ShowMoreButton from './components/show-more-button';
import {createFilmCards} from './mock/mock';
import FilmCard from './components/film-card';
import FilmInfo from './components/film-info';
import NoFilms from './components/no-films';
import {render} from './utils/utils';
import {FilmCardElementsShowPopup, ShowingFilmsNumber, DOM} from './constants/constants';

const filmCardValues = Object.values(FilmCardElementsShowPopup);

const filmList = createFilmCards();

const renderFilmCard = (filmListElement, film) => {
  const closePopup = () => {
    if (filmListElement.contains(filmInfoComponent.getElement())) {
      filmListElement.removeChild(filmInfoComponent.getElement());
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
      filmListElement.appendChild(filmInfoComponent.getElement(), filmCardComponent.getElement());
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

  render(filmListElement, filmCardComponent.getElement());
};

const renderMain = (mainComponent, films) => {
  render(mainComponent, new Filter().getElement());
  render(mainComponent, new Sort().getElement());
  render(mainComponent, new FilmList().getElement());

  const filmListElement = mainComponent.querySelector(`.films-list__container`);
  const filmContainer = mainComponent.querySelector(`.films-list`);

  if (!films.length) {
    render(filmContainer, new NoFilms().getElement());
    return;
  }

  let showingFilmsCount = ShowingFilmsNumber.BY_START;
  films.slice(0, showingFilmsCount)
    .forEach((film) => {
      renderFilmCard(filmListElement, film);
    });

  const loadMoreButtonComponent = new ShowMoreButton();
  render(filmContainer, loadMoreButtonComponent.getElement());

  loadMoreButtonComponent.getElement().addEventListener(`click`, () => {
    const prevTasksCount = showingFilmsCount;
    showingFilmsCount = showingFilmsCount + ShowingFilmsNumber.BY_BUTTON;

    films.slice(prevTasksCount, showingFilmsCount)
      .forEach((task) => renderFilmCard(filmListElement, task));

    if (showingFilmsCount >= films.length) {
      loadMoreButtonComponent.getElement().remove();
      loadMoreButtonComponent.removeElement();
    }
  });
};

render(DOM.userRange, new Range().getElement());
renderMain(DOM.mainContainer, filmList);
