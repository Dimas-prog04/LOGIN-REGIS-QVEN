// Navigation Functions
function navigateTo(pageId) {
    // Hide all sections
    const sections = document.querySelectorAll('.page-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section
    const targetSection = document.getElementById(pageId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Update sidebar active state for top-level items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-page') === pageId) {
            item.classList.add('active');
        }
    });

    // Update active state for sub-items
    const subItems = document.querySelectorAll('.nav-sub-item');
    subItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-page') === pageId) {
            item.classList.add('active');
        }
    });

    // Detect if the current page is from a dropdown sub-menu
    const activeSubItem = document.querySelector('.nav-sub-item.active');
    const isDropdownPage = activeSubItem !== null;

    // Close dropdowns only when not navigating to a sub-menu page
    if (!isDropdownPage) {
        const dropdowns = document.querySelectorAll('.nav-dropdown');
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('show');
        });

        const arrows = document.querySelectorAll('.nav-arrow');
        arrows.forEach(arrow => {
            arrow.style.transform = 'rotate(0deg)';
        });
    }
}

function toggleSidebarDropdown(dropdownId, arrowId) {
    const dropdown = document.getElementById(dropdownId);
    const arrow = document.getElementById(arrowId);
    
    if (dropdown.classList.contains('show')) {
        dropdown.classList.remove('show');
        arrow.style.transform = 'rotate(0deg)';
    } else {
        // Close other dropdowns
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

// ============ MODAL FUNCTIONS (PASTIKAN INI ADA) ============

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('show');
        modal.style.display = 'flex'; // TAMBAHKAN INI
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
        modal.style.display = 'none'; // TAMBAHKAN INI
        document.body.style.overflow = 'auto';
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.classList.remove('show');
        event.target.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// View Modal Functions
function openViewModal(type, title) {
    const modal = document.getElementById('viewModal');
    const modalTitle = document.getElementById('viewTitle');
    const modalIcon = document.getElementById('viewIcon');
    const extraField = document.getElementById('extraField');
    
    modalTitle.textContent = title;
    
    // Set icon based on type
    const icons = {
        'admin': 'fa-user-shield',
        'karyawan': 'fa-user-tie',
        'tempat': 'fa-map-marker-alt'
    };
    
    modalIcon.innerHTML = `<i class="fas ${icons[type] || 'fa-user'}"></i>`;
    
    // Show/hide extra field based on type
    if (type === 'tempat') {
        extraField.style.display = 'none';
    } else {
        extraField.style.display = 'block';
    }
    
    openModal('viewModal');
}

function openViewVendor() {
    // Mengarahkan pengguna (redirect) ke halaman admin
    window.location.href = '../admin/admin.html';
}

function openViewAktivitas() {
    openModal('viewAktivitasModal');
}

function openViewAktivitasKotak() {
    openModal('viewAktivitasKotakModal');
}

function openViewKotak() {
    openModal('viewKotakModal');
}

function openViewBukti() {
    openModal('viewBuktiModal');
}

// Edit Modal Functions
function openEditModal(type) {
    const modal = document.getElementById('editModal');
    const modalTitle = document.getElementById('editTitle');
    const modalIcon = document.getElementById('editIcon');
    const extraField = document.getElementById('editExtraField');
    
    const titles = {
        'admin': 'Nama Admin',
        'karyawan': 'Nama Karyawan',
        'vendor': 'Nama Vendor',
        'calon': 'Nama Calon Penerima',
        'penerima': 'Nama Penerima',
        'tempat': 'Nama Tempat'
    };
    
    const icons = {
        'admin': 'fa-user-shield',
        'karyawan': 'fa-user-tie',
        'vendor': 'fa-store',
        'calon': 'fa-user-clock',
        'penerima': 'fa-user-check',
        'tempat': 'fa-map-marker-alt'
    };
    
    modalTitle.textContent = titles[type] || 'Edit Data';
    modalIcon.innerHTML = `<i class="fas ${icons[type] || 'fa-user'}"></i>`;
    
    // Adjust form based on type
    if (type === 'tempat') {
        extraField.innerHTML = `
            <label><span class="dot"></span> Alamat</label>
            <textarea class="form-input" rows="3">Jalan bla bla bla</textarea>
        `;
    } else {
        extraField.innerHTML = `
            <label><span class="dot"></span> Password Baru</label>
            <div class="password-field">
                <input type="password" class="form-input" value="halo123">
                <i class="fas fa-eye" onclick="togglePassword(this)"></i>
            </div>
        `;
    }
    
    openModal('editModal');
}

function saveEdit() {
    // Simulate save
    showNotification('Data berhasil diupdate!', 'success');
    closeModal('editModal');
}

// Delete Modal Functions
function openDeleteModal() {
    openModal('deleteModal');
}

function confirmDelete() {
    // Simulate delete
    showNotification('Data berhasil dihapus!', 'success');
    closeModal('deleteModal');
}

// Password Toggle
function togglePassword(element) {
    const input = element.previousElementSibling;
    const icon = element;
    
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

// Profile Functions
function enableEditProfil() {
    const inputs = document.querySelectorAll('#profileForm .form-input');
    inputs.forEach(input => {
        input.readOnly = false;
        input.style.background = '#fff';
    });
    
    showNotification('Mode edit diaktifkan', 'info');
}

function saveProfile() {
    const inputs = document.querySelectorAll('#profileForm .form-input');
    inputs.forEach(input => {
        input.readOnly = true;
        input.style.background = '#f5f6fa';
    });
    
    showNotification('Profil berhasil disimpan!', 'success');
}

// Save Data Functions
function saveData(modalId) {
    showNotification('Data berhasil disimpan!', 'success');
    closeModal(modalId);
}

// Dropdown Toggle for Modals
function toggleDropdown(contentId, arrowId) {
    const content = document.getElementById(contentId);
    const arrow = document.getElementById(arrowId);
    
    if (content.classList.contains('show')) {
        content.classList.remove('show');
        arrow.textContent = '▼';
    } else {
        content.classList.add('show');
        arrow.textContent = '▲';
    }
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Search Functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const activeSection = document.querySelector('.page-section.active');
            
            if (activeSection) {
                const tableRows = activeSection.querySelectorAll('.data-table tbody tr');
                tableRows.forEach(row => {
                    const text = row.textContent.toLowerCase();
                    row.style.display = text.includes(searchTerm) ? '' : 'none';
                });
            }
        });
    }
    
    // Initialize dashboard as active
    navigateTo('dashboard');
});

// Pagination Click Handlers
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('page-btn') && !e.target.querySelector('i')) {
        // Remove active from all page buttons in same pagination
        const pagination = e.target.closest('.pagination');
        if (pagination) {
            pagination.querySelectorAll('.page-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            e.target.classList.add('active');
        }
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // ESC to close modals
    if (e.key === 'Escape') {
        const openModal = document.querySelector('.modal.show');
        if (openModal) {
            openModal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    }
});
// Tambahkan di scriptsuperadmin.js
function openViewKotakModal() {
    openViewKotak();
}

function openViewBuktiModal() {
    openViewBukti();
}
// ============ KOTAK MBG MODERN FUNCTIONS ============

let selectedFile = null;

// Fungsi buka modal upload
function openUploadModal() {
    console.log('Opening upload modal...'); // Debug
    resetUploadModal();
    showUploadStep();
    
    const modal = document.getElementById('uploadAnalysisModal');
    if (modal) {
        modal.classList.add('show');
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    } else {
        console.error('Modal uploadAnalysisModal tidak ditemukan!');
    }
}

// Fungsi tutup modal upload
function closeUploadModal() {
    const modal = document.getElementById('uploadAnalysisModal');
    if (modal) {
        modal.classList.remove('show');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    setTimeout(() => {
        resetUploadModal();
    }, 300);
}

// Reset state modal
function resetUploadModal() {
    selectedFile = null;
    
    const fileInput = document.getElementById('modalFileInput');
    const menuInput = document.getElementById('menuNameInput');
    
    if (fileInput) fileInput.value = '';
    if (menuInput) menuInput.value = '';
    
    const uploadArea = document.getElementById('uploadAreaModal');
    if (uploadArea) {
        uploadArea.classList.remove('has-file');
        uploadArea.innerHTML = `
            <input type="file" id="modalFileInput" accept="image/*" hidden onchange="handleModalFileSelect(event)">
            <button style="display: inline-flex; align-items: center; gap: 8px; padding: 12px 25px; background: #FFA500; color: #fff; border: none; border-radius: 8px; font-size: 14px; cursor: pointer; margin-bottom: 10px;">
                <i class="fas fa-plus"></i>
                <span>Upload Gambar</span>
            </button>
            <p style="color: #999; font-size: 12px;">Klik atau drag gambar untuk upload disini</p>
        `;
    }
}

// Switch ke step upload
function showUploadStep() {
    const uploadStep = document.getElementById('uploadStep');
    const analyzingStep = document.getElementById('analyzingStep');
    const resultStep = document.getElementById('nutritionResultStep');
    
    if (uploadStep) uploadStep.style.display = 'block';
    if (analyzingStep) analyzingStep.style.display = 'none';
    if (resultStep) resultStep.style.display = 'none';
}

// Switch ke step analyzing
function showAnalyzingStep() {
    document.getElementById('uploadStep').style.display = 'none';
    document.getElementById('analyzingStep').style.display = 'block';
    document.getElementById('nutritionResultStep').style.display = 'none';
}

// Switch ke step hasil
function showNutritionResultStep() {
    document.getElementById('uploadStep').style.display = 'none';
    document.getElementById('analyzingStep').style.display = 'none';
    document.getElementById('nutritionResultStep').style.display = 'block';
}

// Handle file selection
function handleModalFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        selectedFile = file;
        
        const uploadArea = document.getElementById('uploadAreaModal');
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
                newInput.onchange = handleModalFileSelect;
                uploadArea.appendChild(newInput);
            }, 100);
        }
    }
}

// Start analysis process
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
    
    const analyzingImage = document.getElementById('analyzingImage');
    const resultImage = document.getElementById('resultImage');
    const resultMenuName = document.getElementById('resultMenuName');
    
    if (analyzingImage) {
        const imageUrl = URL.createObjectURL(selectedFile);
        analyzingImage.src = imageUrl;
    }
    
    showAnalyzingStep();
    
    // Simulate 3 seconds analysis
    setTimeout(() => {
        if (resultImage && resultMenuName) {
            const imageUrl = URL.createObjectURL(selectedFile);
            resultImage.src = imageUrl;
            resultMenuName.textContent = menuName;
        }
        showNutritionResultStep();
    }, 3000);
}

// Save nutrition info
function saveNutritionInfo() {
    showNotification('Informasi gizi berhasil disimpan!', 'success');
    closeUploadModal();
}

// Toggle dropdown detail
function toggleDropdown(dropdownId, arrowId) {
    const dropdown = document.getElementById(dropdownId);
    const arrow = document.getElementById(arrowId);
    
    if (!dropdown || !arrow) return;
    
    if (dropdown.style.display === 'none' || dropdown.style.display === '') {
        dropdown.style.display = 'block';
        arrow.style.transform = 'rotate(180deg)';
    } else {
        dropdown.style.display = 'none';
        arrow.style.transform = 'rotate(0deg)';
    }
}

// Setup drag and drop
function setupDragAndDrop() {
    const uploadArea = document.getElementById('uploadAreaModal');
    if (!uploadArea) return;
    
    uploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.style.backgroundColor = '#fff3e0';
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
            newInput.onchange = handleModalFileSelect;
            this.appendChild(newInput);
        }
    });
}

// Initialize when DOM ready
document.addEventListener('DOMContentLoaded', function() {
    setupDragAndDrop();
    
    // Debug: cek apakah modal ada
    const modal = document.getElementById('uploadAnalysisModal');
    console.log('Modal uploadAnalysisModal found:', !!modal);
});

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