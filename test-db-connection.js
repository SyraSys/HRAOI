// Test database connection to Hostinger
// Run with: node test-db-connection.js

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
})

async function testConnection() {
  console.log('🔍 Testing database connection...\n')
  
  try {
    // Test 1: Connect to database
    console.log('Test 1: Connecting to database...')
    await prisma.$connect()
    console.log('✅ Connected successfully!\n')

    // Test 2: Simple query
    console.log('Test 2: Running simple query...')
    const result = await prisma.$queryRaw`SELECT 1+1 as result`
    console.log('✅ Query successful:', result, '\n')

    // Test 3: Check existing tables
    console.log('Test 3: Checking database schema...')
    try {
      const users = await prisma.user.count()
      console.log(`✅ Found ${users} users in database\n`)
    } catch (err) {
      console.log('⚠️  No tables found. Run: npx prisma migrate dev\n')
    }

    console.log('🎉 All tests passed! Database is ready to use.')
    
  } catch (error) {
    console.error('❌ Database connection failed!\n')
    console.error('Error details:', error.message, '\n')
    
    // Provide helpful debugging info
    console.log('💡 Troubleshooting tips:')
    console.log('1. Check your DATABASE_URL in .env.local')
    console.log('2. Verify remote access is enabled in Hostinger')
    console.log('3. Ensure your IP is whitelisted (or use 0.0.0.0/0)')
    console.log('4. Check hostname, port, username, and password')
    console.log('5. Try adding ?sslmode=require to your connection string')
    console.log('\nConnection string format:')
    console.log('postgresql://username:password@hostname:5432/database_name')
    
  } finally {
    await prisma.$disconnect()
    console.log('\n👋 Connection closed.')
  }
}

testConnection()
