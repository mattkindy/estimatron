import fs from 'fs';
import path from 'path';
import { exit } from 'process';
import { fileURLToPath } from 'url';

import fetch from 'node-fetch';

type SlackValidateManifestResponse = {
  ok: boolean;
  errors?: any[];
  error?: string;
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const validateManifest = async token => {
  const manifest = JSON.stringify(
    JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'manifest.json')).toString())
  );

  const response = await fetch('https://slack.com/api/apps.manifest.validate', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({
      token,
      manifest,
    }),
  });

  const { ok, errors, error } = (await response.json()) as SlackValidateManifestResponse;
  if (!ok) {
    console.error('Error validating manifest:', errors ?? error);
    exit(1);
  }

  console.log('Manifest validated successfully');
  exit(0);
};

const [appConfigToken] = process.argv.slice(2);
validateManifest(appConfigToken);
