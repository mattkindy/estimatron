import type { HttpFunction } from '@google-cloud/functions-framework';

export const http: HttpFunction = (req, res) => {
  console.log('Running typescript version')
  res.status(200).send('Hello World');
};
