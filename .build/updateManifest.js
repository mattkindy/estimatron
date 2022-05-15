const fs = require('fs');
const path = require('path');
const { exit } = require('process');

const updateManifest = async (token) => {
  const manifest = JSON.stringify(JSON.parse(fs.readFileSync(path.join(__dirname, "..", "manifest.json")).toString()));
  
  const { default: fetch } = await import('node-fetch');
  const response = await fetch('https://slack.com/api/apps.manifest.update', { 
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify({
      token,
      manifest,
      app_id: 'A03FAV18HSA'
    })
  });

  const responseJson = await response.json();
  const { ok, errors, error } = responseJson;
  if (!ok) {
    console.error('Error updating manifest:', errors ?? error);
    exit(1);
  }

  console.log('Manifest updated successfully');
  exit(0);
};

if (require.main === module) {
  const [appConfigToken] = process.argv.slice(2);
  updateManifest(appConfigToken);
}


