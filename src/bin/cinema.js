import cinemaManager from '../courses/cinema';

const app = cinemaManager();

const { services, repositories } = app;

const email = 'etst@email.com';

const [user] = services.UserService.createUser(email);
const [film] = services.CinemaService.createFilm('first glance', 100);
const [cinemaHall] = services.CinemaService.createCinemaHall('first', 5, 5);

services.MoneyService.createPrice(cinemaHall.id, 100);

const [filmScreening] = services.MoneyService
  .createFilmScreening(film.id, cinemaHall.id, new Date());

// services.MoneyService.createPrice(cinemaHall.id, 100);

// const time = new Date();
// const [localFilmScreening] = services.MoneyService
//   .createFilmScreening(film.id, cinemaHall.id, time);


// console.log(localFilmScreening);

// const fs = repositories.FilmScreening.find(localFilmScreening.id);

// console.log(fs === localFilmScreening);

const place = { row: 5, col: 3 };
const [ticket] = services.MoneyService.buyTicket(user.id, filmScreening.id, place);
// console.log(ticket);
const capital = repositories.CapitalTransaction.findBy({ ticket });

console.log(capital.ticket.state);

const refaundTicket = services.MoneyService.refundTicket(ticket.id);
// console.log(refaundTicket);
console.log(refaundTicket);

const lossTransaction = repositories.CapitalTransaction.findAllBy({ ticket });

console.log(lossTransaction.reduce((acc, { cost }) => acc + cost, 0));
