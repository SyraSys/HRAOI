# Using Hostinger Database (Without Deploying App on Hostinger)

This guide shows you how to use Hostinger's database service while deploying your application elsewhere (Vercel, local, etc.)

## Prerequisites
- Active Hostinger hosting plan
- Access to hPanel

---

## Step 1: Create Database on Hostinger

### For PostgreSQL (Recommended - Your app uses this)

1. **Login to [hPanel](https://hpanel.hostinger.com)**

2. **Navigate to Databases:**
   - Left sidebar → **"Databases"**
   - Select **"PostgreSQL"** (if available)
   - *Note: Not all Hostinger plans support PostgreSQL. If unavailable, use MySQL (see below)*

3. **Create Database:**
   ```
   Database Name: hroi_db
   Username: hroi_user (or your choice)
   Password: [Create strong password]
   ```

4. **Save these credentials:**
   ```
   Host: pg-xxxx.hostinger.com (or IP address shown)
   Port: 5432
   Database: hroi_db
   Username: hroi_user
   Password: [your password]
   ```

### For MySQL (If PostgreSQL not available)

1. **Same steps but select "MySQL Databases"**

2. **Credentials format:**
   ```
   Host: mysql-xxxx.hostinger.com
   Port: 3306
   Database: hroi_db
   Username: hroi_user
   Password: [your password]
   ```

3. **⚠️ Important:** You'll need to modify Prisma schema (see Step 4)

---

## Step 2: Enable Remote Access

### Why?
By default, Hostinger databases only accept connections from Hostinger servers. You need to allow external connections.

### How to Enable:

1. **In hPanel → Databases:**
   - Find your database
   - Click **"Remote Database"** or **"Manage"**
   - Look for **"Remote MySQL/PostgreSQL"** option

2. **Add Allowed Hosts:**

   **For Vercel Deployment:**
   ```
   Add: 0.0.0.0/0
   ```
   *This allows all IPs. Vercel uses dynamic IPs, so this is necessary.*

   **For Local Development:**
   ```
   Add: [Your IP Address]
   ```
   *Get your IP from: https://www.whatismyip.com*

   **Security Best Practice:**
   - Use strong passwords (20+ characters)
   - Consider using SSL/TLS connections
   - Regularly rotate passwords
   - Monitor database access logs

3. **Save Changes**

---

## Step 3: Configure Environment Variables

### Copy and Edit Environment File:

1. **Create `.env.local` from example:**
   ```bash
   cp .env.example .env.local
   ```

2. **Edit `.env.local`:**

   **For PostgreSQL:**
   ```env
   DATABASE_URL="postgresql://hroi_user:YOUR_PASSWORD@pg-xxxx.hostinger.com:5432/hroi_db"
   ```

   **For MySQL:**
   ```env
   DATABASE_URL="mysql://hroi_user:YOUR_PASSWORD@mysql-xxxx.hostinger.com:3306/hroi_db"
   ```

   **Replace:**
   - `hroi_user` → your database username
   - `YOUR_PASSWORD` → your database password
   - `pg-xxxx.hostinger.com` → your database hostname
   - `hroi_db` → your database name

3. **Add other required variables:**
   ```env
   NEXTAUTH_SECRET="[generate with: openssl rand -base64 32]"
   NEXTAUTH_URL="http://localhost:3000"  # or your production URL
   
   SUPABASE_URL="https://your-project.supabase.co"
   SUPABASE_SERVICE_ROLE_KEY="your-key"
   SUPABASE_STORAGE_BUCKET="hraoi-assets"
   ```

---

## Step 4: Update Prisma Schema (If Using MySQL)

If you're switching from PostgreSQL to MySQL:

1. **Edit `prisma/schema.prisma`:**
   ```prisma
   datasource db {
     provider = "mysql"  // Changed from "postgresql"
     url      = env("DATABASE_URL")
   }
   ```

2. **Check for PostgreSQL-specific features and adjust:**
   - `@db.Text` might need to be `@db.LongText`
   - UUID types → use `String @id @default(cuid())`
   - JSON fields work in MySQL 5.7+

---

## Step 5: Run Database Migrations

### Initialize the Database:

1. **Generate Prisma Client:**
   ```bash
   npx prisma generate
   ```

2. **Run Migrations:**
   ```bash
   npx prisma migrate dev --name init
   ```

3. **If migration fails, try push:**
   ```bash
   npx prisma db push
   ```

4. **Verify Connection:**
   ```bash
   npx prisma db pull
   ```

---

## Step 6: Test the Connection

### Quick Test:

1. **Create a test script `test-db-connection.js`:**
   ```javascript
   const { PrismaClient } = require('@prisma/client')
   const prisma = new PrismaClient()

   async function testConnection() {
     try {
       await prisma.$connect()
       console.log('✅ Database connection successful!')
       
       // Try a simple query
       const result = await prisma.$queryRaw`SELECT 1+1 as result`
       console.log('✅ Query test successful:', result)
       
     } catch (error) {
       console.error('❌ Database connection failed:', error)
     } finally {
       await prisma.$disconnect()
     }
   }

   testConnection()
   ```

2. **Run the test:**
   ```bash
   node test-db-connection.js
   ```

### Expected Output:
```
✅ Database connection successful!
✅ Query test successful: [ { result: 2 } ]
```

---

## Step 7: Deploy to Vercel (Using Hostinger Database)

1. **Push your code to GitHub**

2. **Go to [Vercel](https://vercel.com)**

3. **Import your repository**

4. **Add Environment Variables in Vercel:**
   - Go to Project Settings → Environment Variables
   - Add all variables from `.env.local`:
     ```
     DATABASE_URL = postgresql://hroi_user:password@pg-xxxx.hostinger.com:5432/hroi_db
     NEXTAUTH_SECRET = [your secret]
     NEXTAUTH_URL = https://yourdomain.com
     # ... other variables
     ```

5. **Deploy!**

6. **Your app will run on Vercel but use Hostinger's database** 🎉

---

## Troubleshooting

### Error: "Can't reach database server"

**Solutions:**
1. Check remote access is enabled in Hostinger
2. Verify IP is whitelisted (add `0.0.0.0/0` temporarily to test)
3. Check hostname and port are correct
4. Try using IP address instead of hostname

### Error: "Authentication failed"

**Solutions:**
1. Double-check username and password
2. Ensure no special characters need URL encoding in password
3. Try resetting database password in hPanel

### Error: "SSL connection required"

**Solutions:**
1. Add SSL parameter to connection string:
   ```
   postgresql://user:pass@host:5432/db?sslmode=require
   ```

### Slow Connection

**Possible causes:**
1. Geographic distance between your app and database server
2. Hostinger database plan limitations
3. Network latency

**Solutions:**
- Consider using a CDN
- Optimize database queries
- Upgrade Hostinger plan if needed
- Use connection pooling

---

## Security Best Practices

### 1. Strong Passwords
```bash
# Generate secure password:
openssl rand -base64 32
```

### 2. Environment Variable Security
- Never commit `.env.local` to Git
- Use different passwords for development/production
- Rotate credentials regularly

### 3. IP Whitelisting
- Use specific IPs when possible
- If using `0.0.0.0/0`, ensure strong passwords + SSL

### 4. SSL/TLS Connections
```env
DATABASE_URL="postgresql://user:pass@host:5432/db?sslmode=require"
```

### 5. Regular Backups
- Set up automatic backups in Hostinger
- Test restoration process
- Keep local backup copies

---

## Cost Considerations

**Hostinger Database:**
- Included with Business/Premium plans
- Storage limits vary by plan
- Check concurrent connection limits

**Alternative:**
- **Supabase:** 500MB free, generous limits
- **PlanetScale:** Free tier available (MySQL)
- **Railway:** PostgreSQL with free tier

---

## FAQ

**Q: Can I use Hostinger database with Vercel?**
A: Yes! Just enable remote access and add the DATABASE_URL to Vercel environment variables.

**Q: Which is better - MySQL or PostgreSQL?**
A: Your app is configured for PostgreSQL. Use it if available. MySQL works but requires schema changes.

**Q: Is it secure to allow all IPs (0.0.0.0/0)?**
A: With strong passwords and SSL, it's acceptable. For higher security, use a VPN or dedicated database service.

**Q: How do I backup my Hostinger database?**
A: Use Hostinger's backup feature in hPanel, or use `pg_dump` / `mysqldump` via SSH.

**Q: Can I use this for production?**
A: Yes, but consider:
- Performance (location, plan limits)
- Monitoring and backups
- Support requirements

---

## Next Steps

- ✅ Database created on Hostinger
- ✅ Remote access enabled
- ✅ Environment variables configured
- ✅ Prisma migrations applied
- ✅ Connection tested
- 🚀 Ready to deploy on Vercel!

**Need help?** Check the main [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
