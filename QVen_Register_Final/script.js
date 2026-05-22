document.addEventListener('DOMContentLoaded', () => {
    // --- ELEMENT MAP ---
    const mapModal = document.getElementById('mapModal');
    const openMapBtn = document.getElementById('openMap');
    const lokasiInput = document.getElementById('lokasiInput');
    const closeModal = document.getElementById('closeModal');
    const cancelMap = document.getElementById('cancelMap');
    const saveCoords = document.getElementById('saveCoords');

    // --- ELEMENT INSTANSI ---
    const instansiModal = document.getElementById('instansiModal');
    const openInstansiBtn = document.getElementById('openInstansi');
    const btnYa = document.getElementById('instansiYa');
    const btnTidak = document.getElementById('instansiTidak');
    const dropdownInstansiContainer = document.getElementById('dropdownInstansiContainer');
    const teksTanpaInstansi = document.getElementById('teksTanpaInstansi');
    const selectInstansi = document.getElementById('selectInstansi');

    let map;
    let marker;
    let tempCoords = null;

    // --- LOGIKA MAP ---
    openMapBtn.addEventListener('click', () => {
        mapModal.classList.add('active');
        setTimeout(() => {
            if (!map) {
                // Set default view ke Pontianak
                map = L.map('map').setView([-0.0227, 109.3425], 13);
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
                
                map.on('click', (e) => {
                    const lat = e.latlng.lat;
                    const lng = e.latlng.lng;
                    if (marker) {
                        marker.setLatLng([lat, lng]);
                    } else {
                        marker = L.marker([lat, lng]).addTo(map);
                    }
                    tempCoords = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
                });
            }
            map.invalidateSize();
        }, 300);
    });

    const closeMapFunc = () => { mapModal.classList.remove('active'); };
    closeModal.addEventListener('click', closeMapFunc);
    cancelMap.addEventListener('click', closeMapFunc);
    
    saveCoords.addEventListener('click', () => {
        if(tempCoords){
            lokasiInput.value = tempCoords;
            closeMapFunc();
        } else {
            alert("Pilih lokasi terlebih dahulu di peta");
        }
    });

    // --- LOGIKA INSTANSI ---
    openInstansiBtn.addEventListener('click', () => {
        instansiModal.classList.add('active');
    });

    // Jika pilih YA
    btnYa.addEventListener('click', () => {
        instansiModal.classList.remove('active');
        
        // Tampilkan dropdown
        dropdownInstansiContainer.style.display = 'flex';
        selectInstansi.setAttribute('required', 'required');
        
        // Sembunyikan tombol awal dan teks
        openInstansiBtn.style.display = 'none';
        teksTanpaInstansi.style.display = 'none';
    });

    // Jika pilih TIDAK
    btnTidak.addEventListener('click', () => {
        instansiModal.classList.remove('active');
        
        // Sembunyikan dropdown
        dropdownInstansiContainer.style.display = 'none';
        selectInstansi.removeAttribute('required');
        
        // Sembunyikan tombol awal
        openInstansiBtn.style.display = 'none';
        
        // Tampilkan teks penerima umum
        teksTanpaInstansi.style.display = 'block';
    });
});
