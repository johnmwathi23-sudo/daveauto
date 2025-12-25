document.addEventListener('DOMContentLoaded', () => {

    // State Initialization
    const defaultImages = [
        { id: 'hero', name: "hero_mechanic.png", category: "Hero", url: "assets/images/hero_mechanic.png", selector: ".hero", type: "bg" },
        { id: 'about_team', name: "team_photo.png", category: "About Us", url: "assets/images/team_photo.png", selector: "img[alt='Dave Auto Team']", type: "img" },
        { id: 'diag', name: "service_diagnostics.png", category: "Services", url: "assets/images/service_diagnostics.png", selector: "img[alt='Car Diagnostics']", type: "img" },
        { id: 'parts', name: "spare_parts_store.png", category: "Store", url: "assets/images/spare_parts_store.png", selector: "img[alt='Spare Parts Store']", type: "img" },
        { id: 'hybrid', name: "hybrid_engine.png", category: "Services", url: "assets/images/hybrid_engine.png", selector: "img[alt='Hybrid & EV Services']", type: "img" },
        { id: 'engine', name: "hero_mechanic.png", category: "Services", url: "assets/images/hero_mechanic.png", selector: "img[alt='Engine & Transmission']", type: "img" },
        { id: 'maint', name: "hero_mechanic.png", category: "Services", url: "assets/images/hero_mechanic.png", selector: "img[alt='General Maintenance']", type: "img" },
        { id: 'suspension', name: "spare_parts_store.png", category: "Services", url: "assets/images/spare_parts_store.png", selector: "img[alt='Suspension']", type: "img" },
        { id: 'bodywork', name: "service_diagnostics.png", category: "Services", url: "assets/images/service_diagnostics.png", selector: "img[alt='Bodywork']", type: "img" }
    ];

    const defaultProducts = [
        { id: 1, name: "Synth-X Motor Oil 5W-30", category: "Maintenance", price: 3500, image: "assets/images/product_oil_can.png", condition: "New", stock: 15 },
        { id: 2, name: "Ceramic Brake Pads (Front)", category: "Brakes", price: 4500, image: "assets/images/spare_parts_store.png", condition: "New", stock: 8 },
        { id: 3, name: "Toyota Oil Filter", category: "Maintenance", price: 1200, image: "assets/images/product_oil_can.png", condition: "New", stock: 20 },
        { id: 4, name: "Spark Plugs (Set of 4)", category: "Electrical", price: 2800, image: "assets/images/spare_parts_store.png", condition: "New", stock: 12 },
        { id: 5, name: "Air Filter Generic", category: "Maintenance", price: 1500, image: "assets/images/spare_parts_store.png", condition: "New", stock: 18 },
        { id: 6, name: "KYB Shock Absorber (Rear)", category: "Suspension", price: 6500, image: "assets/images/spare_parts_store.png", condition: "New", stock: 4 }, // Low stock demo
        { id: 7, name: "Brake Fluid DOT4", category: "Brakes", price: 800, image: "assets/images/product_oil_can.png", condition: "New", stock: 30 },
        { id: 8, name: "Car Battery 60Ah", category: "Electrical", price: 8500, image: "assets/images/spare_parts_store.png", condition: "Used", stock: 3 } // Used & Low stock demo
    ];

    const state = {
        bookings: JSON.parse(localStorage.getItem('dave_bookings')) || [],
        orders: JSON.parse(localStorage.getItem('dave_orders')) || [],
        // Load saved images or use defaults
        images: JSON.parse(localStorage.getItem('dave_images')) || defaultImages,
        products: JSON.parse(localStorage.getItem('dave_products')) || defaultProducts,
        currentUser: "Admin"
    };

    // ... (Navigation Logic remains same) ...

    window.renderMediaManager = function (filter = 'All') {
        const contentArea = document.getElementById('mainContent');

        // Filter logic
        const filteredImages = filter === 'All' ? state.images : state.images.filter(img => img.category === filter || (filter === 'Garage Services' && img.category === 'Services'));

        // Buttons HTML
        const categories = ['All', 'Hero', 'Garage Services', 'Store', 'About Us'];
        const buttonsHtml = categories.map(cat =>
            `<button class="btn btn-sm ${filter === cat ? 'btn-primary' : 'bg-secondary'}" onclick="renderMediaManager('${cat}')" style="margin-right: 5px; opacity: ${filter === cat ? '1' : '0.7'};">${cat}</button>`
        ).join('');

        contentArea.innerHTML = `
            <div class="page-title">
                <h1>Media Manager</h1>
                <input type="file" id="mediaUpload" hidden accept="image/*">
                <!-- Standard upload button (adds new) -->
                <button class="btn btn-primary" onclick="triggerUpload()">Upload New Image</button>
            </div>

            <div style="margin-bottom: 20px; padding: 15px; background: white; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
                <strong style="margin-right: 10px;">Filter by Page: </strong>
                ${buttonsHtml}
            </div>

            <div class="upload-zone" style="margin-bottom: 2rem;" onclick="triggerUpload()">
                <p style="font-weight: 600; font-size: 1.1rem;">Click to Upload Image</p>
                <p style="color: #777;">Supports JPG, PNG, WEBP (Max 2MB stored locally)</p>
            </div>

            <div class="media-grid">
                ${filteredImages.map((img) => {
            const originalIndex = state.images.indexOf(img);
            return `
                    <div class="media-card">
                        <div class="media-preview">
                            <img src="${img.url}" alt="${img.name}">
                        </div>
                        <div class="media-info">
                            <div style="font-weight: 600; font-size: 0.9rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${img.name}</div>
                            <div style="color: #777; font-size: 0.8rem;">Category: ${img.category}</div>
                            <div style="display:flex; justify-content:space-between; margin-top: 10px;">
                                <button class="btn btn-sm btn-primary" onclick="triggerReplace(${originalIndex})">Replace</button>
                                <button class="btn btn-sm bg-danger" onclick="deleteImage(${originalIndex})">Delete</button>
                            </div>
                        </div>
                    </div>
                `}).join('')}
            </div>
        `;

        // Re-attach listener since innerHTML wiped it
        const input = document.getElementById('mediaUpload');
        if (input) {
            input.onchange = handleImageUpload;
        }
    };

    // -- IMAGE HANDLERS --

    let replaceIndex = -1; // -1 means new upload, >=0 means replace existing

    window.triggerUpload = function () {
        replaceIndex = -1;
        document.getElementById('mediaUpload').click();
    };

    window.triggerReplace = function (index) {
        replaceIndex = index;
        document.getElementById('mediaUpload').click();
    }

    window.handleImageUpload = function (e) {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 2 * 1024 * 1024) {
            alert("File is too large! Please choose an image under 2MB for local storage.");
            return;
        }

        const reader = new FileReader();
        reader.onload = function (event) {
            const resultUrl = event.target.result; // Base64 string

            if (replaceIndex >= 0) {
                // Replace existing
                state.images[replaceIndex].url = resultUrl;
                state.images[replaceIndex].name = file.name; // Update name too?
            } else {
                // Add new
                state.images.push({
                    id: 'new_' + Date.now(),
                    name: file.name,
                    category: "Uncategorized", // User could edit this in a real app
                    url: resultUrl,
                    selector: "", // User would map this manually
                    type: "img"
                });
            }

            // Save & Render
            localStorage.setItem('dave_images', JSON.stringify(state.images));
            renderMediaManager();
            alert("Image saved successfully!");
        };
        reader.readAsDataURL(file);
    };

    window.deleteImage = function (index) {
        if (confirm("Are you sure you want to delete this image?")) {
            state.images.splice(index, 1);
            localStorage.setItem('dave_images', JSON.stringify(state.images));
            renderMediaManager();
        }
    };

    // -- PRODUCTS HANDLER --
    let editingProductId = null;

    // Helper to read file as Base64
    const readFileAsBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
            reader.readAsDataURL(file);
        });
    };

    window.saveProduct = async function () {
        const name = document.getElementById('pName').value;
        const price = document.getElementById('pPrice').value;
        const stock = document.getElementById('pStock').value;
        const cat = document.getElementById('pCategory').value;
        const cond = document.getElementById('pCondition').value;
        const fileInput = document.getElementById('pImageUpload');

        if (!name || !price) {
            alert("Please fill in basic details.");
            return;
        }

        let imageUrl = document.getElementById('pPreview').src; // Default to current preview

        // If file selected, read it
        if (fileInput.files && fileInput.files[0]) {
            try {
                imageUrl = await readFileAsBase64(fileInput.files[0]);
            } catch (e) {
                alert("Error uploading image");
                return;
            }
        }

        const priceInt = parseInt(price);
        const stockInt = parseInt(stock) || 0;

        if (editingProductId) {
            // Update Existing
            const product = state.products.find(p => p.id === editingProductId);
            if (product) {
                product.name = name;
                product.category = cat;
                product.condition = cond;
                product.price = priceInt;
                product.stock = stockInt;
                product.image = imageUrl;
                alert("Product updated!");
            }
        } else {
            // Create New
            const newProd = {
                id: Date.now(),
                name: name,
                category: cat,
                condition: cond,
                price: priceInt,
                stock: stockInt,
                image: imageUrl
            };
            state.products.push(newProd);
            alert("Product added!");
        }

        localStorage.setItem('dave_products', JSON.stringify(state.products));
        closeProductModal();
        renderProductsManager();
    };

    window.editProduct = function (id) {
        editingProductId = id;
        const product = state.products.find(p => p.id === id);
        if (!product) return;

        openProductModal(true);

        // Populate fields
        document.getElementById('pName').value = product.name;
        document.getElementById('pPrice').value = product.price;
        document.getElementById('pStock').value = product.stock;
        document.getElementById('pCategory').value = product.category;
        document.getElementById('pCondition').value = product.condition || 'New';

        // Set Preview
        document.getElementById('pPreview').src = product.image;
        document.getElementById('pPreview').style.display = 'block';
    };

    window.openProductModal = function (isEdit = false) {
        const modal = document.getElementById('productFormModal');
        const title = document.getElementById('modalTitle');
        const btn = document.getElementById('modalBtn');

        // Reset if adding new
        if (!isEdit) {
            editingProductId = null;
            document.getElementById('pName').value = '';
            document.getElementById('pPrice').value = '';
            document.getElementById('pStock').value = '10';
            document.getElementById('pCategory').value = 'Maintenance';
            document.getElementById('pCondition').value = 'New';
            document.getElementById('pImageUpload').value = '';
            document.getElementById('pPreview').src = 'assets/images/spare_parts_store.png'; // Default placeholder
        }

        title.innerText = isEdit ? 'Edit Product' : 'Add New Product';
        btn.innerText = isEdit ? 'Update Product' : 'Save Product';
        modal.style.display = 'flex';
    };

    window.closeProductModal = function () {
        document.getElementById('productFormModal').style.display = 'none';
        editingProductId = null;
    };

    window.deleteProduct = function (id) {
        if (confirm("Delete this product?")) {
            state.products = state.products.filter(p => p.id !== id);
            localStorage.setItem('dave_products', JSON.stringify(state.products));
            renderProductsManager();
        }
    };

    window.updateStock = function (id, qty) {
        const product = state.products.find(p => p.id === id);
        if (product) {
            product.stock = parseInt(qty);
            localStorage.setItem('dave_products', JSON.stringify(state.products));
        }
    };

    function renderProductsManager() {
        const contentArea = document.getElementById('mainContent');

        contentArea.innerHTML = `
            <div class="page-title">
                <h1>Products Inventory</h1>
                <button class="btn btn-primary" onclick="openProductModal()">+ Add New Product</button>
            </div>

            <!-- Product Modal Overlay -->
            <div id="productFormModal" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.5); z-index:1000; align-items:center; justify-content:center;">
                <div style="background:white; padding:30px; border-radius:10px; width:500px; max-width:90%; position:relative; max-height:90vh; overflow-y:auto;">
                    <button onclick="closeProductModal()" style="position:absolute; top:15px; right:15px; background:none; border:none; font-size:1.5rem; cursor:pointer;">&times;</button>
                    
                    <h3 id="modalTitle" style="margin-bottom:20px;">Add Product</h3>
                    
                    <div style="display:flex; flex-direction:column; gap:15px;">
                        <div>
                            <label style="font-size:0.9rem; font-weight:600; margin-bottom:5px; display:block;">Product Name</label>
                            <input type="text" id="pName" placeholder="e.g. Brake Pads" style="width:100%; padding:10px; border:1px solid #ddd; border-radius:5px;">
                        </div>
                        
                        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:15px;">
                            <div>
                                <label style="font-size:0.9rem; font-weight:600; margin-bottom:5px; display:block;">Price (KES)</label>
                                <input type="number" id="pPrice" placeholder="0" style="width:100%; padding:10px; border:1px solid #ddd; border-radius:5px;">
                            </div>
                            <div>
                                <label style="font-size:0.9rem; font-weight:600; margin-bottom:5px; display:block;">Stock Qty</label>
                                <input type="number" id="pStock" placeholder="0" style="width:100%; padding:10px; border:1px solid #ddd; border-radius:5px;">
                            </div>
                        </div>

                        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:15px;">
                            <div>
                                <label style="font-size:0.9rem; font-weight:600; margin-bottom:5px; display:block;">Category</label>
                                <select id="pCategory" style="width:100%; padding:10px; border:1px solid #ddd; border-radius:5px;">
                                    <option value="Maintenance">Maintenance</option>
                                    <option value="Brakes">Brakes</option>
                                    <option value="Suspension">Suspension</option>
                                    <option value="Electrical">Electrical</option>
                                    <option value="Body & Paint">Body & Paint</option>
                                </select>
                            </div>
                            <div>
                                <label style="font-size:0.9rem; font-weight:600; margin-bottom:5px; display:block;">Condition</label>
                                <select id="pCondition" style="width:100%; padding:10px; border:1px solid #ddd; border-radius:5px;">
                                    <option value="New">New</option>
                                    <option value="Used">Used</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label style="font-size:0.9rem; font-weight:600; margin-bottom:5px; display:block;">Product Image</label>
                            <div style="display:flex; align-items:center; gap:15px;">
                                <img id="pPreview" src="assets/images/spare_parts_store.png" style="width:60px; height:60px; object-fit:cover; border-radius:5px; border:1px solid #ddd;">
                                <input type="file" id="pImageUpload" accept="image/*" style="font-size:0.9rem;">
                            </div>
                        </div>

                        <div style="margin-top:20px; display:flex; justify-content:flex-end; gap:10px;">
                            <button class="btn" onclick="closeProductModal()" style="background:#eee;">Cancel</button>
                            <button id="modalBtn" class="btn btn-primary" onclick="saveProduct()">Save Product</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Condition</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${state.products.map(p => {
            const stock = p.stock !== undefined ? p.stock : 10; // Default if missing
            const lowStock = stock < 5;
            return `
                            <tr>
                                <td><img src="${p.image}" style="width:40px; height:40px; object-fit:contain; border-radius:4px;"></td>
                                <td style="font-weight:600;">${p.name}</td>
                                <td><span class="badge bg-secondary">${p.category}</span></td>
                                <td><span class="badge" style="background:${p.condition === 'Used' ? '#ffc107' : '#28a745'}">${p.condition || 'New'}</span></td>
                                <td>KES ${p.price.toLocaleString()}</td>
                                <td>
                                    <input type="number" value="${stock}" min="0" 
                                        style="width: 80px; padding: 5px; border: 1px solid ${lowStock ? 'red' : '#ddd'}; border-radius: 4px; color: ${lowStock ? 'red' : 'black'}; font-weight: ${lowStock ? 'bold' : 'normal'};"
                                        onchange="updateStock(${p.id}, this.value)">
                                </td>
                                <td>
                                    <button class="btn btn-sm btn-primary" onclick="editProduct(${p.id})" style="margin-right:5px;">Edit</button>
                                    <button class="btn btn-sm bg-danger" onclick="deleteProduct(${p.id})">Delete</button>
                                </td>
                            </tr>
                        `}).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }


    // Navigation Logic
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.page-section'); // Assumes sections have class 'page-section' and IDs match nav data-target

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('data-target');
            if (!targetId) return; // Allow default behavior for external/logout links

            e.preventDefault();
            // Remove active class
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Hide all sections
            // Logic to switch view content would go here. 
            // For this single-file prototype, we might re-render the main content area.
            renderSection(targetId);
        });
    });

    // Initial Render
    renderDashboard();

    // -- RENDER FUNCTIONS --

    function renderSection(sectionId) {
        const contentArea = document.getElementById('mainContent');
        contentArea.innerHTML = ''; // Clear current

        switch (sectionId) {
            case 'dashboard':
                renderDashboard();
                break;
            case 'bookings':
                renderBookings();
                break;
            case 'orders':
                renderOrders();
                break;
            case 'media':
                renderMediaManager();
                break;
            case 'products': renderProductsManager(); break;
            default:
                contentArea.innerHTML = `<h2>${sectionId.charAt(0).toUpperCase() + sectionId.slice(1)}</h2><p>Module under construction.</p>`;
        }
    }

    function renderDashboard() {
        const contentArea = document.getElementById('mainContent');

        // Calculations
        const pendingBookings = state.bookings.filter(b => b.status === "Pending").length;
        const pendingOrders = state.orders.filter(o => o.status === "Pending").length;
        const totalRevenue = state.orders.filter(o => o.status === "Paid").reduce((sum, o) => sum + o.total, 0);

        // Low Stock Logic
        const lowStockItems = state.products.filter(p => (p.stock !== undefined ? p.stock : 10) <= 3);

        const lowStockHtml = lowStockItems.length > 0 ? `
            <div style="background: #fff3cd; border: 1px solid #ffeeba; color: #856404; padding: 15px; border-radius: 8px; margin-bottom: 2rem;">
                <h3 style="margin-top:0; font-size: 1.1rem; display: flex; align-items: center; gap: 10px;">
                    ⚠️ Low Stock Alert <span class="badge bg-danger" style="font-size: 0.8rem;">${lowStockItems.length} Items</span>
                </h3>
                <ul style="margin-bottom:0; padding-left: 20px;">
                    ${lowStockItems.map(p => `<li><strong>${p.name}</strong>: Only ${p.stock} left (${p.condition || 'New'})</li>`).join('')}
                </ul>
            </div>
        ` : '';

        // Simple Analytics Chart HTML
        const analyticsHtml = `
            <div class="card" style="margin-top: 2rem;">
                <h3>📊 Performance Analytics</h3>
                <div style="display: flex; gap: 40px; margin-top: 20px; flex-wrap: wrap;">
                    
                    <div style="flex: 1; min-width: 250px;">
                        <h4 style="font-size: 0.9rem; margin-bottom: 10px; color: #666;">Monthly Revenue Target</h4>
                        <div style="background: #eee; height: 20px; border-radius: 10px; overflow: hidden;">
                            <div style="background: var(--primary-color); width: 75%; height: 100%;"></div>
                        </div>
                        <div style="display: flex; justify-content: space-between; font-size: 0.8rem; margin-top: 5px;">
                            <span>Current: KES ${totalRevenue.toLocaleString()}</span>
                            <span>Target: KES 100k</span>
                        </div>
                    </div>

                    <div style="flex: 1; min-width: 250px;">
                        <h4 style="font-size: 0.9rem; margin-bottom: 10px; color: #666;">Inventory Composition</h4>
                        <div style="display: flex; height: 20px; border-radius: 10px; overflow: hidden;">
                            <div style="background: #28a745; width: 60%; height: 100%;" title="New Parts"></div>
                            <div style="background: #ffc107; width: 40%; height: 100%;" title="Used Parts"></div>
                        </div>
                        <div style="display: flex; justify-content: space-between; font-size: 0.8rem; margin-top: 5px;">
                            <span style="color:#28a745;">● New Parts</span>
                            <span style="color:#ffc107;">● Used Parts</span>
                        </div>
                    </div>

                </div>
            </div>
        `;

        contentArea.innerHTML = `
            <div class="page-title">
                <h1>Dashboard Overview</h1>
                <p>Welcome back, ${state.currentUser}</p>
            </div>

            ${lowStockHtml}

            <div class="kpi-grid">
                <div class="card kpi-card">
                    <h3>Today's Bookings</h3>
                    <div class="number">${pendingBookings}</div>
                    <div>Waitlist</div>
                </div>
                <div class="card kpi-card">
                    <h3>Pending Orders</h3>
                    <div class="number">${pendingOrders}</div>
                    <div style="color: #dc3545;">Needs Action</div>
                </div>
                <div class="card kpi-card">
                    <h3>Total Revenue</h3>
                    <div class="number">KES ${totalRevenue.toLocaleString()}</div>
                    <div style="color: #28a745;">+12% this week</div>
                </div>
                <div class="card kpi-card">
                    <h3>Stock Alerts</h3>
                    <div class="number" style="color: ${lowStockItems.length > 0 ? '#dc3545' : '#28a745'}">${lowStockItems.length}</div>
                    <div>Items Low</div>
                </div>
            </div>

            ${analyticsHtml}

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 2rem; margin-top: 2rem;">
                <div class="card">
                    <h3>Recent Bookings</h3>
                    ${state.bookings.length === 0 ? '<p>No bookings yet.</p>' : `
                        <table class="data-table" style="margin-top: 1rem;">
                            <thead><tr><th>Customer</th><th>Service</th><th>Status</th></tr></thead>
                            <tbody>
                                ${state.bookings.slice(-5).reverse().map(b => `
                                    <tr>
                                        <td>${b.name}</td>
                                        <td>${b.service}</td>
                                        <td><span class="badge ${getStatusBadge(b.status)}">${b.status}</span></td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    `}
                </div>
                <div class="card">
                    <h3>Recent Orders</h3>
                    ${state.orders.length === 0 ? '<p>No orders yet.</p>' : `
                        <table class="data-table" style="margin-top: 1rem;">
                            <thead><tr><th>Order ID</th><th>Total</th><th>Status</th></tr></thead>
                            <tbody>
                                ${state.orders.slice(-5).reverse().map(o => `
                                    <tr>
                                        <td>#${o.id.toString().slice(-4)}</td>
                                        <td>KES ${o.total.toLocaleString()}</td>
                                        <td><span class="badge ${getStatusBadge(o.status)}">${o.status}</span></td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    `}
                </div>
            </div>
        `;
    }

    function renderBookings() {
        const contentArea = document.getElementById('mainContent');
        contentArea.innerHTML = `
            <div class="page-title">
                <h1>Bookings Management</h1>
                <div class="header-actions">
                    <button class="btn btn-primary btn-sm">+ New Booking</button>
                    <button class="btn btn-sm" style="background:white; border:1px solid #ccc;">Export CSV</button>
                </div>
            </div>

            <div class="table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Customer</th>
                            <th>Vehicle</th>
                            <th>Service</th>
                            <th>Issue</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${state.bookings.map(b => `
                            <tr>
                                <td>${new Date(b.timestamp).toLocaleDateString()}</td>
                                <td>
                                    <div style="font-weight:600;">${b.name}</div>
                                    <div style="font-size:0.8rem; color:#777;">${b.phone}</div>
                                </td>
                                <td>${b.vehicle}</td>
                                <td>${b.service}</td>
                                <td style="max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${b.issue}</td>
                                <td><span class="badge ${getStatusBadge(b.status)}">${b.status || 'Pending'}</span></td>
                                <td>
                                    <button class="btn btn-sm btn-primary">Edit</button>
                                    <a href="https://wa.me/${b.phone}" target="_blank" class="btn btn-sm bg-success">WhatsApp</a>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }

    function renderOrders() {
        const contentArea = document.getElementById('mainContent');
        contentArea.innerHTML = `
             <div class="page-title">
                <h1>Orders & Payments</h1>
            </div>
            <div class="table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Date</th>
                            <th>Customer (Phone)</th>
                            <th>Total</th>
                            <th>Items</th>
                            <th>Payment Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${state.orders.map(o => `
                            <tr>
                                <td>#${o.id.toString().slice(-6)}</td>
                                <td>${new Date(o.timestamp).toLocaleDateString()}</td>
                                <td>${o.phone}</td>
                                <td style="font-weight:bold;">KES ${o.total.toLocaleString()}</td>
                                <td>${o.items.length} Items</td>
                                <td><span class="badge ${getStatusBadge(o.status)}">${o.status}</span></td>
                                <td>
                                    <button class="btn btn-sm btn-primary">View</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }



    // -- HELPER FUNCTIONS --
    function getStatusBadge(status) {
        if (!status) return 'bg-secondary';
        const s = status.toLowerCase();
        if (s.includes('pending')) return 'bg-warning';
        if (s.includes('paid') || s.includes('done') || s.includes('completed')) return 'bg-success';
        if (s.includes('fail') || s.includes('cancelled')) return 'bg-danger';
        return 'bg-info';
    }

    // Expose for inline onclicks
    window.clickNav = function (target) {
        const link = document.querySelector(`.nav-link[data-target="${target}"]`);
        if (link) link.click();
    };

});
