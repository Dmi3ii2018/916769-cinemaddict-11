import Range from './components/range';
import {createFilmCards} from './mock/mock';
import {DOM} from './constants/constants';
import {render} from './utils/render';
import BoardController from './controllers/board-controller';

const mainComponent = DOM.mainContainer;
const headerContainer = DOM.userRange;

const filmList = createFilmCards();

render(headerContainer, new Range());

export const boardController = new BoardController(mainComponent);

boardController.render(filmList);
