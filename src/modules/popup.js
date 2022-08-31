/* eslint-disable camelcase */
import "../popup.css";
import { mealDB } from "./apis.js";

const popup = async (idMeal) => {
  try {
    const popup = document.createElement("div");
    popup.id = "popup";
    popup.classList = "popup";
    document.body.appendChild(popup);

    // popup window
    const popupWindow = document.createElement("div");
    popupWindow.classList = "window";
    popup.appendChild(popupWindow);

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

    const commenting = await fetch(
      `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/dFxlTuBqbzDgoSJBvIPk/comments?item_id=${idMeal}`,
    );
    const comments = await commenting.json();

    const commentsHeader = document.createElement("h3");
    commentsHeader.innerText = `Comments (${comments.length})`;
    commentsHeader.classList = "comment";
    if (comments.length === undefined) {
      commentsHeader.innerText = `Comments (0)`;
    }

    popupWindow.appendChild(detailsPopup);
    popupWindow.appendChild(commentsHeader);

    if (xButton) {
      xButton.addEventListener("click", () => {
        popup.remove();
      });
    }

    comments.map((data) => {
      const { username, comment, creation_date } = data;
      const commentsInput = document.createElement("p");
      commentsInput.classList = "comments";
      commentsInput.innerText = `${creation_date} ${username} : ${comment}`;

      popupWindow.appendChild(commentsInput);
      return data;
    });
  } catch (error) {
    console.error(error.message);
  }
};

export default popup;
