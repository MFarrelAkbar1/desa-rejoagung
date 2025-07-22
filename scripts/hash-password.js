// scripts/hash-password.js
// Script untuk generate hash password admin

const bcrypt = require('bcryptjs');

async function hashPassword(password) {
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  console.log(`Password: ${password}`);
  console.log(`Hash: ${hash}`);
  return hash;
}

// Generate hash untuk password admin yang baru
async function generateAdminHashes() {
  console.log('=== GENERATING ADMIN PASSWORD HASHES ===\n');
  
  // Password baru sesuai permintaan
  await hashPassword('RejoAgung!2025@Adm1n#');
  console.log('\n');
  
  // Alternatif passwords jika diperlukan
  await hashPassword('Rejo@2025Agung');
  console.log('\n');
  await hashPassword('AdminRejo2025!');
  
  console.log('\n=== COPY HASH ABOVE TO SQL INSERT ===');
  console.log('\nContoh SQL Insert:');
  console.log(`INSERT INTO admin_users (username, password_hash, email, full_name) VALUES`);
  console.log(`('rejo_admin', 'HASH_DARI_ATAS', 'farrelm212@gmail.com', 'Admin Desa Rejoagung');`);
}

// Fungsi untuk verify password (testing)
async function verifyPassword(password, hash) {
  const isValid = await bcrypt.compare(password, hash);
  console.log(`Password "${password}" is ${isValid ? 'VALID' : 'INVALID'}`);
  return isValid;
}

generateAdminHashes();

// Cara menjalankan:
// 1. npm install bcryptjs
// 2. node scripts/hash-password.js