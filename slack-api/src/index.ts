import { App } from '@slack/bolt';

import secrets from './service/secrets';

import type { HttpFunction } from '@google-cloud/functions-framework';

const app = async () => new App({
  token: await secrets.retrieve('SLACK_BOT_TOKEN'),
  socketMode: true,
  appToken: await secrets.retrieve('SLACK_APP_TOKEN'),
});

export const slack: HttpFunction = async (req, res) => {
  console.log('Running typescript version')

  await app();
  res.status(200).send('Hello World');
};
