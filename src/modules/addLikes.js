import { setLikes } from "./apis.js";

const addLikes = async (idMeal, cardText) => {
  await fetch(setLikes, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      item_id: idMeal,
    }),
  });
  const like = await fetch(setLikes);
  const likes = await like.json();

  const findId = likes.find((likes) => likes.item_id === idMeal);

  if (findId === undefined) {
    cardText.innerText = `0 Likes`;
  } else {
    cardText.innerText = `${findId.likes} Likes`;
  }
};

export default addLikes;
