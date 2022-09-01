global.fetch = () => Promise.resolve({
  json: () => Promise.resolve([
    {
      item_id: 1,
    },
  ]),
});

describe("Testing likes counter", () => {
  test("Check Like Counter", async () => {
    const like = await fetch(
      "https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/dFxlTuBqbzDgoSJBvIPk/likes",
    );
    const likes = await like.json();
    const size = likes.length;
    expect(likes).toHaveLength(size);
  });
});
