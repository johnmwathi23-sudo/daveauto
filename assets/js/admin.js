// -- TOGGLE SIDEBAR --
window.toggleSidebar = function () {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    sidebar.classList.toggle('active');
    if (overlay) overlay.classList.toggle('active');
};

document.addEventListener('DOMContentLoaded', () => {
    // --- STATE INITIALIZATION ---
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
        { id: 6, name: "KYB Shock Absorber (Rear)", category: "Suspension", price: 6500, image: "assets/images/spare_parts_store.png", condition: "New", stock: 4 },
        { id: 7, name: "Brake Fluid DOT4", category: "Brakes", price: 800, image: "assets/images/product_oil_can.png", condition: "New", stock: 30 },
        { id: 8, name: "Car Battery 60Ah", category: "Electrical", price: 8500, image: "assets/images/spare_parts_store.png", condition: "Used", stock: 3 }
    ];

    const defaultUsers = [
        { id: 1, name: "Dave (CEO)", username: "admin", password: "davepassword", role: "admin", designation: "Chief Executive Officer" },
        { id: 2, name: "John Doe", username: "tech1", password: "123", role: "technician", designation: "Senior Mechanic" }
    ];

    const state = {
        bookings: JSON.parse(localStorage.getItem('dave_bookings')) || [],
        orders: JSON.parse(localStorage.getItem('dave_orders')) || [],
        images: JSON.parse(localStorage.getItem('dave_images')) || defaultImages,
        products: JSON.parse(localStorage.getItem('dave_products')) || defaultProducts,
        users: JSON.parse(localStorage.getItem('dave_users')) || defaultUsers,
        reports: JSON.parse(localStorage.getItem('dave_reports')) || [],
        currentUser: null
    };

    // --- AUTHENTICATION ---
    function renderLogin() {
        document.body.innerHTML = `
            <div style="height:100vh; display:flex; align-items:center; justify-content:center; background: #f4f4f4; font-family:'Inter',sans-serif;">
                <div style="background:white; padding:40px; border-radius:10px; box-shadow:0 5px 20px rgba(0,0,0,0.1); width:400px; text-align:center;">
                    <h2 style="margin-bottom:20px; color:#333;">System Login</h2>
                    <input type="text" id="loginUser" placeholder="Username" style="width:100%; padding:12px; margin-bottom:15px; border:1px solid #ddd; border-radius:5px;">
                    <input type="password" id="loginPass" placeholder="Password" style="width:100%; padding:12px; margin-bottom:20px; border:1px solid #ddd; border-radius:5px;">
                    <button class="btn btn-primary" style="width:100%; padding:12px; background:#0A58CA; color:white; border:none; border-radius:5px; cursor:pointer;" onclick="attemptLogin()">Sign In</button>
                    <p style="margin-top:20px; font-size:0.9rem;"><a href="index.html" style="color:#666; text-decoration:none;">&larr; Back to Website</a></p>
                </div>
            </div>
        `;
    }

    const savedSession = JSON.parse(sessionStorage.getItem('dave_session'));
    if (!savedSession) {
        renderLogin();
    } else {
        state.currentUser = savedSession;
    }

    window.attemptLogin = function () {
        const u = document.getElementById('loginUser').value;
        const p = document.getElementById('loginPass').value;
        const user = state.users.find(user => user.username === u && user.password === p);
        if (user) {
            state.currentUser = user;
            sessionStorage.setItem('dave_session', JSON.stringify(user));
            location.reload();
        } else { alert("Invalid Credentials"); }
    };

    window.logout = function () {
        sessionStorage.removeItem('dave_session');
        location.reload();
    };

    if (!state.currentUser) return;

    // --- UI DASHBOARD SETUP ---
    const profileEl = document.querySelector('.admin-profile span');
    if (profileEl) profileEl.innerHTML = `<strong>${state.currentUser.name}</strong><br><small>${state.currentUser.designation}</small>`;

    const navMenu = document.querySelector('.nav-menu');
    navMenu.innerHTML = state.currentUser.role === 'admin' ? `
        <li class="nav-item"><a href="#" class="nav-link active" data-target="dashboard"><span>Dashboard Overview</span></a></li>
        <li class="nav-item"><a href="#" class="nav-link" data-target="bookings"><span>Bookings</span></a></li>
        <li class="nav-item"><a href="#" class="nav-link" data-target="orders"><span>Orders & Payments</span></a></li>
        <li class="nav-item"><a href="#" class="nav-link" data-target="products"><span>Products Inventory</span></a></li>
        <li class="nav-item"><a href="#" class="nav-link" data-target="media"><span>Media Manager</span></a></li>
        <li class="nav-item"><a href="#" class="nav-link" data-target="team"><span>Team Management</span></a></li>
        <li class="nav-item"><a href="#" class="nav-link" data-target="reports"><span>Service Reports</span></a></li>
    ` : `
        <li class="nav-item"><a href="#" class="nav-link active" data-target="mytasks"><span>My Tasks</span></a></li>
        <li class="nav-item"><a href="#" class="nav-link" data-target="filereport"><span>File Report</span></a></li>
    `;

    document.querySelectorAll('.nav-link[data-target]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            renderSection(link.getAttribute('data-target'));
        });
    });

    const logoutBtn = document.querySelector('.sidebar-footer a:last-child');
    if (logoutBtn) {
        logoutBtn.innerText = "Log Out";
        logoutBtn.onclick = (e) => { e.preventDefault(); logout(); };
    }

    // --- ROUTER ---
    function renderSection(sectionId) {
        const contentArea = document.getElementById('mainContent');
        if (!contentArea) return;
        contentArea.innerHTML = '';

        switch (sectionId) {
            case 'dashboard': renderDashboard(); break;
            case 'bookings': renderBookings(); break;
            case 'orders': renderOrders(); break;
            case 'media': renderMediaManager(); break;
            case 'products': renderProductsManager(); break;
            case 'team': renderTeamManager(); break;
            case 'reports': renderReportsViewer(); break;
            case 'mytasks': renderMyTasks(); break;
            case 'filereport': renderReportForm(); break;
            case 'media': renderMediaManager(); break;
            default: renderDashboard();
        }
    }

    // --- MODULES ---

    function renderDashboard() {
        const contentArea = document.getElementById('mainContent');
        const pendingB = state.bookings.filter(b => b.status === "Pending").length;
        const pendingO = state.orders.filter(o => o.status === "Pending").length;
        const revenue = state.orders.filter(o => o.status === "Paid").reduce((sum, o) => sum + o.total, 0);
        const lowStock = state.products.filter(p => (p.stock || 0) <= 3);

        contentArea.innerHTML = `
            <div class="page-title"><h1>Dashboard Overview</h1></div>
            ${lowStock.length > 0 ? `
                <div style="background:#fff3cd; border:1px solid #ffeeba; padding:15px; border-radius:8px; margin-bottom:20px; color:#856404;">
                    <strong>⚠️ Low Stock Alert:</strong> ${lowStock.map(p => p.name).join(', ')}
                </div>` : ''}
            <div class="kpi-grid">
                <div class="card"><div class="card-title">Pending Bookings</div><div class="card-value">${pendingB}</div></div>
                <div class="card"><div class="card-title">Pending Orders</div><div class="card-value">${pendingO}</div></div>
                <div class="card"><div class="card-title">Total Revenue</div><div class="card-value">KES ${revenue.toLocaleString()}</div></div>
                <div class="card"><div class="card-title">Team Reports</div><div class="card-value">${state.reports.length}</div></div>
            </div>
            <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap:20px; margin-top:20px;">
                <div class="card"><h3>Recent Bookings</h3><ul>${state.bookings.slice(-5).reverse().map(b => `<li>${b.name} - ${b.vehicle} (${b.status})</li>`).join('')}</ul></div>
                <div class="card"><h3>Recent Reports</h3><ul>${state.reports.slice(-5).reverse().map(r => `<li>${r.vehicle} by ${r.technician}</li>`).join('')}</ul></div>
            </div>
        `;
    }

    function renderBookings() {
        const contentArea = document.getElementById('mainContent');
        contentArea.innerHTML = `
            <div class="page-title"><h1>Bookings Management</h1></div>
            <div class="table-container">
            <table class="data-table">
                <thead><tr><th>Customer</th><th>Vehicle</th><th>Service</th><th>Assigned To</th><th>Status</th><th>Actions</th></tr></thead>
                <tbody>
                    ${state.bookings.map(b => {
            const techs = state.users.filter(u => u.role === 'technician');
            return `<tr>
                            <td>${b.name}<br><small>${b.phone}</small></td>
                            <td>${b.vehicle}</td>
                            <td>${b.service}</td>
                            <td>
                                <select onchange="window.assignBooking(${b.id}, this.value)" style="padding:5px; border-radius:4px; border:1px solid #ddd;">
                                    <option value="">-- Unassigned --</option>
                                    ${techs.map(t => `<option value="${t.name}" ${b.assignedTo === t.name ? 'selected' : ''}>${t.name}</option>`).join('')}
                                </select>
                            </td>
                            <td><span class="badge ${getStatusBadge(b.status)}">${b.status || 'Pending'}</span></td>
                            <td>
                                <button class="btn btn-sm btn-primary" onclick="window.completeBooking(${b.id})">Complete</button>
                                <a href="https://wa.me/${b.phone.replace(/\D/g, '')}" target="_blank" class="btn btn-sm bg-success">WhatsApp</a>
                            </td>
                        </tr>`;
        }).join('')}
                </tbody>
            </table>
            </div>
        `;
    }

    window.assignBooking = function (id, techName) {
        const b = state.bookings.find(b => b.id === id);
        if (b) {
            b.assignedTo = techName;
            b.status = techName ? "Assigned" : "Pending";
            localStorage.setItem('dave_bookings', JSON.stringify(state.bookings));
            renderBookings();
        }
    };

    window.completeBooking = function (id) {
        const b = state.bookings.find(b => b.id === id);
        if (b) {
            b.status = "Completed";
            localStorage.setItem('dave_bookings', JSON.stringify(state.bookings));
            renderBookings();
            alert("Booking marked as completed!");
        }
    };

    function renderOrders() {
        const contentArea = document.getElementById('mainContent');
        contentArea.innerHTML = `
            <div class="page-title"><h1>Orders & Payments</h1></div>
            <div class="table-container">
            <table class="data-table">
                <thead><tr><th>Order ID</th><th>Customer</th><th>Total</th><th>Status</th><th>Actions</th></tr></thead>
                <tbody>
                    ${state.orders.map(o => `<tr>
                        <td>#${o.id.toString().slice(-6)}</td>
                        <td>${o.name || 'Guest'}<br><small>${o.phone}</small></td>
                        <td>KES ${o.total.toLocaleString()}</td>
                        <td><span class="badge ${getStatusBadge(o.status)}">${o.status}</span></td>
                        <td><button class="btn btn-sm btn-primary" onclick="window.viewOrder(${o.id})">Details</button></td>
                    </tr>`).join('')}
                </tbody>
            </table>
            </div>
            
            <!-- Order Details Modal -->
            <div id="orderModal" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.5); z-index:2000; align-items:center; justify-content:center;">
                <div style="background:white; padding:30px; border-radius:10px; width:500px; max-width:90%; position:relative; max-height:90vh; overflow-y:auto;">
                    <button onclick="document.getElementById('orderModal').style.display='none'" style="position:absolute; top:10px; right:15px; border:none; background:none; font-size:1.5rem; cursor:pointer;">&times;</button>
                    <div id="orderModalContent"></div>
                </div>
            </div>
        `;
    }

    window.viewOrder = function (id) {
        const o = state.orders.find(o => o.id === id);
        if (!o) return;
        document.getElementById('orderModal').style.display = 'flex';
        document.getElementById('orderModalContent').innerHTML = `
            <h3>Order Details</h3>
            <p><strong>Ref:</strong> #${o.id}</p>
            <p><strong>Customer:</strong> ${o.name} (${o.phone})</p>
            <p><strong>Total:</strong> KES ${o.total.toLocaleString()}</p>
            <p><strong>Location:</strong> ${o.location || 'N/A'}</p>
            <hr>
            <h4>Items</h4>
            <ul>${o.items.map(i => `<li>${i.name} (x${i.quantity || 1}) - KES ${(i.price * (i.quantity || 1)).toLocaleString()}</li>`).join('')}</ul>
            <hr>
            <h4>Update Status</h4>
            <div style="display:flex; gap:10px;">
                <button class="btn btn-sm bg-success" onclick="window.updateOrderStatus(${o.id}, 'Paid')">Paid</button>
                <button class="btn btn-sm bg-info" onclick="window.updateOrderStatus(${o.id}, 'Shipped')">Shipped</button>
                <button class="btn btn-sm bg-secondary" onclick="window.updateOrderStatus(${o.id}, 'Completed')">Completed</button>
            </div>
        `;
    };

    window.updateOrderStatus = function (id, status) {
        const o = state.orders.find(o => o.id === id);
        if (o) {
            o.status = status;
            localStorage.setItem('dave_orders', JSON.stringify(state.orders));
            renderOrders();
            document.getElementById('orderModal').style.display = 'none';
        }
    };

    function renderTeamManager() {
        const contentArea = document.getElementById('mainContent');
        contentArea.innerHTML = `
            <div class="page-title"><h1>Team Management</h1><button class="btn btn-primary" onclick="window.promptAddUser()">+ Add Team Member</button></div>
            <div class="table-container">
            <table class="data-table">
                <thead><tr><th>Name</th><th>User</th><th>Role</th><th>Designation</th><th>Actions</th></tr></thead>
                <tbody>
                    ${state.users.map((u, i) => `<tr>
                        <td>${u.name}</td><td>${u.username}</td><td>${u.role}</td><td>${u.designation}</td>
                        <td>${u.username === 'admin' ? '' : `<button class="btn btn-sm bg-danger" onclick="window.deleteUser(${i})">Remove</button>`}</td>
                    </tr>`).join('')}
                </tbody>
            </table>
            </div>
        `;
    }

    window.promptAddUser = function () {
        const n = prompt("Full Name:");
        const u = prompt("Username:");
        const p = prompt("Password:");
        const r = prompt("Role (admin/technician):", "technician");
        const d = prompt("Designation:", "Mechanic");
        if (n && u && p) {
            state.users.push({ id: Date.now(), name: n, username: u, password: p, role: r, designation: d });
            localStorage.setItem('dave_users', JSON.stringify(state.users));
            renderTeamManager();
        }
    };

    window.deleteUser = function (i) {
        if (confirm("Delete this user?")) {
            state.users.splice(i, 1);
            localStorage.setItem('dave_users', JSON.stringify(state.users));
            renderTeamManager();
        }
    };

    function renderReportsViewer() {
        const contentArea = document.getElementById('mainContent');
        contentArea.innerHTML = `
            <div class="page-title"><h1>Service Reports</h1></div>
            <div style="display:grid; gap:20px;">
                ${state.reports.length === 0 ? '<p>No reports filed yet.</p>' : state.reports.slice().reverse().map(r => `
                    <div class="card">
                        <div style="display:flex; justify-content:space-between; border-bottom:1px solid #eee; padding-bottom:5px;">
                            <strong>${r.vehicle}</strong>
                            <span>${new Date(r.timestamp).toLocaleDateString()}</span>
                        </div>
                        <p style="margin-top:10px;">${r.workDone}</p>
                        <p><small>Tech: ${r.technician}</small> <span class="badge bg-info">${r.status}</span></p>
                    </div>
                `).join('')}
            </div>
        `;
    }

    function renderMyTasks() {
        const contentArea = document.getElementById('mainContent');
        const tasks = state.bookings.filter(b => b.assignedTo === state.currentUser.name && b.status !== 'Completed');
        contentArea.innerHTML = `
            <div class="page-title"><h1>My Tasks</h1></div>
            <div style="display:grid; gap:20px;">
                ${tasks.length === 0 ? '<p>No active tasks assigned to you.</p>' : tasks.map(t => `
                    <div class="card" style="border-left:5px solid var(--primary-color);">
                        <h3>${t.vehicle}</h3>
                        <p><strong>Service:</strong> ${t.service}</p>
                        <p><strong>Issue:</strong> ${t.issue}</p>
                        <button class="btn btn-primary" style="margin-top:10px;" onclick="window.renderReportForm('${t.vehicle}')">Start Report</button>
                    </div>
                `).join('')}
            </div>
        `;
    }

    window.renderReportForm = function (veh = '') {
        const contentArea = document.getElementById('mainContent');
        contentArea.innerHTML = `
            <div class="page-title"><h1>File Service Report</h1></div>
            <div class="card">
                <label>Vehicle</label>
                <input type="text" id="repVeh" value="${veh}" style="width:100%; padding:10px; margin-bottom:15px;">
                <label>Work Done & Parts Used</label>
                <textarea id="repWork" style="width:100%; height:150px; padding:10px; margin-bottom:15px;"></textarea>
                <label>Final Status</label>
                <select id="repStatus" style="width:100%; padding:10px; margin-bottom:15px;">
                    <option>Completed</option><option>Pending Parts</option><option>Observation</option>
                </select>
                <button class="btn btn-primary" onclick="window.submitReport()">Submit Report</button>
            </div>
        `;
    };

    window.submitReport = function () {
        const v = document.getElementById('repVeh').value;
        const w = document.getElementById('repWork').value;
        const s = document.getElementById('repStatus').value;
        if (v && w) {
            state.reports.push({ id: Date.now(), technician: state.currentUser.name, vehicle: v, workDone: w, status: s, timestamp: new Date().toISOString() });
            localStorage.setItem('dave_reports', JSON.stringify(state.reports));
            alert("Report saved!");
            renderMyTasks();
        }
    };

    function renderProductsManager() {
        const contentArea = document.getElementById('mainContent');
        contentArea.innerHTML = `
            <div class="page-title"><h1>Inventory</h1><button class="btn btn-primary" onclick="window.openProductModal()">+ Add Product</button></div>
            <div class="table-container">
            <table class="data-table">
                <thead><tr><th>Image</th><th>Name</th><th>Price</th><th>Stock</th><th>Action</th></tr></thead>
                <tbody>
                    ${state.products.map(p => `<tr>
                        <td><img src="${p.image}" style="width:40px;"></td>
                        <td>${p.name}</td>
                        <td>KES ${p.price.toLocaleString()}</td>
                        <td><input type="number" value="${p.stock}" onchange="window.updateStock(${p.id}, this.value)" style="width:60px;"></td>
                        <td><button class="btn btn-sm btn-primary" onclick="window.editProduct(${p.id})">Edit</button></td>
                    </tr>`).join('')}
                </tbody>
            </table>
            </div>

            <!-- Product Modal -->
            <div id="productFormModal" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.5); z-index:2000; align-items:center; justify-content:center;">
                <div style="background:white; padding:30px; border-radius:10px; width:400px; position:relative;">
                    <button onclick="window.closeProductModal()" style="position:absolute; top:10px; right:15px; border:none; background:none; font-size:1.5rem; cursor:pointer;">&times;</button>
                    <h3 id="modalTitle">Product</h3>
                    <input type="text" id="pName" placeholder="Name" style="width:100%; margin:10px 0; padding:8px;">
                    <input type="number" id="pPrice" placeholder="Price" style="width:100%; margin:10px 0; padding:8px;">
                    <input type="number" id="pStock" placeholder="Stock" style="width:100%; margin:10px 0; padding:8px;">
                    <select id="pCategory" style="width:100%; margin:10px 0; padding:8px;">
                        <option>Maintenance</option><option>Brakes</option><option>Suspension</option><option>Electrical</option>
                    </select>
                    <button class="btn btn-primary" onclick="window.saveProduct()">Save</button>
                </div>
            </div>
        `;
    }

    let editingP = null;
    window.openProductModal = function (edit = false) {
        document.getElementById('productFormModal').style.display = 'flex';
        if (!edit) {
            editingP = null;
            document.getElementById('pName').value = '';
            document.getElementById('pPrice').value = '';
            document.getElementById('pStock').value = '';
            document.getElementById('modalTitle').innerText = "Add Product";
        }
    };
    window.closeProductModal = function () { document.getElementById('productFormModal').style.display = 'none'; };

    window.editProduct = function (id) {
        editingP = id;
        const p = state.products.find(x => x.id === id);
        if (!p) return;
        window.openProductModal(true);
        document.getElementById('pName').value = p.name;
        document.getElementById('pPrice').value = p.price;
        document.getElementById('pStock').value = p.stock;
        document.getElementById('modalTitle').innerText = "Edit Product";
    };

    window.saveProduct = function () {
        const n = document.getElementById('pName').value;
        const pr = parseInt(document.getElementById('pPrice').value);
        const s = parseInt(document.getElementById('pStock').value);
        const c = document.getElementById('pCategory').value;
        if (editingP) {
            const p = state.products.find(x => x.id === editingP);
            p.name = n; p.price = pr; p.stock = s; p.category = c;
        } else {
            state.products.push({ id: Date.now(), name: n, price: pr, stock: s, category: c, image: 'assets/images/spare_parts_store.png' });
        }
        localStorage.setItem('dave_products', JSON.stringify(state.products));
        window.closeProductModal();
        renderProductsManager();
    };

    window.updateStock = function (id, q) {
        const p = state.products.find(x => x.id === id);
        if (p) { p.stock = parseInt(q); localStorage.setItem('dave_products', JSON.stringify(state.products)); }
    };

    function renderMediaManager() {
        const contentArea = document.getElementById('mainContent');
        contentArea.innerHTML = `
            <div class="page-title">
                <h1>Media Manager</h1>
                <input type="file" id="mediaUpload" style="display:none;" onchange="window.handleMedia(event)">
                <button class="btn btn-primary" onclick="document.getElementById('mediaUpload').click()">📤 Upload Image (Local Only)</button>
            </div>
            
            <div style="background:#fff3cd; border:1px solid #ffeeba; padding:15px; border-radius:8px; margin-bottom:20px; color:#856404;">
                <h3 style="margin-top:0; font-size:1rem;">⚠️ Production Deployment Note</h3>
                <p style="margin:5px 0;">Images uploaded here are saved to <strong>browser localStorage</strong> and will <strong>NOT</strong> appear on Vercel/GitHub Pages.</p>
                <p style="margin:5px 0;"><strong>To add images for production:</strong></p>
                <ol style="margin:5px 0 5px 20px; padding:0;">
                    <li>Save images to: <code>assets/images/</code> folder</li>
                    <li>Run: <code>git add assets/images/* && git commit -m "Add images" && git push</code></li>
                    <li>Vercel will auto-deploy with your new images</li>
                </ol>
                <small>See <code>DEPLOYMENT_GUIDE.md</code> for details.</small>
            </div>

            <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap:15px; margin-top:20px;">
                ${state.images.map((img, i) => `
                    <div class="card" style="padding:10px; text-align:center;">
                        <img src="${img.url}" style="width:100%; height:100px; object-fit:cover; border-radius:5px;" onerror="this.src='assets/images/spare_parts_store.png'">
                        <p style="font-size:0.7rem; margin:5px 0;">${img.name}</p>
                        <button class="btn btn-xs bg-danger" onclick="window.deleteImage(${i})">Delete</button>
                    </div>
                `).join('')}
            </div>
        `;
    }

    window.handleMedia = function (e) {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            state.images.push({ id: Date.now(), name: file.name, url: ev.target.result });
            localStorage.setItem('dave_images', JSON.stringify(state.images));
            renderMediaManager();
        };
        reader.readAsDataURL(file);
    };

    window.deleteImage = function (i) {
        if (confirm("Delete this image?")) {
            state.images.splice(i, 1);
            localStorage.setItem('dave_images', JSON.stringify(state.images));
            renderMediaManager();
        }
    };

    function getStatusBadge(s) {
        if (!s) return 'bg-secondary';
        const status = s.toLowerCase();
        if (status.includes('pend')) return 'bg-warning';
        if (status.includes('paid') || status.includes('done') || status.includes('comp')) return 'bg-success';
        if (status.includes('fail')) return 'bg-danger';
        if (status.includes('ship') || status.includes('assign')) return 'bg-info';
        return 'bg-secondary';
    }

    // --- INITIALIZATION ---
    renderSection(state.currentUser.role === 'admin' ? 'dashboard' : 'mytasks');

});
