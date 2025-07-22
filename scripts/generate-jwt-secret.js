// scripts/generate-jwt-secret.js
const crypto = require('crypto');

function generateJWTSecret() {
  // Generate cryptographically secure random bytes
  const jwtSecret = crypto.randomBytes(64).toString('hex');
  
  console.log('🔐 JWT SECRET GENERATOR - DESA REJOAGUNG');
  console.log('=' .repeat(50));
  console.log('');
  
  console.log('📋 Copy paste ini ke file .env.local Anda:');
  console.log('');
  console.log(`JWT_SECRET=${jwtSecret}`);
  console.log('');
  
  console.log('📊 Secret Information:');
  console.log(`   Length: ${jwtSecret.length} characters`);
  console.log(`   Bits: ${jwtSecret.length * 4} bits (${Math.floor(jwtSecret.length * 4 / 8)} bytes)`);
  console.log(`   Strength: ${jwtSecret.length >= 64 ? 'Very Strong ✅' : 'Needs to be longer ❌'}`);
  console.log(`   Generated: ${new Date().toISOString()}`);
  console.log('');
  
  console.log('🔒 Security Notes:');
  console.log('   ✅ Cryptographically secure random generation');
  console.log('   ✅ Suitable for production use');
  console.log('   ⚠️  Keep this secret private and secure');
  console.log('   ⚠️  Don\'t commit .env.local to Git');
  console.log('   ⚠️  Use different secrets for different environments');
  console.log('');
  
  console.log('📝 Example .env.local file:');
  console.log('   # Supabase Configuration');
  console.log('   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url');
  console.log('   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key');
  console.log('   ');
  console.log('   # JWT Secret for Admin Authentication');
  console.log(`   JWT_SECRET=${jwtSecret}`);
  console.log('   ');
  console.log('   # App URL');
  console.log('   NEXT_PUBLIC_APP_URL=http://localhost:3000');
  console.log('   ');
  console.log('   # Email Configuration');
  console.log('   SMTP_HOST=smtp.gmail.com');
  console.log('   SMTP_PORT=587');
  console.log('   SMTP_USER=farrelm212@gmail.com');
  console.log('   SMTP_PASS=your-gmail-app-password');
  
  return jwtSecret;
}

// Generate additional secrets if needed
function generateAdditionalSecrets() {
  console.log('');
  console.log('🔑 Additional Secrets (if needed):');
  console.log('');
  
  const encryptionKey = crypto.randomBytes(32).toString('hex');
  const sessionSecret = crypto.randomBytes(32).toString('hex');
  
  console.log(`ENCRYPTION_KEY=${encryptionKey}`);
  console.log(`SESSION_SECRET=${sessionSecret}`);
}

// Verify existing secret (if provided)
function verifySecret(secret) {
  console.log('🔍 Secret Analysis:');
  console.log(`   Length: ${secret.length} characters`);
  console.log(`   Strength: ${secret.length >= 64 ? 'Strong ✅' : secret.length >= 32 ? 'Adequate ⚠️' : 'Weak ❌'}`);
  
  // Check character diversity
  const hasLower = /[a-z]/.test(secret);
  const hasUpper = /[A-Z]/.test(secret);
  const hasNumbers = /\d/.test(secret);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(secret);
  
  console.log(`   Lowercase: ${hasLower ? '✅' : '❌'}`);
  console.log(`   Uppercase: ${hasUpper ? '✅' : '❌'}`);
  console.log(`   Numbers: ${hasNumbers ? '✅' : '❌'}`);
  console.log(`   Special chars: ${hasSpecial ? '✅' : '❌'}`);
}

// Main execution
if (require.main === module) {
  // Check if user wants to verify existing secret
  const args = process.argv.slice(2);
  
  if (args.length > 0 && args[0] === '--verify') {
    const secret = args[1];
    if (secret) {
      verifySecret(secret);
    } else {
      console.log('❌ Please provide a secret to verify: node generate-jwt-secret.js --verify YOUR_SECRET');
    }
  } else if (args.length > 0 && args[0] === '--help') {
    console.log('JWT Secret Generator for Desa Rejoagung');
    console.log('');
    console.log('Usage:');
    console.log('  node generate-jwt-secret.js          # Generate new secret');
    console.log('  node generate-jwt-secret.js --verify SECRET  # Verify existing secret');
    console.log('  node generate-jwt-secret.js --help          # Show this help');
  } else {
    // Generate new secret
    generateJWTSecret();
    generateAdditionalSecrets();
  }
}

module.exports = { generateJWTSecret, verifySecret };