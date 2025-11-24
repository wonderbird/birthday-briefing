# Birthday Briefing

A calm, privacy-first birthday overview app that shows who has a birthday in the next 14 days based on a CardDAV source.

## Prerequisites

- Node.js 24.x (LTS) or later
- npm

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

The project includes automated deployment to FTPS via GitHub Actions.

### GitHub Secrets Configuration

To enable automated deployment, configure the following secrets in your GitHub repository:

1. Navigate to repository Settings → Secrets and variables → Actions
2. Add the following secrets:
   - `FTPS_SERVER`: Your FTPS server hostname
   - `FTPS_USERNAME`: Your FTPS username
   - `FTPS_PASSWORD`: Your FTPS password
   - `FTPS_DANGEROUS_CLEAN_SLATE`: `false` - see section on trouble shooting.

### Deployment Trouble Shooting

If you have problems uploading some files to the server, set the variable `FTPS_DANGEROUS_CLEAN_SLATE` to `true`, trigger a deployment and then reset it to `false`. This will cause the deployment action to delete all files from the server before uploading the build result.

See [SamKirkland / FTP-Deploy-Action](https://github.com/SamKirkland/FTP-Deploy-Action) for more information.

### Deployment Triggers

The deployment workflow runs:

- Automatically on every push to the `main` branch
- Manually via GitHub Actions UI (workflow_dispatch)
