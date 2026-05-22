const USER_ROLES = {
    superadmin: {
        name: 'Super Admin',
        redirect: '../superadmin/SuperAdmin.html'
    },
    admin: {
        name: 'Admin',
        redirect: '../admin/admin.html'
    },
    penerima: {
        name: 'Penerima',
        redirect: '../penerima/penerima.html'
    },
    karyawan: {
        name: 'Karyawan',
        redirect: '../karyawan/karyawan.html'
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const username = document.getElementById('username').value.trim().toLowerCase();
        const password = document.getElementById('password').value;
        const btn = document.querySelector('.login-btn');

        if (!username) {
            alert('Masukkan username terlebih dahulu.');
            return;
        }

        if (!password) {
            alert('Masukkan password terlebih dahulu.');
            return;
        }

        const user = USER_ROLES[username];
        if (!user) {
            alert('Username tidak dikenal. Gunakan salah satu: superadmin, admin, karyawan, penerima');
            return;
        }

        const originalText = btn.innerHTML;
        btn.innerHTML = 'Memproses...';
        btn.style.opacity = '0.7';
        btn.disabled = true;

        setTimeout(() => {
            saveSession(username, user);
            window.location.href = user.redirect;
        }, 800);
    });
});

function saveSession(username, user) {
    const sessionData = {
        username,
        role: username,
        name: user.name,
        loginTime: new Date().toISOString(),
        isLoggedIn: true
    };
    localStorage.setItem('smartmbg_session', JSON.stringify(sessionData));
}

