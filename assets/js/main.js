document.addEventListener('DOMContentLoaded', function () {
    // Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function () {
            navLinks.classList.toggle('active');
        });
    }

    // Set Active Link based on path
    const wPath = window.location.pathname;
    const navAnchors = document.querySelectorAll('.nav-links a');
    navAnchors.forEach(a => {
        if (a.getAttribute('href') === wPath.split('/').pop()) {
            a.classList.add('active');
        } else {
            a.classList.remove('active');
        }
    });

    // Content Overrides from Admin Panel
    const storedImages = JSON.parse(localStorage.getItem('dave_images'));
    if (storedImages) {
        storedImages.forEach(img => {
            if (img.selector) {
                const els = document.querySelectorAll(img.selector);
                els.forEach(el => {
                    if (img.type === 'bg') {
                        el.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('${img.url}')`;
                    } else {
                        el.src = img.url;
                    }
                });
            }
        });
    }
    // -- FEATURED PRODUCTS ON HOME --
    const featuredGrid = document.getElementById('featured-grid');
    if (featuredGrid) {
        const defaultProducts = [
            { id: 1, name: "Synth-X Motor Oil 5W-30", category: "Maintenance", condition: "New", price: 3500, image: "assets/images/product_oil_can.png" },
            { id: 2, name: "Ceramic Brake Pads (Front)", category: "Brakes", condition: "New", price: 4500, image: "assets/images/spare_parts_store.png" },
            { id: 3, name: "Toyota Oil Filter", category: "Maintenance", condition: "New", price: 1200, image: "assets/images/product_oil_can.png" },
            { id: 4, name: "Spark Plugs (Set of 4)", category: "Electrical", condition: "New", price: 2800, image: "assets/images/spare_parts_store.png" },
        ];

        let products = JSON.parse(localStorage.getItem('dave_products')) || defaultProducts;

        // Logic: Pick 4 items (mix of new/used if possible)
        const newItems = products.filter(p => (p.condition || 'New') === 'New').slice(0, 2);
        const usedItems = products.filter(p => p.condition === 'Used').slice(0, 2);
        let displayItems = [...newItems, ...usedItems];

        // If not enough used, fill with new
        if (displayItems.length < 4) {
            displayItems = products.slice(0, 4);
        }

        featuredGrid.innerHTML = '';
        displayItems.forEach(product => {
            const badgeColor = (product.condition === 'Used') ? '#ffc107' : '#28a745';
            const condition = product.condition || 'New';

            featuredGrid.innerHTML += `
                <div class="product-card" style="border: 1px solid #eee;">
                     <div style="position: absolute; top: 10px; right: 10px; background: ${badgeColor}; color: white; padding: 5px 10px; border-radius: 4px; font-size: 0.8rem; font-weight: bold;">
                        ${condition}
                    </div>
                    <img src="${product.image}" alt="${product.name}" class="product-img">
                    <div class="product-info">
                        <div class="product-category">${product.category}</div>
                        <div class="product-name">${product.name}</div>
                        <div class="product-price">KES ${product.price.toLocaleString()}</div>
                        <a href="store.html" class="add-to-cart" style="display:block; text-align:center; padding-top:10px; text-decoration:none;">View in Store</a>
                    </div>
                </div>
            `;
        });
    }
});
