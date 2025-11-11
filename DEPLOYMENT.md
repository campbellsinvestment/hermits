# GitHub Pages Deployment Guide

## 🚀 How to Deploy the Canada Hall Hermits Website

This guide will help you publish your website to GitHub Pages for free hosting.

---

## Prerequisites

- GitHub account
- Git installed on your computer
- This repository cloned or downloaded

---

## Step 1: Push Code to GitHub

If you haven't already pushed the code to GitHub:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit your changes
git commit -m "Initial commit: Three design concepts for Canada Hall Hermits website"

# Add your GitHub repository as remote
git remote add origin https://github.com/campbellsinvestment/hermits.git

# Push to GitHub
git push -u origin main
```

---

## Step 2: Enable GitHub Pages

### Option A: Via GitHub Website

1. Go to your repository on GitHub: `https://github.com/campbellsinvestment/hermits`
2. Click on **Settings** (top right)
3. Scroll down to **Pages** (in the left sidebar)
4. Under **Source**, select:
   - **Branch**: `main`
   - **Folder**: `/ (root)`
5. Click **Save**
6. Wait a few minutes for deployment
7. Your site will be available at: `https://campbellsinvestment.github.io/hermits/`

### Option B: Via GitHub CLI

```bash
# If you have GitHub CLI installed
gh repo edit --enable-pages --pages-branch main --pages-path /
```

---

## Step 3: Update Configuration (if needed)

If your repository name is different from "hermits", update the base path:

**In `vite.config.js`:**
```javascript
export default defineConfig({
  base: '/your-repo-name/',  // Change this
  // ... rest of config
})
```

---

## Step 4: Access Your Site

Once deployed, your site will be available at:

- **Main index**: `https://campbellsinvestment.github.io/hermits/`
- **Concept 1**: `https://campbellsinvestment.github.io/hermits/designs/concept1-heritage.html`
- **Concept 2**: `https://campbellsinvestment.github.io/hermits/designs/concept2-modern.html`
- **Concept 3**: `https://campbellsinvestment.github.io/hermits/designs/concept3-storytelling.html`

---

## Step 5: Use a Custom Domain (Optional)

To use `hermitsfrontpage.com` or `hermits1963.com`:

### A. Configure DNS Settings

At your domain registrar (e.g., GoDaddy, Namecheap), add these DNS records:

**For apex domain (hermitsfrontpage.com):**
```
Type: A
Name: @
Value: 185.199.108.153
Value: 185.199.109.153
Value: 185.199.110.153
Value: 185.199.111.153
```

**For www subdomain:**
```
Type: CNAME
Name: www
Value: campbellsinvestment.github.io
```

### B. Add Custom Domain in GitHub

1. Go to repository **Settings** → **Pages**
2. Under **Custom domain**, enter: `hermitsfrontpage.com`
3. Click **Save**
4. Wait for DNS check (may take up to 24-48 hours)
5. Enable **Enforce HTTPS** once DNS is verified

---

## Step 6: Making Updates

After selecting a design and making changes:

```bash
# Make your changes to the files

# Stage changes
git add .

# Commit changes
git commit -m "Description of your changes"

# Push to GitHub
git push

# GitHub Pages will automatically rebuild (takes 1-5 minutes)
```

---

## Building for Production (Optional)

If you want to build optimized files:

```bash
# Install dependencies
npm install

# Build for production
npm run build

# The 'dist' folder contains optimized files
# You can deploy this folder instead of root
```

To deploy the `dist` folder:
1. In GitHub Settings → Pages
2. Change **Folder** to `/dist`
3. Rebuild: `npm run build && git add dist && git commit -m "Build" && git push`

---

## Troubleshooting

### Issue: 404 Error
- Ensure GitHub Pages is enabled in Settings
- Check that you're using the correct URL
- Wait a few minutes after pushing changes

### Issue: CSS/Images Not Loading
- Check the `base` path in `vite.config.js`
- Ensure all links use relative paths
- Clear browser cache

### Issue: Custom Domain Not Working
- DNS changes can take 24-48 hours
- Verify DNS records are correct
- Ensure CNAME file exists in repository root

### Issue: Changes Not Appearing
- GitHub Pages can take 1-5 minutes to rebuild
- Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- Check GitHub Actions tab for build status

---

## Quick Reference

| Action | Command |
|--------|---------|
| View locally | `npm run dev` |
| Build production | `npm run build` |
| Preview build | `npm run preview` |
| Add changes | `git add .` |
| Commit changes | `git commit -m "message"` |
| Push to GitHub | `git push` |

---

## Security Notes

- Never commit sensitive information (API keys, passwords)
- Use environment variables for sensitive data
- Keep dependencies updated
- Enable HTTPS in GitHub Pages settings

---

## Support

For issues with:
- **GitHub Pages**: [GitHub Pages Documentation](https://docs.github.com/en/pages)
- **Custom Domains**: [GitHub Custom Domain Guide](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
- **This Project**: Contact the development team

---

**Happy Deploying! 🚀**

*Canada Hall Hermits | Est. 1963*
