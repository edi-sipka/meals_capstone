import '../popup.css';
// import pizza from '../Assets/Images/pizza.png';

// popup div

const popup = async (idMeal) => {
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
  popupWindow.appendChild(detailsPopup);

  // Closing element
  if (xButton) {
    xButton.addEventListener('click', () => {
      popup.remove();
    });
  }
};

export default popup;
