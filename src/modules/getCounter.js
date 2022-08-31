import { mealsCounter } from "./getElements.js";

const getCounter = async () => {
  const meal = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s",
  );
  const { meals } = await meal.json();

  mealsCounter.innerHTML = `Meals(${meals.length})`;
};

export default getCounter;
