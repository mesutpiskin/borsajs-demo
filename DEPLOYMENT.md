# Deployment Guide - GitHub Pages

## Quick Summary

✅ GitHub Actions workflow created  
✅ Vite config updated for GitHub Pages  
✅ Base path set to `/borsajs-demo/`  

## Steps to Deploy

### 1. Create GitHub Repository
```bash
# Repository name MUST be: borsajs-demo
# (matches the base path in vite.config.ts)
```

### 2. Push Code
```bash
git init
git add .
git commit -m "Initial commit: borsajs demo UI"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/borsajs-demo.git
git push -u origin main
```

### 3. Enable GitHub Pages
1. Go to repository Settings
2. Navigate to **Pages** (left sidebar)
3. Under "Source", select **"GitHub Actions"**
4. Workflow will automatically start

### 4. Access Your Site
- URL: `https://YOUR_USERNAME.github.io/borsajs-demo/`
- Auto-deploys on every push to `main` branch

## Troubleshooting

### Different Repository Name?
If you use a different repo name (e.g., `my-demo`):

1. Update `vite.config.ts`:
   ```typescript
   base: '/my-demo/',
   ```

2. Rebuild and push

### Build Fails?
- Check Node version (needs 18+)
- Verify all dependencies in package.json
- Check workflow logs in Actions tab

### 404 on Assets?
- Verify `base` path in vite.config.ts matches repo name
- Assets must be referenced relative to base path

## GitHub Actions Workflow

Location: `.github/workflows/deploy.yml`

**Triggers:**
- Push to `main` branch
- Manual trigger (workflow_dispatch)

**Process:**
1. Checkout code
2. Setup Node 18
3. Install dependencies
4. Build project (`npm run build`)
5. Upload `dist` folder
6. Deploy to GitHub Pages

**Permissions:**
- Read repository contents
- Write to GitHub Pages
- ID token for deployment

## Local Preview of Production Build

```bash
npm run build
npm run preview
```

Opens at `http://localhost:4173/borsajs-demo/`
