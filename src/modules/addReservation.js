/* eslint-disable camelcase */

const addReservation = async (idMeal, username, date_start, date_end) => {
  try {
    await fetch(
      'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/dFxlTuBqbzDgoSJBvIPk/reservations',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          item_id: idMeal,
          username: username.value,
          date_start: date_start.value,
          date_end: date_end.value,
        }),
      },
    );

    username.value = '';
    date_start.value = '';
    date_end.value = '';
  } catch (error) {
    console.log(error.message);
  }
};

export default addReservation;
