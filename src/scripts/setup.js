const SecureConfig = require('../config/secureConfig');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

// Generate a secure encryption key
function generateEncryptionKey() {
  return crypto.randomBytes(32).toString('hex');
}

// Create .env file with necessary environment variables
function createEnvFile() {
  const envPath = path.join(process.cwd(), '.env');
  const encryptionKey = generateEncryptionKey();
  
  const envContent = `CONFIG_ENCRYPTION_KEY=${encryptionKey}
# Add your API keys below
#BRAVE_API_KEY=your_key_here
#GITHUB_PAT=your_pat_here
`;
  
  fs.writeFileSync(envPath, envContent);
  console.log('Created .env file with encryption key');
}

// Initialize secure configuration
function initializeConfig() {
  try {
    createEnvFile();
    
    const config = new SecureConfig();
    const initialConfig = config.createFromTemplate();
    config.saveConfig(initialConfig);
    
    console.log('Initialized secure configuration');
    console.log('Please update your .env file with your API keys');
  } catch (error) {
    console.error('Error initializing configuration:', error);
    process.exit(1);
  }
}

// Run setup if this script is executed directly
if (require.main === module) {
  initializeConfig();
}