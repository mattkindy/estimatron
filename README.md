# estimatron

## Overview
`estimatron` is a Slack app that teams can use to estimate story points for issues. In addition to exposing a simple planpoker-like interface, it will identify individual voting tendencies and create adjusted estimates over time.

## Prerequisites

### Overall
- Node 18.x (specific version in `.nvmrc`)
- `yarn` package manager

### Backend (`slack-api`)
- `gcloud` CLI
- Serverless Framework

### Frontend
TBD

### Backend
Serverless is set up to handle the deployment, assuming all is configured properly.

1. Ensure that the `CREDENTIALS_PATH` environment variable is properly set to the location of a service account for deployment. 
2. From within the `slack-api` directory, run `serverless deploy --stage [ENVIRONMENT]`

Refer to `.github/workflows/main_update.yaml` for specific commands.