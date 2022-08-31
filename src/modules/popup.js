/* eslint-disable camelcase */

import '../popup.css';
import '../style.css';
import addComment from './comments';
// import pizza from '../Assets/Images/pizza.png';

// popup div

const popup = async (idMeal) => {
  try {
    const popup = document.createElement('div');
    popup.id = 'popup';
    popup.classList = 'popup';
    document.body.appendChild(popup);

    // popup window
    const popupWindow = document.createElement('div');
    popupWindow.classList = 'window';
    popup.appendChild(popupWindow);

    const popupHead = document.createElement('div');
    popupHead.classList = 'popup-head';
    popupHead.id = 'popup-head';

    popupWindow.appendChild(popupHead);

    const xButton = document.createElement('p');
    xButton.id = 'close';
    xButton.classList = 'close';
    xButton.innerHTML = 'X';
    popupHead.appendChild(xButton);

    const imagePopup = document.createElement('img');
    const meal = await fetch(
      'https://www.themealdb.com/api/json/v1/1/search.php?s',
    );
    const { meals } = await meal.json();
    const data = meals.find((card) => card.idMeal === idMeal);
    const {
      strMeal, strCategory, strArea, strIngredient1, strMealThumb,
    } = data;
    imagePopup.src = strMealThumb;
    imagePopup.classList = 'image-popup';
    imagePopup.id = 'image-popup';
    popupWindow.appendChild(imagePopup);

    const popupHeading = document.createElement('h2');
    popupHeading.id = 'title';
    popupHeading.classList = 'title';
    popupHeading.innerHTML = strMeal;
    popupWindow.appendChild(popupHeading);

    // Popup Details
    const detailsPopup = document.createElement('div');
    detailsPopup.classList = 'details';
    detailsPopup.id = 'details';
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

    const commentsHeader = document.createElement('h3');
    commentsHeader.innerText = `Comments (${comments.length})`;
    commentsHeader.classList = 'comment';
    if (comments.length === undefined) {
      commentsHeader.innerText = `Comments (0)`;
    }
    const commentHeader = document.createElement('h3');
    commentHeader.textContent = 'Add Comment';
    commentHeader.classList = 'header-comment';

    const formComment = document.createElement('form');
    formComment.classList = 'form';

    const inputText = document.createElement('input');
    inputText.classList = 'name';
    inputText.type = 'text';
    inputText.placeholder = 'Your name';

    const commentText = document.createElement('textarea');
    commentText.classList = 'textarea';
    commentText.placeholder = 'Your comment';

    const commentButton = document.createElement('button');
    commentButton.className = 'btn btn-top';
    commentButton.innerText = 'Add comment';

    commentButton.addEventListener('click', (e) => {
      e.preventDefault();
      addComment(
        inputText,
        commentText,
        idMeal,
        popupWindow,
        commentButton,
        formComment,
        detailsPopup,
      );
    });

    popupWindow.appendChild(detailsPopup);
    popupWindow.appendChild(commentsHeader);
    popupWindow.appendChild(commentHeader);
    formComment.appendChild(inputText);
    formComment.appendChild(commentText);
    formComment.appendChild(commentButton);
    popupWindow.appendChild(formComment);

    if (xButton) {
      xButton.addEventListener('click', () => {
        popup.remove();
      });
    }

    comments.map((data) => {
      const { username, comment, creation_date } = data;
      const commentsInput = document.createElement('p');
      commentsInput.classList = 'comments';
      commentsInput.innerText = `${creation_date} ${username} : ${comment}`;

      popupWindow.appendChild(commentsInput);
      popupWindow.appendChild(commentHeader);
      formComment.appendChild(inputText);
      formComment.appendChild(commentText);
      formComment.appendChild(commentButton);
      popupWindow.appendChild(formComment);
      return data;
    });
  } catch (error) {
    console.error(error.message);
  }
};

export default popup;
