import Range from './components/range';
import Filter from './components/filter';
import Sort from './components/sort';
import FilmList from './components/film-list';
// import TopRated from './components/top-rated';
// import MostCommented from './components/most-commented';
import ShowMoreButton from './components/show-more-button';
import {createFilmCards} from './mock/mock';
import FilmCard from './components/film-card';
import FilmInfo from './components/popup-card';
import {render} from './utils/utils';
import {ShowingFilmsNumber} from './constants/constants';

const FilmCardElementsShowPopup = {
  poster: `film-card__poster`,
  filmName: `film-card__title`,
  comments: `film-card__comments`
};

const filmCardValues = Object.values(FilmCardElementsShowPopup);

const filmList = createFilmCards();

const DOM = {
  userRange: document.querySelector(`.header`),
  mainContainer: document.querySelector(`.main`)
};

const renderFilmCard = (filmListElement, film) => {
  const closePopup = () => {
    if (filmListElement.contains(filmInfoComponent.getElement())) {
      filmListElement.removeChild(filmInfoComponent.getElement());
    } else {
      return;
    }
  };

  const onOpenPopup = (evt) => {
    const isPopupElement = filmCardValues.some((it) => it === evt.target.className);
    if (isPopupElement) {
      filmListElement.appendChild(filmInfoComponent.getElement(), filmCardComponent.getElement());
      document.addEventListener(`keydown`, onEscKeyDown);
    }
  };

  const onClosePopup = (evt) => {
    evt.preventDefault();
    closePopup();
    document.removeEventListener(`keydown`, onEscKeyDown);
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      closePopup();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const filmInfoComponent = new FilmInfo(film);
  const closeButton = filmInfoComponent.getElement().querySelector(`.film-details__close-btn`);
  closeButton.addEventListener(`click`, onClosePopup);
  document.addEventListener(`keydown`, onClosePopup);

  const filmCardComponent = new FilmCard(film);
  const openPopupElement = filmCardComponent.getElement();
  openPopupElement.addEventListener(`click`, onOpenPopup);

  render(filmListElement, filmCardComponent.getElement());
};

const renderMain = (mainComponent, films) => {
  render(mainComponent, new Filter().getElement());
  render(mainComponent, new Sort().getElement());
  render(mainComponent, new FilmList().getElement());

  const filmListElement = mainComponent.querySelector(`.films-list__container`);
  const filmContainer = mainComponent.querySelector(`.films-list`);

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
