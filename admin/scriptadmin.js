// ============================================
// DETEKSI VENDOR ROLE DARI SUPER ADMIN
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Cek apakah user datang dari Super Admin sebagai Vendor
    const isVendorRole = localStorage.getItem('vendorRole');
    const vendorName = localStorage.getItem('selectedVendorName');

    if (isVendorRole === 'true') {
        setupVendorMode(vendorName);
    }

    // Initialize drag and drop for upload modal
    setupDragAndDrop();
});

function setupVendorMode(vendorName) {
    // 1. Ubah logo/title
    const logoElement = document.querySelector('.logo h2');
    if (logoElement) {
        logoElement.innerHTML = `Smart<span style="color:#FFA500;">MBG</span> <small style="color:#FFA500; font-size:12px;">| Vendor</small>`;
    }

    // 2. Tambahkan badge vendor di header
    const header = document.querySelector('.header');
    if (header && vendorName) {
        const existingBadge = header.querySelector('.vendor-badge-header');
        if (!existingBadge) {
            const vendorBadge = document.createElement('div');
            vendorBadge.className = 'vendor-badge-header';
            vendorBadge.innerHTML = `<i class="fas fa-store"></i> ${vendorName}`;
            header.insertBefore(vendorBadge, header.firstChild);
        }
    }

    // 3. Sembunyikan menu yang tidak perlu untuk vendor
    const menuToHide = ['menuAkun', 'landing'];
    menuToHide.forEach(menuId => {
        const menu = document.getElementById(menuId) || 
                     document.querySelector(`[data-page="${menuId}"]`);
        if (menu) {
            menu.style.display = 'none';
        }
    });

    // 4. Tambahkan menu khusus vendor
    addVendorMenus();
}

function addVendorMenus() {
    const navMenu = document.querySelector('.nav-menu ul');
    if (!navMenu) return;

    // Cek apakah sudah ada menu vendor
    if (document.getElementById('vendorMenuGroup')) return;

    // HTML menu vendor baru
    const vendorMenusHTML = `
        <li class="nav-item" data-page="menu-saya" onclick="navigateTo('menu-saya')" id="vendorMenuGroup">
            <i class="fas fa-utensils"></i>
            <span>Menu Saya</span>
        </li>
        <li class="nav-item" data-page="pesanan" onclick="navigateTo('pesanan')">
            <i class="fas fa-shopping-bag"></i>
            <span>Pesanan Masuk</span>
            <span class="count-badge">3</span>
        </li>
        <li class="nav-item" data-page="ulasan" onclick="navigateTo('ulasan')">
            <i class="fas fa-star"></i>
            <span>Ulasan</span>
        </li>
    `;

    // Insert setelah Dashboard
    const dashboardItem = document.querySelector('[data-page="dashboard"]');
    if (dashboardItem) {
        dashboardItem.insertAdjacentHTML('afterend', vendorMenusHTML);
    }

    // Ubah "Kotak MBG" jadi "Kotak Saya"
    const kotakItem = document.querySelector('[data-page="kotak"]');
    if (kotakItem) {
        const span = kotakItem.querySelector('span');
        if (span) span.textContent = 'Kotak Saya';
    }
}

// Fungsi untuk membuka/menutup dropdown sidebar
function toggleSidebarDropdown(dropdownId, arrowId) {
    const dropdown = document.getElementById(dropdownId);
    const arrow = document.getElementById(arrowId);

    if (dropdown.classList.contains('show')) {
        dropdown.classList.remove('show');
        arrow.style.transform = 'rotate(0deg)';
    } else {
        // Tutup semua dropdown lain jika ada
        document.querySelectorAll('.nav-dropdown').forEach(d => {
            d.classList.remove('show');
        });
        document.querySelectorAll('.nav-arrow').forEach(a => {
            a.style.transform = 'rotate(0deg)';
        });

        dropdown.classList.add('show');
        arrow.style.transform = 'rotate(180deg)';
    }
}

// Navigation menggunakan data-page (Logika ala SuperAdmin)
function navigateTo(pageId) {
    // 1. Hapus class 'active' dari semua menu navigasi di sidebar (termasuk sub-item)
    document.querySelectorAll('.nav-item, .nav-sub-item').forEach(item => {
        item.classList.remove('active');
    });

    // 2. Hapus class 'active' dari semua section konten
    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.remove('active');
    });

    // 3. Tambahkan class 'active' ke menu yang diklik berdasarkan atribut data-page
    const activeNav = document.querySelector(`[data-page="${pageId}"]`);
    if (activeNav) {
        activeNav.classList.add('active');
    }

    // 4. Tambahkan class 'active' ke section yang dituju berdasarkan ID-nya
    const activeSection = document.getElementById(pageId);
    if (activeSection) {
        activeSection.classList.add('active');
    }

    // 5. Load vendor-specific content if needed
    if (pageId === 'menu-saya') {
        loadVendorMenuSaya();
    } else if (pageId === 'pesanan') {
        loadVendorPesanan();
    } else if (pageId === 'ulasan') {
        loadVendorUlasan();
    }
}

// Modal Functions
function openViewModal(type) {
    const modal = document.getElementById('viewModal');
    const icon = document.getElementById('viewIcon');
    const subtitle = document.getElementById('viewSubtitle');
    const form = document.getElementById('viewForm');

    let content = '';

    switch(type) {
        case 'karyawan':
            icon.innerHTML = '<i class="fas fa-user-tie"></i>';
            subtitle.textContent = 'Nama Karyawan';
            content = `
                <div class="form-group">
                    <label>Nama</label>
                    <input type="text" value="Muhammad Iqbal" disabled>
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" value="iqbal@gmail.com" disabled>
                </div>
                <div class="form-group">
                    <label>NIK</label>
                    <input type="text" value="0099826628" disabled>
                </div>
                <div class="form-group">
                    <label>Alamat</label>
                    <input type="text" value="Jalan bla bla bla" disabled>
                </div>
            `;
            break;
        case 'calon-penerima':
            icon.innerHTML = '<i class="fas fa-users"></i>';
            subtitle.textContent = 'Nama';
            content = `
                <div class="form-group">
                    <label>Nama</label>
                    <input type="text" value="Muhammad Iqbal" disabled>
                </div>
                <div class="form-group">
                    <label>No</label>
                    <input type="text" value="01" disabled>
                </div>
                <div class="form-group">
                    <label>NIK</label>
                    <input type="text" value="0099826628" disabled>
                </div>
                <div class="form-group">
                    <label>Status</label>
                    <input type="text" value="On Review" disabled style="background-color: #FFE0B2; color: #FF9800;">
                </div>
            `;
            break;
        case 'penerima':
            icon.innerHTML = '<i class="fas fa-user-check"></i>';
            subtitle.textContent = 'Nama';
            content = `
                <div class="form-group">
                    <label>Nama</label>
                    <input type="text" value="Muhammad Iqbal" disabled>
                </div>
                <div class="form-group">
                    <label>No</label>
                    <input type="text" value="01" disabled>
                </div>
                <div class="form-group">
                    <label>NIK</label>
                    <input type="text" value="0099826628" disabled>
                </div>
                <div class="form-group">
                    <label>Status</label>
                    <input type="text" value="Verified" disabled style="background-color: #C8E6C9; color: #4CAF50;">
                </div>
            `;
            break;
        case 'tempat':
            icon.innerHTML = '<i class="fas fa-map-marker-alt"></i>';
            subtitle.textContent = 'Nama Tempat';
            content = `
                <div class="form-group">
                    <label>Nama</label>
                    <input type="text" value="Muhammad Iqbal" disabled>
                </div>
                <div class="form-group">
                    <label>Alamat</label>
                    <input type="text" value="Jalan bla bla bla" disabled>
                </div>
            `;
            break;
    }

    form.innerHTML = content;
    modal.classList.add('active');
}

function openEditModal(type) {
    const modal = document.getElementById('editModal');
    const icon = document.getElementById('editIcon');
    const subtitle = document.getElementById('editSubtitle');
    const form = document.getElementById('editForm');

    let content = '';

    switch(type) {
        case 'karyawan':
            subtitle.textContent = 'Nama Karyawan';
            content = `
                <div class="form-group">
                    <label>Nama</label>
                    <input type="text" value="Muhammad Iqbal">
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" value="iqbal@gmail.com">
                </div>
                <div class="form-group">
                    <label>NIK</label>
                    <input type="text" value="0099826628">
                </div>
                <div class="form-group">
                    <label>Alamat</label>
                    <input type="text" value="Jalan bla bla bla">
                </div>
            `;
            break;
        case 'calon-penerima':
            subtitle.textContent = 'Nama';
            content = `
                <div class="form-group">
                    <label>Nama</label>
                    <input type="text" value="Muhammad Iqbal">
                </div>
                <div class="form-group">
                    <label>No</label>
                    <input type="text" value="01">
                </div>
                <div class="form-group">
                    <label>NIK</label>
                    <input type="text" value="0099826628">
                </div>
                <div class="form-group">
                    <label>Status</label>
                    <input type="text" value="On Review" style="background-color: #FFE0B2; color: #FF9800;">
                </div>
            `;
            break;
        case 'penerima':
            subtitle.textContent = 'Nama';
            content = `
                <div class="form-group">
                    <label>Nama</label>
                    <input type="text" value="Muhammad Iqbal">
                </div>
                <div class="form-group">
                    <label>No</label>
                    <input type="text" value="01">
                </div>
                <div class="form-group">
                    <label>NIK</label>
                    <input type="text" value="0099826628">
                </div>
                <div class="form-group">
                    <label>Status</label>
                    <input type="text" value="Verified" style="background-color: #C8E6C9; color: #4CAF50;">
                </div>
            `;
            break;
        case 'tempat':
            subtitle.textContent = 'Nama Tempat';
            content = `
                <div class="form-group">
                    <label>Nama</label>
                    <input type="text" value="Muhammad Iqbal">
                </div>
                <div class="form-group">
                    <label>Alamat</label>
                    <input type="text" value="Jalan bla bla bla">
                </div>
            `;
            break;
    }

    form.innerHTML = content;
    modal.classList.add('active');
}

function openDeleteModal() {
    document.getElementById('deleteModal').classList.add('active');
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
    }
}

function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const icon = input.nextElementSibling;

    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// --- Fungsi Khusus Aktivitas ---
function openViewAktivitas() {
    document.getElementById('viewAktivitasModal').classList.add('active');
}

function openViewAktivitasKotak() {
    document.getElementById('viewAktivitasKotakModal').classList.add('active');
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target.classList.contains('modal-overlay')) {
        event.target.classList.remove('active');
    }
}

// ============================================
// KOTAK MBG FUNCTIONS - BLUE THEME
// ============================================

let selectedFile = null;

// Upload Modal Functions
function openUploadModal() {
    resetUploadModal();
    showUploadStep();
    const modal = document.getElementById('uploadAnalysisModal');
    if (modal) {
        modal.classList.add('active');
    }
    document.body.style.overflow = 'hidden';
}

function closeUploadModal() {
    const modal = document.getElementById('uploadAnalysisModal');
    if (modal) {
        modal.classList.remove('active');
    }
    document.body.style.overflow = 'auto';
    setTimeout(resetUploadModal, 300);
}

function resetUploadModal() {
    selectedFile = null;
    const fileInput = document.getElementById('modalFileInput');
    if (fileInput) fileInput.value = '';

    const menuInput = document.getElementById('menuNameInput');
    if (menuInput) menuInput.value = '';

    const uploadArea = document.getElementById('uploadArea');
    if (uploadArea) {
        uploadArea.classList.remove('has-file');
        uploadArea.innerHTML = `
            <input type="file" id="modalFileInput" accept="image/*" hidden onchange="handleFileSelect(event)">
            <button class="btn-upload-trigger blue" onclick="document.getElementById('modalFileInput').click()">
                <i class="fas fa-plus"></i>
                <span>Upload Gambar</span>
            </button>
            <p class="upload-hint">Klik atau drag gambar untuk upload disini</p>
        `;
    }
}

function showUploadStep() {
    const uploadStep = document.getElementById('uploadStep');
    const analyzingStep = document.getElementById('analyzingStep');
    const nutritionResultStep = document.getElementById('nutritionResultStep');

    if (uploadStep) uploadStep.style.display = 'block';
    if (analyzingStep) analyzingStep.style.display = 'none';
    if (nutritionResultStep) nutritionResultStep.style.display = 'none';
}

function showAnalyzingStep() {
    const uploadStep = document.getElementById('uploadStep');
    const analyzingStep = document.getElementById('analyzingStep');
    const nutritionResultStep = document.getElementById('nutritionResultStep');

    if (uploadStep) uploadStep.style.display = 'none';
    if (analyzingStep) analyzingStep.style.display = 'block';
    if (nutritionResultStep) nutritionResultStep.style.display = 'none';
}

function showNutritionResultStep() {
    const uploadStep = document.getElementById('uploadStep');
    const analyzingStep = document.getElementById('analyzingStep');
    const nutritionResultStep = document.getElementById('nutritionResultStep');

    if (uploadStep) uploadStep.style.display = 'none';
    if (analyzingStep) analyzingStep.style.display = 'none';
    if (nutritionResultStep) nutritionResultStep.style.display = 'block';
}

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        selectedFile = file;
        const uploadArea = document.getElementById('uploadArea');
        if (uploadArea) {
            uploadArea.classList.add('has-file');
            uploadArea.innerHTML = `
                <div class="file-selected-info" style="text-align: center;">
                    <i class="fas fa-check-circle" style="color: #4CAF50; font-size: 40px; margin-bottom: 10px;"></i>
                    <p style="color: #333; font-size: 14px; margin-bottom: 5px;">${file.name}</p>
                    <p style="color: #999; font-size: 12px;">Klik untuk ganti gambar</p>
                </div>
            `;

            // Re-attach file input
            setTimeout(() => {
                const newInput = document.createElement('input');
                newInput.type = 'file';
                newInput.id = 'modalFileInput';
                newInput.accept = 'image/*';
                newInput.hidden = true;
                newInput.onchange = handleFileSelect;
                uploadArea.appendChild(newInput);
                uploadArea.onclick = () => newInput.click();
            }, 100);
        }
    }
}

function startAnalysis() {
    const menuNameInput = document.getElementById('menuNameInput');
    const menuName = menuNameInput ? menuNameInput.value.trim() : '';

    if (!menuName) {
        alert('Silakan masukkan nama menu terlebih dahulu!');
        return;
    }

    if (!selectedFile) {
        alert('Silakan pilih gambar terlebih dahulu!');
        return;
    }

    const imageUrl = URL.createObjectURL(selectedFile);
    const analyzingImage = document.getElementById('analyzingImage');
    const resultImage = document.getElementById('resultImage');
    const resultMenuName = document.getElementById('resultMenuName');

    if (analyzingImage) analyzingImage.src = imageUrl;
    if (resultImage) resultImage.src = imageUrl;
    if (resultMenuName) resultMenuName.textContent = menuName;

    showAnalyzingStep();

    // Simulate 3 seconds analysis
    setTimeout(() => {
        showNutritionResultStep();
    }, 3000);
}

function saveNutritionInfo() {
    alert('Informasi gizi berhasil disimpan!');
    closeUploadModal();
}

// View Modal Functions
function openViewKotak() {
    const modal = document.getElementById('viewKotakModal');
    if (modal) {
        modal.classList.add('active');
    }
}

function openViewBukti() {
    const modal = document.getElementById('viewBuktiModal');
    if (modal) {
        modal.classList.add('active');
    }
}

// Toggle Dropdown untuk modal
function toggleDropdown(contentId, arrowId) {
    const content = document.getElementById(contentId);
    const arrow = document.getElementById(arrowId);

    if (!content || !arrow) return;

    if (content.style.display === 'none' || content.style.display === '') {
        content.style.display = 'block';
        if (arrow.tagName === 'I') {
            arrow.classList.remove('fa-chevron-down');
            arrow.classList.add('fa-chevron-up');
        } else {
            arrow.textContent = '▲';
        }
    } else {
        content.style.display = 'none';
        if (arrow.tagName === 'I') {
            arrow.classList.remove('fa-chevron-up');
            arrow.classList.add('fa-chevron-down');
        } else {
            arrow.textContent = '▼';
        }
    }
}

// Setup Drag and Drop
function setupDragAndDrop() {
    const uploadArea = document.getElementById('uploadArea');
    if (!uploadArea) return;

    uploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.style.backgroundColor = '#BBDEFB';
    });

    uploadArea.addEventListener('dragleave', function(e) {
        e.preventDefault();
        if (!this.classList.contains('has-file')) {
            this.style.backgroundColor = '';
        } else {
            this.style.backgroundColor = '#f1f8e9';
        }
    });

    uploadArea.addEventListener('drop', function(e) {
        e.preventDefault();

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            selectedFile = files[0];
            this.classList.add('has-file');
            this.innerHTML = `
                <div class="file-selected-info" style="text-align: center;">
                    <i class="fas fa-check-circle" style="color: #4CAF50; font-size: 40px; margin-bottom: 10px;"></i>
                    <p style="color: #333; font-size: 14px; margin-bottom: 5px;">${selectedFile.name}</p>
                    <p style="color: #999; font-size: 12px;">Klik untuk ganti gambar</p>
                </div>
            `;

            const newInput = document.createElement('input');
            newInput.type = 'file';
            newInput.id = 'modalFileInput';
            newInput.accept = 'image/*';
            newInput.hidden = true;
            newInput.onchange = handleFileSelect;
            this.appendChild(newInput);
            this.onclick = () => newInput.click();
        }
    });
}

// ============================================
// VENDOR SPECIFIC FUNCTIONS
// ============================================

function loadVendorMenuSaya() {
    const section = document.getElementById('menu-saya');
    if (!section || section.dataset.loaded) return;

    section.innerHTML = `
        <div class="section-header">
            <h1 class="page-title">Menu Saya</h1>
            <button class="btn-add" onclick="openTambahMenuVendor()">
                <i class="fas fa-plus"></i>
            </button>
        </div>

        <div class="menu-grid-vendor" id="vendorMenuGrid">
            <div class="menu-card-vendor">
                <div class="menu-status-badge aktif">Aktif</div>
                <img src="https://i.ibb.co/Ldqm9Xb/food-tray.jpg" alt="Nasi Padang" class="menu-image-vendor">
                <div class="menu-info-vendor">
                    <h4>Nasi Padang Spesial</h4>
                    <p class="menu-category-vendor">Makanan Utama</p>
                    <p class="menu-price-vendor">Rp 30.000</p>
                    <p class="menu-terjual"><i class="fas fa-shopping-bag"></i> 234 terjual</p>
                    <div class="menu-actions-vendor">
                        <button class="btn-edit-vendor" onclick="openEditModal('karyawan')">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-delete-vendor" onclick="openDeleteModal()">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>

            <div class="menu-card-vendor">
                <div class="menu-status-badge aktif">Aktif</div>
                <img src="https://i.ibb.co/Ldqm9Xb/food-tray.jpg" alt="Ayam Bakar" class="menu-image-vendor">
                <div class="menu-info-vendor">
                    <h4>Ayam Bakar Madu</h4>
                    <p class="menu-category-vendor">Makanan Utama</p>
                    <p class="menu-price-vendor">Rp 28.000</p>
                    <p class="menu-terjual"><i class="fas fa-shopping-bag"></i> 189 terjual</p>
                    <div class="menu-actions-vendor">
                        <button class="btn-edit-vendor" onclick="openEditModal('karyawan')">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-delete-vendor" onclick="openDeleteModal()">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>

            <div class="menu-card-vendor">
                <div class="menu-status-badge nonaktif">Nonaktif</div>
                <img src="https://i.ibb.co/Ldqm9Xb/food-tray.jpg" alt="Ikan Goreng" class="menu-image-vendor">
                <div class="menu-info-vendor">
                    <h4>Ikan Goreng Sambal</h4>
                    <p class="menu-category-vendor">Makanan Utama</p>
                    <p class="menu-price-vendor">Rp 25.000</p>
                    <p class="menu-terjual"><i class="fas fa-shopping-bag"></i> 156 terjual</p>
                    <div class="menu-actions-vendor">
                        <button class="btn-edit-vendor" onclick="openEditModal('karyawan')">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-delete-vendor" onclick="openDeleteModal()">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    section.dataset.loaded = 'true';
}

function loadVendorPesanan() {
    const section = document.getElementById('pesanan');
    if (!section || section.dataset.loaded) return;

    section.innerHTML = `
        <div class="section-header">
            <h1 class="page-title">Pesanan Masuk</h1>
        </div>

        <div class="table-container">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Sekolah</th>
                        <th>Menu</th>
                        <th>Jumlah</th>
                        <th>Tanggal</th>
                        <th>Status</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>01</td>
                        <td>SDN 012 Samarinda</td>
                        <td>Nasi Padang Spesial</td>
                        <td>250 porsi</td>
                        <td>2024-04-01</td>
                        <td><span class="status-badge warning">Diproses</span></td>
                        <td>
                            <button class="btn-view" onclick="showNotification('Pesanan diproses')">Proses</button>
                        </td>
                    </tr>
                    <tr>
                        <td>02</td>
                        <td>SDN 015 Balikpapan</td>
                        <td>Ayam Bakar Madu</td>
                        <td>180 porsi</td>
                        <td>2024-04-01</td>
                        <td><span class="status-badge success">Siap</span></td>
                        <td>
                            <button class="btn-view" onclick="showNotification('Pesanan dikirim')">Kirim</button>
                        </td>
                    </tr>
                    <tr>
                        <td>03</td>
                        <td>SDN 008 Bontang</td>
                        <td>Ikan Goreng Sambal</td>
                        <td>120 porsi</td>
                        <td>2024-03-31</td>
                        <td><span class="status-badge success">Selesai</span></td>
                        <td>
                            <button class="btn-view" onclick="showNotification('Detail pesanan')">Detail</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;

    section.dataset.loaded = 'true';
}

function loadVendorUlasan() {
    const section = document.getElementById('ulasan');
    if (!section || section.dataset.loaded) return;

    section.innerHTML = `
        <div class="section-header">
            <h1 class="page-title">Ulasan Pelanggan</h1>
        </div>

        <div class="reviews-summary-vendor">
            <div class="rating-big-vendor">
                <div class="rating-score-vendor">4.8</div>
                <div class="rating-stars-vendor">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star-half-alt"></i>
                </div>
                <p>324 ulasan</p>
            </div>
        </div>

        <div class="reviews-list-vendor">
            <div class="review-card-vendor">
                <div class="review-header-vendor">
                    <div class="reviewer-avatar-vendor">RK</div>
                    <div>
                        <h4>Rendi Kusnadi</h4>
                        <p>SDN 012 Samarinda</p>
                    </div>
                    <div class="review-rating-vendor">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                    </div>
                </div>
                <p class="review-content-vendor">Makanannya sangat enak dan porsinya pas. Anak-anak di sekolah suka sekali!</p>
                <span class="review-date-vendor">2 hari lalu</span>
            </div>

            <div class="review-card-vendor">
                <div class="review-header-vendor">
                    <div class="reviewer-avatar-vendor">IR</div>
                    <div>
                        <h4>Iqbal Rusdi</h4>
                        <p>SDN 015 Balikpapan</p>
                    </div>
                    <div class="review-rating-vendor">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="far fa-star"></i>
                    </div>
                </div>
                <p class="review-content-vendor">Overall bagus, tapi untuk sayur asemnya agak terlalu asin.</p>
                <span class="review-date-vendor">5 hari lalu</span>
            </div>
        </div>
    `;

    section.dataset.loaded = 'true';
}

function openTambahMenuVendor() {
    showNotification('Fitur tambah menu - gunakan modal edit yang ada');
}

function showNotification(message) {
    // Simple notification
    alert(message);
}

// Fungsi untuk memuat Radar Chart Statistik Gizi
function renderRadarGizi(canvasId) {
    const ctx = document.getElementById(canvasId);
    
    // Pastikan elemen canvas ada di DOM sebelum dirender
    if (!ctx) return;

    // Data statistik gizi (Format JSON)
    const dataGizi = {
        labels: ['Karbohidrat', 'Protein', 'Lemak', 'Vitamin', 'Mineral', 'Serat'],
        datasets: [{
            label: 'Kandungan Gizi MBG (%)',
            data: [85, 90, 45, 80, 75, 85],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            pointBackgroundColor: 'rgba(54, 162, 235, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 2
        }]
    };

    const configRadar = {
        type: 'radar',
        data: dataGizi,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: {
                        display: true
                    },
                    suggestedMin: 0,
                    suggestedMax: 100,
                    ticks: {
                        stepSize: 20
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        },
    };

    new Chart(ctx, configRadar);
}

// Panggil fungsi ini saat panel Bukti MBG dibuka/dimuat
document.addEventListener('DOMContentLoaded', () => {
    renderRadarGizi('radarGizi');
});