# Dave Auto Solutions

Professional automotive repair and spare parts shop based in Nairobi, Kenya.

## Features

- 🚗 Service booking system
- 🛒 Spare parts e-commerce
- 👨‍💼 Admin dashboard with role-based access
- 📊 Inventory management
- 📱 WhatsApp integration for orders
- 🔧 Technician task management

## Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Storage**: localStorage (client-side)
- **Deployment**: Vercel
- **Version Control**: Git/GitHub

## Project Structure

```
dave/
├── index.html              # Main landing page
├── admin.html              # Admin dashboard
├── assets/
│   ├── css/
│   │   ├── style.css      # Main site styles
│   │   └── admin.css      # Dashboard styles
│   ├── js/
│   │   ├── main.js        # Site functionality
│   │   └── admin.js       # Dashboard logic
│   └── images/            # All site images (committed to repo)
├── DEPLOYMENT_GUIDE.md    # How to deploy
└── IMAGES_GUIDE.md        # Image management guide

```

## Local Development

1. Open `index.html` in a web browser
2. Access admin dashboard at `admin.html`
3. Default credentials:
   - **Admin**: username: `admin`, password: `davepassword`
   - **Technician**: username: `tech1`, password: `123`

## Deployment

See `DEPLOYMENT_GUIDE.md` for complete instructions.

### Quick Deploy to Vercel

1. Push code to GitHub
2. Visit [vercel.com/new](https://vercel.com/new)
3. Import your repository
4. Click "Deploy"

## Image Management

All images must be committed to the repository in `assets/images/`.

Images uploaded via the Media Manager are stored in browser localStorage and will NOT appear in production.

See `IMAGES_GUIDE.md` for details.

## Contact

**Dave Auto Solutions**  
Nairobi, Kenya  
📱 WhatsApp: +254 712 345 678

---

Built with ❤️ for Kenya's automotive industry
