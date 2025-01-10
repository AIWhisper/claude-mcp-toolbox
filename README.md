# Claude MCP Toolbox

## Security Setup

1. Run the setup script to initialize secure configuration:
   ```bash
   node src/scripts/setup.js
   ```

2. Update the generated `.env` file with your API keys:
   ```env
   CONFIG_ENCRYPTION_KEY=generated_key
   BRAVE_API_KEY=your_key_here
   GITHUB_PAT=your_pat_here
   ```

3. Your configuration will be automatically encrypted using AES-256-GCM.

## Security Features

- Configuration encryption using AES-256-GCM
- Environment variable based secrets management
- Secure key derivation using scrypt
- Authentication tags to prevent tampering
- Template-based configuration initialization

## Usage

```javascript
const SecureConfig = require('./src/config/secureConfig');

const config = new SecureConfig();
const configuration = config.loadConfig();
```

## Security Best Practices

1. Never commit the `.env` file
2. Keep your encryption key secure
3. Rotate API keys periodically
4. Use minimum required permissions for API tokens
5. Monitor for suspicious activity
