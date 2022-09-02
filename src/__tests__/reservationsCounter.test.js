global.fetch = () => Promise.resolve({
  json: () => Promise.resolve([
    {
      item_id: 2,
      username: 'nama',
      date_start: '2022-09-22',
      date_end: '2020-10-16',
    },
    {
      item_id: 2,
      username: 'Jane',
      date_start: '2020-10-15',
      date_end: '2020-10-16',
    },
  ]),
});
describe('Testing resevations counter', () => {
  test('count reservations', async () => {
    const reserving = await fetch(
      `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/dFxlTuBqbzDgoSJBvIPk/reservations?item_id=2`,
    );
    const reserve = await reserving.json();
    const size = reserve.length;
    expect(size).toBe(2);
  });
});
