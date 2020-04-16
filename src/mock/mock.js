const FILM_CARDS_NUMBER = 13;

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const posterAdress = [`made-for-each-other.png`, `popeye-meets-sinbad.png`, `sagebrush-trail.jpg`, `santa-claus-conquers-the-martians.jpg`, `the-dance-of-life.jpg`, `the-great-flamarion.jpg`, `the-man-with-the-golden-arm.jpg`];

const description = {
  description: [`Lorem ipsum dolor sit amet, consectetur adipiscing elit`, `Cras aliquet varius magna, non porta ligula feugiat eget`, `Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra`, `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante`, `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum`, `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui`, `Sed sed nisi sed augue convallis suscipit in sed feli`, `Aliquam erat volutpat`, `Nunc fermentum tortor ac porta dapibus`, `In rutrum ac purus sit amet tempus`],
  descrLength: 3,
  get descriptionList() {
    const tempDescr = [];
    for (let i = 0; i < this.descrLength; i++) {
      tempDescr.push(this.description[getRandomNumber(0, this.description.length - 1)]);
    }
    return tempDescr.join(`,`);
  }
};

const CreateCard = function () {
  this.name = `Avatar`;
  this.poster = `images/posters/${posterAdress[getRandomNumber(0, posterAdress.length - 1)]}`;
  this.description = description.descriptionList;
  this.comments = [];
};

export const createFilmCards = () => {
  const cards = [];
  for (let i = 0; i < FILM_CARDS_NUMBER; i++) {
    const filmData = new CreateCard();
    cards.push(filmData);
  }
  return cards;
};
