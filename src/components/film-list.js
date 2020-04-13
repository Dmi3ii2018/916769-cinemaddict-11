import {createFilmCardTemplate} from './film-card';
import {createFilmCards} from '../mock/mock';

export const createFilmListTemplate = () => {
  return (
    `<section class="films">
      <section class="films-list">
        <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

        <div class="films-list__container">
          ${createFilmCards().map((film) => createFilmCardTemplate(film))}
        </div>

        <button class="films-list__show-more">Show more</button>
      </section>
    </section>`
  );
};
