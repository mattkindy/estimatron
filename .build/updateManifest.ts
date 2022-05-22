import fs from 'fs';
import path from 'path';
import { exit } from 'process';
import { fileURLToPath } from 'url';

import fetch from 'node-fetch';

type SlackUpdateManifestResponse = {
  ok: boolean;
  errors?: any[];
  error?: string;
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const updateManifest = async token => {
  const manifest = JSON.stringify(
    JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'manifest.json')).toString())
  );

  const response = await fetch('https://slack.com/api/apps.manifest.update', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({
      token,
      manifest,
      app_id: 'A03FAV18HSA',
    }),
  });

  const { ok, errors, error } = (await response.json()) as SlackUpdateManifestResponse;

  if (!ok) {
    console.error('Error updating manifest:', errors ?? error);
    exit(1);
  }

  console.log('Manifest updated successfully');
  exit(0);
};

const [appConfigToken] = process.argv.slice(2);
updateManifest(appConfigToken);
