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

The project includes automated deployment to SFTP via GitHub Actions.

### GitHub Secrets Configuration

To enable automated deployment, configure the following secrets in your GitHub repository:

1. Navigate to repository Settings → Secrets and variables → Actions
2. Add the following secrets:
   - `SFTP_SERVER`: Your SFTP server hostname
   - `SFTP_USERNAME`: Your SFTP username
   - `SFTP_PASSWORD`: Your SFTP password
   - `SFTP_PORT`: Your SFTP port number (typically 22)

### Deployment Triggers

The deployment workflow runs:

- Automatically on every push to the `main` branch
- Manually via GitHub Actions UI (workflow_dispatch)
