// Navigation Function
function navigateTo(page) {
    // Hide all sections
    const sections = document.querySelectorAll('.page-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section
    document.getElementById(page).classList.add('active');
    
    // Update sidebar active state
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.classList.remove('active');
    });
    
    // Find the clicked nav item and activate it
    event.currentTarget.classList.add('active');
    
    // Update search placeholder based on page
    const searchInput = document.getElementById('searchInput');
    if (page === 'dashboard') {
        searchInput.placeholder = 'Cari data Deskripsi Kotak MBG';
    } else if (page === 'kotak') {
        searchInput.placeholder = 'Cari data Deskripsi Kotak MBG';
    } else if (page === 'profil') {
        searchInput.placeholder = 'Cari data Profil...';
    }
}

// Modal Functions
function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Reset accordion when opening view modal
    if (modalId === 'viewModal') {
        const accordion = document.getElementById('detailAccordion');
        const icon = document.getElementById('accordionIcon');
        if (accordion.classList.contains('active')) {
            accordion.classList.remove('active');
            icon.classList.remove('active');
        }
    }
}

function openViewModal() {
    openModal('viewModal');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Accordion Function
function toggleAccordion() {
    const accordion = document.getElementById('detailAccordion');
    const icon = document.getElementById('accordionIcon');
    
    accordion.classList.toggle('active');
    icon.classList.toggle('active');
    
    // Smooth scroll to accordion if opening
    if (accordion.classList.contains('active')) {
        setTimeout(() => {
            accordion.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }
}

// Profile Edit Functions
let isEditing = false;

function toggleEdit() {
    isEditing = !isEditing;
    const inputs = document.querySelectorAll('#profileForm .form-input');
    
    inputs.forEach(input => {
        input.readOnly = !isEditing;
        if (isEditing) {
            input.style.backgroundColor = '#fff';
            input.style.borderColor = '#8BC34A';
        } else {
            input.style.backgroundColor = '#f1f8e9';
            input.style.borderColor = '#C5E1A5';
        }
    });
    
    // Visual feedback
    if (isEditing) {
        const firstInput = inputs[0];
        firstInput.focus();
    }
}

function saveProfile() {
    if (isEditing) {
        toggleEdit();
    }
    showNotification('Profil berhasil disimpan!');
}

// Password Toggle
function togglePassword(icon) {
    const input = icon.previousElementSibling;
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

// File Upload Handling
function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        const dropZone = document.getElementById('dropZone');
        dropZone.innerHTML = `
            <div style="text-align: center; color: #4CAF50;">
                <i class="fas fa-check-circle" style="font-size: 40px; margin-bottom: 10px;"></i>
                <p style="font-weight: 600;">${file.name}</p>
                <p style="font-size: 12px; color: #666;">Berhasil diupload</p>
            </div>
        `;
        dropZone.style.borderColor = '#4CAF50';
        dropZone.style.backgroundColor = '#f1f8e9';
    }
}

// Drag and Drop Simulation
document.addEventListener('DOMContentLoaded', function() {
    const dropZone = document.getElementById('dropZone');
    if (dropZone) {
        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.style.backgroundColor = '#e3f2fd';
        });
        
        dropZone.addEventListener('dragleave', (e) => {
            e.preventDefault();
            dropZone.style.backgroundColor = '#f8f9fa';
        });
        
        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                handleFileSelect({ target: { files: files } });
            }
        });
    }
    
    // Add delete buttons to table rows
    const tableRows = document.querySelectorAll('#tableBody tr');
    tableRows.forEach(row => {
        const actionCell = row.querySelector('td:last-child');
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn-delete';
        deleteBtn.innerHTML = 'Delete';
        deleteBtn.onclick = function() {
            openModal('deleteModal');
        };
        actionCell.appendChild(deleteBtn);
    });
});

// Save Data Function
function saveData() {
    showNotification('Data berhasil disimpan!');
    closeModal('tambahModal');
    // Reset form
    document.getElementById('tambahForm').reset();
    // Reset upload box
    const dropZone = document.getElementById('dropZone');
    if (dropZone) {
        dropZone.innerHTML = `
            <div class="upload-content">
                <p class="upload-title">Masukan Gambar Kotak MBG Kamu</p>
                <button type="button" class="btn-upload" onclick="document.getElementById('fileInput').click()">
                    <i class="fas fa-plus"></i> Upload Gambar
                </button>
                <p class="upload-hint">Klik atau drop gambar pada kotak bergaris ini</p>
                <input type="file" id="fileInput" hidden accept="image/*" onchange="handleFileSelect(event)">
            </div>
        `;
        dropZone.style.borderColor = '#2196F3';
        dropZone.style.backgroundColor = '#f8f9fa';
    }
}

// Delete Functions
function confirmDelete() {
    showNotification('Data berhasil dihapus!');
    closeModal('deleteModal');
}

// Search Functionality
document.getElementById('searchInput').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const rows = document.querySelectorAll('#tableBody tr');
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
});

// Pagination Interaction
document.querySelectorAll('.page-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        if (!this.querySelector('i')) {
            document.querySelectorAll('.page-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        }
    });
});

// Notification Function
function showNotification(message) {
    // Create notification element
    const notif = document.createElement('div');
    notif.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #4CAF50;
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 9999;
        font-weight: 500;
        animation: slideIn 0.3s ease;
    `;
    notif.textContent = message;
    
    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(400px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notif);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notif.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => {
            notif.remove();
        }, 300);
    }, 3000);
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