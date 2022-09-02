import { setComments } from "./apis.js";
import displayComments from "./displayComments.js";

const addComment = async (
  inputText,
  commentText,
  idMeal,
  popupWindow,
  commentHeader,
  commentsHeader,
  formComment,
  commentButton,
  wrapper,
) => {
  try {
    await fetch(setComments, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        item_id: idMeal,
        username: inputText.value,
        comment: commentText.value,
      }),
    });

    inputText.value = "";
    commentText.value = "";
    wrapper.innerHTML = "";

    displayComments(
      inputText,
      commentText,
      idMeal,
      popupWindow,
      commentHeader,
      commentsHeader,
      formComment,
      commentButton,
      wrapper,
    );
  } catch (error) {
    console.log(error.message);
  }
};

export default addComment;
