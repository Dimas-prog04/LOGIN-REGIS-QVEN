// Navigation
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Remove active class from all nav items
        document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
        
        // Add active class to clicked nav item
        this.classList.add('active');
        
        // Get page name
        const pageName = this.getAttribute('data-page');
        
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
        
        // Show selected page
        if (pageName === 'dashboard') {
            document.getElementById('dashboard-page').classList.add('active');
        } else if (pageName === 'kotak-mbg') {
            document.getElementById('kotak-mbg-page').classList.add('active');
        } else if (pageName === 'profil') {
            document.getElementById('profil-page').classList.add('active');
        } else if (pageName === 'landing') {
            document.getElementById('landing-page').classList.add('active');
        }
    });
});

// Modal Functions
function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

function openViewBuktiModal() {
    openModal('viewBuktiModal');
}

function openViewKotakModal() {
    openModal('viewKotakModal');
}

function openDeleteModal() {
    openModal('deleteModal');
}

function confirmDelete() {
    closeModal('deleteModal');
    setTimeout(() => {
        openModal('processingModal');
    }, 300);
}

// ============ UPLOAD & ANALYSIS MODAL ============

let selectedFile = null;

function openUploadModal() {
    // Reset modal state
    resetUploadModal();
    // Show upload step
    showUploadStep();
    // Open modal
    openModal('uploadAnalysisModal');
}

function closeUploadModal() {
    closeModal('uploadAnalysisModal');
    // Reset after closing
    setTimeout(() => {
        resetUploadModal();
    }, 300);
}

function resetUploadModal() {
    // Reset file
    selectedFile = null;
    document.getElementById('modalFileInput').value = '';
    document.getElementById('menuNameInput').value = '';
    
    // Reset upload area
    const uploadArea = document.getElementById('uploadAreaModal');
    uploadArea.classList.remove('has-file');
    uploadArea.innerHTML = `
        <input type="file" id="modalFileInput" accept="image/*" hidden onchange="handleModalFileSelect(event)">
        <button class="btn-upload-modal">
            <i class="fas fa-plus"></i>
            <span>Upload Gambar</span>
        </button>
        <p class="upload-hint-modal">Klik atau drag gambar untuk upload disini</p>
    `;
}

function showUploadStep() {
    document.getElementById('uploadStep').style.display = 'block';
    document.getElementById('analyzingStep').style.display = 'none';
    document.getElementById('nutritionResultStep').style.display = 'none';
}

function showAnalyzingStep() {
    document.getElementById('uploadStep').style.display = 'none';
    document.getElementById('analyzingStep').style.display = 'block';
    document.getElementById('nutritionResultStep').style.display = 'none';
}

function showNutritionResultStep() {
    document.getElementById('uploadStep').style.display = 'none';
    document.getElementById('analyzingStep').style.display = 'none';
    document.getElementById('nutritionResultStep').style.display = 'block';
}

function handleModalFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        selectedFile = file;
        
        // Update upload area to show selected file
        const uploadArea = document.getElementById('uploadAreaModal');
        uploadArea.classList.add('has-file');
        uploadArea.innerHTML = `
            <div class="file-selected-info">
                <i class="fas fa-check-circle"></i>
                <p class="filename">${file.name}</p>
                <p class="hint">Klik untuk ganti gambar</p>
            </div>
        `;
        
        // Re-attach the file input
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

function startAnalysis() {
    const menuName = document.getElementById('menuNameInput').value.trim();
    
    if (!menuName) {
        alert('Silakan masukkan nama menu terlebih dahulu!');
        return;
    }
    
    if (!selectedFile) {
        alert('Silakan pilih gambar terlebih dahulu!');
        return;
    }
    
    // Show image in analyzing step
    const imageUrl = URL.createObjectURL(selectedFile);
    document.getElementById('analyzingImage').src = imageUrl;
    
    // Show analyzing step
    showAnalyzingStep();
    
    // Simulate analysis process (3 seconds)
    setTimeout(() => {
        // Show result
        document.getElementById('resultImage').src = imageUrl;
        document.getElementById('resultMenuName').textContent = menuName;
        showNutritionResultStep();
    }, 3000);
}

function saveNutritionInfo() {
    alert('Informasi gizi berhasil disimpan!');
    closeUploadModal();
}

// Drag and drop for upload area in modal
document.addEventListener('DOMContentLoaded', function() {
    const uploadAreaModal = document.getElementById('uploadAreaModal');
    
    if (uploadAreaModal) {
        uploadAreaModal.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.style.backgroundColor = '#e3f2fd';
        });
        
        uploadAreaModal.addEventListener('dragleave', function(e) {
            e.preventDefault();
            if (!this.classList.contains('has-file')) {
                this.style.backgroundColor = '';
            } else {
                this.style.backgroundColor = '#f1f8e9';
            }
        });
        
        uploadAreaModal.addEventListener('drop', function(e) {
            e.preventDefault();
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                selectedFile = files[0];
                
                // Update UI
                this.classList.add('has-file');
                this.innerHTML = `
                    <div class="file-selected-info">
                        <i class="fas fa-check-circle"></i>
                        <p class="filename">${selectedFile.name}</p>
                        <p class="hint">Klik untuk ganti gambar</p>
                    </div>
                `;
                
                // Re-attach the file input
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
});

// Profile Functions
let editMode = false;

function toggleEditMode() {
    editMode = !editMode;
    const inputs = document.querySelectorAll('#profil-page input');
    const btnEdit = document.querySelector('.btn-edit');
    
    inputs.forEach(input => {
        input.readOnly = !editMode;
        if (editMode) {
            input.style.backgroundColor = '#fff';
            input.style.borderColor = '#2196F3';
        } else {
            input.style.backgroundColor = '#f5f5f5';
            input.style.borderColor = '#e0e0e0';
        }
    });
    
    if (editMode) {
        btnEdit.style.backgroundColor = '#4CAF50';
    } else {
        btnEdit.style.backgroundColor = '#FF9800';
    }
}

function saveProfile() {
    if (editMode) {
        toggleEditMode();
    }
    alert('Profil berhasil disimpan!');
}

// Password visibility toggle
document.querySelectorAll('.password-field i').forEach(icon => {
    icon.addEventListener('click', function() {
        const input = this.previousElementSibling;
        if (input.type === 'password') {
            input.type = 'text';
            this.classList.remove('fa-eye');
            this.classList.add('fa-eye-slash');
        } else {
            input.type = 'password';
            this.classList.remove('fa-eye-slash');
            this.classList.add('fa-eye');
        }
    });
});

// Search functionality
document.getElementById('searchInput').addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const currentPage = document.querySelector('.page.active');
    
    if (currentPage.id === 'kotak-mbg-page') {
        const rows = currentPage.querySelectorAll('.data-table tbody tr');
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(searchTerm) ? '' : 'none';
        });
    }
});

// Pagination
function setupPagination() {
    document.querySelectorAll('.pagination').forEach(pagination => {
        const buttons = pagination.querySelectorAll('.page-btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', function() {
                if (!this.querySelector('i')) {
                    pagination.querySelectorAll('.page-btn').forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                }
            });
        });
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    setupPagination();
});

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal-overlay')) {
        e.target.classList.remove('active');
        // Reset upload modal if closed
        if (e.target.id === 'uploadAnalysisModal') {
            setTimeout(() => {
                resetUploadModal();
            }, 300);
        }
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay').forEach(modal => {
            modal.classList.remove('active');
        });
        // Reset upload modal
        setTimeout(() => {
            resetUploadModal();
        }, 300);
    }
});
// Fungsi untuk Toggle Buka/Tutup Dropdown Detail Kotak
function toggleDropdown(dropdownId, arrowId) {
    const dropdown = document.getElementById(dropdownId);
    const arrow = document.getElementById(arrowId);
    
    if (dropdown.style.display === 'none' || dropdown.style.display === '') {
        dropdown.style.display = 'block';
        // Putar panah ke atas
        arrow.style.transform = 'rotate(180deg)';
    } else {
        dropdown.style.display = 'none';
        // Kembalikan panah ke bawah
        arrow.style.transform = 'rotate(0deg)';
    }
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