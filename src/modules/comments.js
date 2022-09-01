import { setComments } from "./apis.js";

const addComment = async (inputText, commentText, idMeal) => {
  try {
    await fetch(
      setComments,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          item_id: idMeal,
          username: inputText.value,
          comment: commentText.value,
        }),
      }
    );

    inputText.value = "";
    commentText.value = "";
  } catch (error) {
    console.log(error.message);
  }
};

export default addComment;
