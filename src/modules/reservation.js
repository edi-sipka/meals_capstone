/* eslint-disable camelcase */

import { mealDB } from "./apis.js";
import '../popup.css';
import '../style.css';
import addReservation from './addReservation';
// import pizza from '../Assets/Images/pizza.png';

// popup div

const reservation = async (idMeal) => {
  try {
    const reservation = document.createElement("div");
    reservation.id = "popup";
    reservation.classList = "popup";
    document.body.appendChild(reservation);

    // popup window
    const popupWindow = document.createElement("div");
    popupWindow.classList = "window";
    reservation.appendChild(popupWindow);

    const popupHead = document.createElement("div");
    popupHead.classList = "popup-head";
    popupHead.id = "popup-head";

    popupWindow.appendChild(popupHead);

    const xButton = document.createElement("p");
    xButton.id = "close";
    xButton.classList = "close";
    xButton.innerHTML = "X";
    popupHead.appendChild(xButton);

    const imagePopup = document.createElement("img");
    const meal = await fetch(mealDB);
    const { meals } = await meal.json();
    const data = meals.find((card) => card.idMeal === idMeal);
    const {
      strMeal, strCategory, strArea, strIngredient1, strMealThumb,
    } = data;
    imagePopup.src = strMealThumb;
    imagePopup.classList = "image-popup";
    imagePopup.id = "image-popup";
    popupWindow.appendChild(imagePopup);

    const popupHeading = document.createElement("h2");
    popupHeading.id = "title";
    popupHeading.classList = "title";
    popupHeading.innerHTML = strMeal;
    popupWindow.appendChild(popupHeading);

    // Popup Details
    const detailsPopup = document.createElement("div");
    detailsPopup.classList = "details";
    detailsPopup.id = "details";
    detailsPopup.innerHTML = ` 

    <p class="meal" id="meal">Meal: ${strMeal}</p>
    <p class="meal" id="meal">Category: ${strCategory}</p>
    <p class="meal" id="meal">Area: ${strArea}</p>
    <p class="meal" id="meal">Ingredient: ${strIngredient1}</p>
    `;

    const reserving = await fetch(
      `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/dFxlTuBqbzDgoSJBvIPk/reservations?item_id=${idMeal}`,
    );
    const reserve = await reserving.json();

    const reservationHeader = document.createElement("h3");
    reservationHeader.innerText = `Reservations (${reserve.length})`;
    reservationHeader.classList = "comment";
    if (reserve.length === undefined) {
      reservationHeader.innerText = `Reservations (0)`;
    }
    const commentHeader = document.createElement('h3');
    commentHeader.textContent = 'Add Reservation';
    commentHeader.classList = 'header-comment';

    const reserveForm = document.createElement('form');
    reserveForm.classList = 'form';

    const usernameInput = document.createElement('input');
    usernameInput.classList = 'name';
    usernameInput.type = 'text';
    usernameInput.placeholder = 'Your name';

    const dateStart = document.createElement('input');
    dateStart.classList = 'name';
    dateStart.type = 'date';
    dateStart.placeholder = 'start date';

    const dateEnd = document.createElement('input');
    dateEnd.classList = 'name';
    dateEnd.type = 'date';
    dateEnd.placeholder = 'start end';

    const ReserveButton = document.createElement('button');
    ReserveButton.className = 'btn btn-top';
    ReserveButton.innerText = 'Reserve';

    ReserveButton.addEventListener('click', (e) => {
      e.preventDefault();
      addReservation(
        idMeal,
        usernameInput,
        dateStart,
        dateEnd,

      ); // usernameInput;
    });

    popupWindow.appendChild(detailsPopup);
    popupWindow.appendChild(reservationHeader);
    popupWindow.appendChild(commentHeader);
    reserveForm.appendChild(usernameInput);
    reserveForm.appendChild(dateStart);
    reserveForm.appendChild(dateEnd);
    reserveForm.appendChild(ReserveButton);
    popupWindow.appendChild(reserveForm);

    if (xButton) {
      xButton.addEventListener("click", () => {
        reservation.remove();
      });
    }

    reserve.map((data) => {
      const { username, date_start, date_end } = data;
      const commentsInput = document.createElement("p");
      commentsInput.classList = "comments";
      commentsInput.innerText = `${date_start} to ${date_end} by ${username}`;

      popupWindow.appendChild(commentsInput);
      popupWindow.appendChild(commentHeader);
      reserveForm.appendChild(usernameInput);
      reserveForm.appendChild(dateStart);
      reserveForm.appendChild(dateEnd);
      reserveForm.appendChild(ReserveButton);
      popupWindow.appendChild(reserveForm);
      return data;
    });
  } catch (error) {
    console.error(error.message);
  }
};

export default reservation;
