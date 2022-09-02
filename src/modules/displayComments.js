/* eslint-disable camelcase */
const displayComments = async (
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
    const commenting = await fetch(
      `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/dFxlTuBqbzDgoSJBvIPk/comments?item_id=${idMeal}`,
    );
    const comments = await commenting.json();

    commentsHeader.innerText = `Comments (${comments.length})`;
    commentsHeader.classList = "comment";
    wrapper.appendChild(commentsHeader);

    if (commenting.status === 400) {
      popupWindow.appendChild(commentHeader);
      formComment.appendChild(inputText);
      formComment.appendChild(commentText);
      formComment.appendChild(commentButton);
      popupWindow.appendChild(formComment);
    }

    comments.map((data) => {
      const { username, comment, creation_date } = data;
      const commentsInput = document.createElement("p");
      commentsInput.classList = "comments";

      commentsInput.innerText = `${creation_date} ${username} : ${comment}`;
      wrapper.appendChild(commentsInput);
      return data;
    });

    popupWindow.appendChild(wrapper);
    popupWindow.appendChild(commentHeader);
    formComment.appendChild(inputText);
    formComment.appendChild(commentText);
    formComment.appendChild(commentButton);
    popupWindow.appendChild(formComment);
  } catch (error) {
    console.error(error.message);
  }
};

export default displayComments;
