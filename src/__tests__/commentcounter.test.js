global.fetch = () => Promise.resolve({
  json: () => Promise.resolve([
    {
      item_id: 1,
      username: 'Edi',
      comment: 'Nice',
    },
    {
      item_id: 1,
      username: 'Aamir',
      comment: 'Nice',
    },
    {
      item_id: 1,
      username: 'Edi',
      comment: 'Nice',
    },
    {
      item_id: 1,
      username: 'Edi',
      comment: 'Nice',
    },
  ]),
});

describe('Check comment counter', () => {
  test('Comment counting', async () => {
    const commenting = await fetch(
      `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/dFxlTuBqbzDgoSJBvIPk/reservations?item_id=1`,
    );
    const comment = await commenting.json();

    const size = comment.length;

    expect(size).toBe(4);
  });
});
