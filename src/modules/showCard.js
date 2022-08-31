import addLikes from "./addLikes.js";
import { mealDB, setLikes } from "./apis.js";
import { cardData } from "./getElements.js";
import popup from "./popup.js";
import reservation from "./reservation.js";

const showCard = async () => {
  try {
    const meal = await fetch(mealDB);
    const { meals } = await meal.json();
    const like = await fetch(setLikes);
    const likes = await like.json();

    meals.map((data) => {
      const { strMeal, strMealThumb, idMeal } = data;
      const col = document.createElement('div');
      col.className = 'col-sm-6 col-md-4';
      const card = document.createElement('div');
      card.className = 'card card-shadow';
      const cardHeader = document.createElement('div');
      cardHeader.className = 'card-header card-image';
      const img = document.createElement('img');
      img.src = strMealThumb;
      img.height = 300;
      img.width = 500;
      const cardBody = document.createElement('div');
      cardBody.className = 'card-body';
      const dFlex = document.createElement('div');
      dFlex.className = 'd-flex';
      const cardTitle = document.createElement('h3');
      cardTitle.className = 'card-title';
      cardTitle.innerText = strMeal;
      const div = document.createElement("div");
      const heartIcon = document.createElement("i");
      heartIcon.className = "fa fa-heart";
      const cardText = document.createElement("p");
      cardText.className = "card-text";
      const cardFooter = document.createElement("div");
      cardFooter.className = "card-footer";
      const commentButton = document.createElement("button");
      commentButton.className = "btn";
      commentButton.innerText = "Comment";
      commentButton.setAttribute("id", "showPopup");
      const reservationButton = document.createElement("button");
      reservationButton.className = "btn";
      reservationButton.innerText = "Reservation";
      commentButton.addEventListener('click', () => {
        popup(idMeal);
      });

      reservationButton.addEventListener('click', () => {
        reservation(idMeal);
      });

      heartIcon.addEventListener("click", () => {
        addLikes(idMeal, cardText);
      });

      cardData.appendChild(col);
      col.appendChild(card);
      card.appendChild(cardHeader);
      card.appendChild(cardBody);
      card.appendChild(cardFooter);
      cardHeader.appendChild(img);
      cardBody.appendChild(dFlex);
      dFlex.appendChild(cardTitle);
      dFlex.appendChild(div);
      div.appendChild(heartIcon);
      cardFooter.appendChild(commentButton);
      cardFooter.appendChild(reservationButton);

      const findId = likes.find((likes) => likes.item_id === idMeal);

      if (findId === undefined) {
        cardText.innerText = `0 Likes`;
      } else {
        cardText.innerText = `${findId.likes} Likes`;
      }

      div.appendChild(cardText);
      return data;
    });
  } catch (error) {
    console.error(error.message);
  }
};

export default showCard;
