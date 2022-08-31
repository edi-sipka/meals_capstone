const addComment = async (inputText, commentText, idMeal) => {
  try {
    await fetch(
      'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/dFxlTuBqbzDgoSJBvIPk/comments',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          item_id: idMeal,
          username: inputText.value,
          comment: commentText.value,
        }),
      },
    );

    inputText.value = '';
    commentText.value = '';
  } catch (error) {
    console.log(error.message);
  }
};

export default addComment;
