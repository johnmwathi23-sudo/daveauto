# Dave Auto Solutions - Deployment Guide

## Important: Media Manager & Image Uploads

### Current Setup (localStorage)
The Media Manager currently saves uploaded images to your browser's `localStorage`. This means:
- ✅ Works perfectly on your local computer
- ❌ Images are NOT saved to GitHub
- ❌ Images will NOT appear on Vercel/production sites
- ❌ Each user has their own separate image storage

### How to Add Images for Production

#### Step 1: Save Images Locally
1. Place your images in: `c:/My Web Sites/dave/assets/images/`
2. Use descriptive filenames (e.g., `brake_pads_product.png`, `mechanic_at_work.jpg`)

#### Step 2: Commit to GitHub
```bash
cd "c:/My Web Sites/dave"
git add assets/images/*
git commit -m "Add production images"
git push origin main
```

#### Step 3: Verify on Vercel
- Vercel will automatically redeploy
- Your images will now be available at: `https://yourdomain.vercel.app/assets/images/yourimage.png`

### Recommended Workflow

**For Product Images:**
- Add images to `assets/images/` folder
- Update product entries in localStorage or directly in `admin.js` defaultProducts array
- Use the path: `assets/images/your-image.png`

**For Site Content (Hero, Services, etc.):**
- Images are already configured in `admin.js` lines 11-21
- Add new images to the folder and update the `defaultImages` array

### Future Enhancement Options

If you need dynamic user uploads in production, consider:
1. **Cloudinary** - Free tier: 25GB storage, easy API
2. **Vercel Blob** - Integrated with Vercel hosting
3. **Firebase Storage** - Free tier: 5GB
4. **ImgBB** - Free image hosting with API

---

## Current Production Images

The following images are included in your repository:
- `hero_mechanic.png` - Hero section background
- `team_photo.png` - About Us team photo
- `service_diagnostics.png` - Services section
- `spare_parts_store.png` - Store/products section
- `hybrid_engine.png` - Hybrid services
- `product_oil_can.png` - Product images

## Git Commands Quick Reference

```bash
# Check what files have changed
git status

# Add images
git add assets/images/*

# Commit changes
git commit -m "Your message here"

# Push to GitHub (triggers Vercel deploy)
git push origin main
```
