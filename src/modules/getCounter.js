import { mealDB } from './apis.js';
import { mealsCounter } from './getElements.js';

const getCounter = async () => {
  const meal = await fetch(mealDB);
  const { meals } = await meal.json();

  mealsCounter.innerHTML = `Meals(${meals.length})`;
};

export default getCounter;
