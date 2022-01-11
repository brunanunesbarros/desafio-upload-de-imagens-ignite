import fauna from 'faunadb';

export const clientFauna = new fauna.Client({
  secret: process.env.FAUNA_API_KEY,
});
