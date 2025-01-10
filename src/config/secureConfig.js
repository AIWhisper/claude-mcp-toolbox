const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

class SecureConfig {
  constructor(configPath = '../config/claude_desktop_config.json') {
    this.configPath = configPath;
    this.encryptionKey = process.env.CONFIG_ENCRYPTION_KEY;
    if (!this.encryptionKey) {
      throw new Error('CONFIG_ENCRYPTION_KEY environment variable must be set');
    }
  }

  // Load and decrypt configuration
  loadConfig() {
    try {
      const encryptedConfig = fs.readFileSync(this.configPath, 'utf8');
      return this.decrypt(encryptedConfig);
    } catch (error) {
      if (error.code === 'ENOENT') {
        // If config doesn't exist, create from template
        return this.createFromTemplate();
      }
      throw error;
    }
  }

  // Save and encrypt configuration
  saveConfig(config) {
    const encryptedConfig = this.encrypt(JSON.stringify(config));
    fs.writeFileSync(this.configPath, encryptedConfig);
  }

  // Create new config from template
  createFromTemplate() {
    const templatePath = path.join(
      path.dirname(this.configPath),
      'claude_desktop_config.template.json'
    );
    const template = JSON.parse(fs.readFileSync(templatePath, 'utf8'));
    
    // Replace placeholders with environment variables
    template.mcpServers['brave-search'].env.BRAVE_API_KEY = 
      process.env.BRAVE_API_KEY || '<BRAVE_API_KEY_HERE>';
    template.mcpServers.github.env.GITHUB_PERSONAL_ACCESS_TOKEN = 
      process.env.GITHUB_PAT || '<GITHUB_PAT_HERE>';
    
    return template;
  }

  // Encrypt data
  encrypt(text) {
    const iv = crypto.randomBytes(16);
    const key = crypto.scryptSync(this.encryptionKey, 'salt', 32);
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
    
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    const authTag = cipher.getAuthTag();
    
    return JSON.stringify({
      iv: iv.toString('hex'),
      encrypted: encrypted,
      authTag: authTag.toString('hex')
    });
  }

  // Decrypt data
  decrypt(encryptedData) {
    const { iv, encrypted, authTag } = JSON.parse(encryptedData);
    const key = crypto.scryptSync(this.encryptionKey, 'salt', 32);
    const decipher = crypto.createDecipheriv(
      'aes-256-gcm',
      key,
      Buffer.from(iv, 'hex')
    );
    
    decipher.setAuthTag(Buffer.from(authTag, 'hex'));
    
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return JSON.parse(decrypted);
  }

  // Validate configuration
  validateConfig(config) {
    const requiredKeys = [
      'mcpServers.brave-search.env.BRAVE_API_KEY',
      'mcpServers.github.env.GITHUB_PERSONAL_ACCESS_TOKEN'
    ];

    for (const key of requiredKeys) {
      const value = key.split('.').reduce((obj, k) => obj && obj[k], config);
      if (!value || value.includes('<') || value.includes('>')) {
        throw new Error(`Invalid or missing value for ${key}`);
      }
    }

    return true;
  }
}

module.exports = SecureConfig;