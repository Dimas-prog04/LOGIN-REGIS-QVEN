document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const btn = document.querySelector('.login-btn');
        
        if (username && password) {
            // Efek loading simpel saat tombol ditekan
            const originalText = btn.innerHTML;
            btn.innerHTML = 'Memproses...';
            btn.style.opacity = '0.7';
            btn.disabled = true;

            // Simulasi proses login (bisa disambungkan ke endpoint backend nanti)
            setTimeout(() => {
                console.log(`Mencoba login dengan username: ${username}`);
                
                // Kembalikan tombol ke keadaan semula
                btn.innerHTML = originalText;
                btn.style.opacity = '1';
                btn.disabled = false;
                
                // Form reset untuk contoh
                // loginForm.reset(); 
            }, 1000);
        }
    });
});
