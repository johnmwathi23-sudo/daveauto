# Production Images Inventory

## Current Images in Repository
Location: `assets/images/`

| Filename | Size | Usage |
|----------|------|-------|
| hero_mechanic.png | 676 KB | Hero section background |
| team_photo.png | 855 KB | About Us section - team photo |
| service_diagnostics.png | 704 KB | Services - Car Diagnostics |
| spare_parts_store.png | 994 KB | General products/parts placeholder |
| hybrid_engine.png | 930 KB | Services - Hybrid & EV icon |
| product_oil_can.png | 423 KB | Product images - oils & fluids |

## How to Add New Images

### Step 1: Prepare Your Image
- Place file in: `c:/My Web Sites/dave/assets/images/`
- Use descriptive names (lowercase, underscores): `new_product_brake_pads.png`
- Recommended formats: PNG, JPG, WebP
- Optimize for web (keep under 1MB if possible)

### Step 2: Commit to Git
```bash
cd "c:/My Web Sites/dave"
git add assets/images/new_product_brake_pads.png
git commit -m "Add brake pads product image"
git push
```

### Step 3: Use in Your Code
Reference the image:
```javascript
// In products array
{ 
  id: 9, 
  name: "Brake Pads",
  image: "assets/images/new_product_brake_pads.png",
  ...
}
```

## Quick Deploy Script
Save this as `deploy-images.bat` for Windows:

```batch
@echo off
cd /d "c:\My Web Sites\dave"
git add assets/images/*
git status
set /p commit_msg="Enter commit message: "
git commit -m "%commit_msg%"
git push origin main
echo Done! Vercel will deploy in ~1 minute.
pause
```

Make executable and run whenever you add new images.
