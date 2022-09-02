/* eslint-disable camelcase */
import displayReservations from "./displayReservations.js";

const addReservation = async (
  idMeal,
  usernameInput,
  dateStart,
  dateEnd,
  popupWindow,
  reservationsHeader,
  reservationHeader,
  ReserveButton,
  reserveForm,
  wrapper,
) => {
  try {
    await fetch(
      "https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/dFxlTuBqbzDgoSJBvIPk/reservations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          item_id: idMeal,
          username: usernameInput.value,
          date_start: dateStart.value,
          date_end: dateEnd.value,
        }),
      },
    );

    usernameInput.value = "";
    dateStart.value = "";
    dateEnd.value = "";
    wrapper.innerHTML = "";

    displayReservations(
      idMeal,
      usernameInput,
      dateStart,
      dateEnd,
      popupWindow,
      reservationsHeader,
      reservationHeader,
      ReserveButton,
      reserveForm,
      wrapper,
    );
  } catch (error) {
    console.log(error.message);
  }
};

export default addReservation;
