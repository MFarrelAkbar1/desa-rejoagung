// test-jwt.js
const fs = require('fs');

try {
  const envContent = fs.readFileSync('.env.local', 'utf8');
  const jwtLine = envContent.split('\n').find(line => line.startsWith('JWT_SECRET='));
  
  if (jwtLine) {
    const secret = jwtLine.split('=')[1];
    console.log('✅ JWT Secret found!');
    console.log('Length:', secret.length, 'characters');
    console.log('Status:', secret.length >= 64 ? 'Strong ✅' : 'Need longer secret ❌');
  } else {
    console.log('❌ JWT_SECRET not found in .env.local');
  }
} catch (error) {
  console.log('❌ Cannot read .env.local file:', error.message);
}