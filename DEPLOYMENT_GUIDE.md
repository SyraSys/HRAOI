# Deploying to Hostinger - Complete Guide

## Prerequisites

1. **Hostinger Plan Requirements:**
   - Business Hosting or VPS (for Node.js support)
   - MySQL or PostgreSQL database
   - SSH access
   - Domain name connected

2. **Check if your plan supports Node.js:**
   - Login to Hostinger hPanel
   - Check if "Node.js" option is available in the hosting panel

---

## Method 1: Deploy on Hostinger with Node.js Support

### Step 1: Prepare Your Local Project

1. **Create production environment file:**
   ```bash
   cp .env.example .env.production
   ```

2. **Edit `.env.production` with your production values:**
   - Database URL (from Hostinger database)
   - NextAuth secret (generate with: `openssl rand -base64 32`)
   - Your domain URL
   - Cloudinary credentials

3. **Test the build locally:**
   ```bash
   npm run build
   npm start
   ```

### Step 2: Set Up Database on Hostinger

1. **Login to Hostinger hPanel**
2. **Navigate to Databases → MySQL/PostgreSQL**
3. **Create a new database:**
   - Database name: `hroi_db`
   - Username: Create or use existing
   - Password: Create strong password
   - Note down these credentials

### Step 3: Prepare Files for Upload

1. **Build the project:**
   ```bash
   npm install
   npm run build
   ```

2. **Create a `.gitignore` if deploying via Git, or prepare these folders:**
   - Keep: `app/`, `components/`, `lib/`, `prisma/`, `public/`, `generated/`
   - Keep: `package.json`, `package-lock.json`, `next.config.ts`, `tsconfig.json`
   - Keep: `.next/` folder (after build)
   - Skip: `node_modules/` (will install on server)

### Step 4: Connect via SSH and Upload Files

1. **Get SSH credentials from Hostinger:**
   - Go to hPanel → Advanced → SSH Access
   - Note: hostname, port, username

2. **Connect via SSH:**
   ```bash
   ssh username@yourdomain.com -p port
   ```

3. **Upload files using SFTP or Git:**

   **Option A: Using SFTP (FileZilla/WinSCP):**
   - Connect to your server via SFTP
   - Navigate to `public_html/` or your domain folder
   - Upload all project files except `node_modules/`

   **Option B: Using Git:**
   ```bash
   # On server via SSH
   cd public_html
   git clone your-repository-url .
   ```

### Step 5: Set Up on Hostinger Server

1. **Connect via SSH and navigate to your project:**
   ```bash
   cd ~/public_html
   ```

2. **Set Node.js version (in hPanel):**
   - Go to hPanel → Advanced → Node.js
   - Select Node.js version 18 or higher
   - Set application root to your project directory
   - Set application URL to your domain

3. **Install dependencies:**
   ```bash
   npm install --production
   ```

4. **Set up environment variables:**
   ```bash
   nano .env.production
   # Paste your production environment variables
   # Save with Ctrl+X, then Y, then Enter
   ```

5. **Run Prisma migrations:**
   ```bash
   npx prisma generate
   npx prisma migrate deploy
   ```

6. **Build the application:**
   ```bash
   npm run build
   ```

### Step 6: Configure Node.js Application in hPanel

1. **Go to hPanel → Node.js**
2. **Configure application:**
   - Application root: `/public_html` (or your path)
   - Application URL: `https://yourdomain.com`
   - Application startup file: `npm start` or `node_modules/next/dist/bin/next start`
   - Node.js version: 18.x or higher

3. **Set environment variables in hPanel:**
   - Add all variables from your `.env.production`

4. **Start the application**

### Step 7: Set Up Domain

1. **Point your domain to Hostinger:**
   - If domain is from Hostinger: already configured
   - If external domain: update nameservers to Hostinger's

2. **Set up SSL certificate:**
   - Go to hPanel → Security → SSL
   - Install free Let's Encrypt SSL
   - Wait for SSL activation (can take up to 24 hours)

3. **Configure .htaccess for redirects (if needed):**
   ```apache
   RewriteEngine On
   RewriteCond %{HTTPS} off
   RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
   ```

---

## Method 2: Alternative - Deploy as Static Export (Limited Features)

**⚠️ Warning:** This removes API routes and database functionality.

If your Hostinger plan doesn't support Node.js:

1. **Modify `next.config.ts`:**
   ```typescript
   const nextConfig = {
     output: 'export',
     images: { unoptimized: true }
   };
   ```

2. **Build static site:**
   ```bash
   npm run build
   ```

3. **Upload the `out/` folder to Hostinger via FTP**

**Note:** This won't work for your app since you need:
- API routes
- Database connection
- Dynamic features

---

## Method 3: Recommended Alternative - Vercel (Easiest)

Since you're using Next.js with API routes and database:

1. **Push code to GitHub**
2. **Go to [vercel.com](https://vercel.com)**
3. **Import your GitHub repository**
4. **Add environment variables**
5. **Deploy** (automatic)

**Benefits:**
- Free hosting optimized for Next.js
- Automatic deployments
- Built-in SSL
- Better performance
- Easy database integration

**Point your Hostinger domain to Vercel:**
- In Hostinger: Add CNAME record pointing to Vercel
- In Vercel: Add your custom domain

---

## Troubleshooting

### Build Fails
- Check Node.js version (needs 18+)
- Ensure all dependencies are installed
- Check for TypeScript errors

### Database Connection Issues
- Verify DATABASE_URL is correct
- Check database credentials
- Ensure database server is accessible
- Check if Prisma migrations are applied

### Application Won't Start
- Check Node.js logs in hPanel
- Verify all environment variables are set
- Ensure `.next` folder exists after build
- Check file permissions

### 502/503 Errors
- Node.js process may have crashed
- Check application logs
- Restart the Node.js application
- Verify startup command is correct

---

## Post-Deployment Checklist

- [ ] Database is created and accessible
- [ ] All environment variables are set
- [ ] Prisma migrations are applied
- [ ] Application builds successfully
- [ ] Node.js app is running
- [ ] Domain points to hosting
- [ ] SSL certificate is active
- [ ] Test all pages and API routes
- [ ] Test image uploads (Cloudinary)
- [ ] Test authentication
- [ ] Test database operations

---

## Maintenance

### Update Application:
```bash
# On server via SSH
cd ~/public_html
git pull  # if using Git
npm install
npm run build
# Restart Node.js app from hPanel
```

### Database Backup:
```bash
# Export database regularly
mysqldump -u username -p database_name > backup.sql
```

---

## Need Help?

- Hostinger Support: https://www.hostinger.com/support
- Next.js Docs: https://nextjs.org/docs/deployment
- Prisma Deployment: https://www.prisma.io/docs/guides/deployment
