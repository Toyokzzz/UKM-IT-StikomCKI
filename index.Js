function initOSMMap() {
    const lokasi = [ -6.200000, 106.816666 ];


    const map = L.map('osm-map').setView(lokasi, 13);

    // Tambahkan tile layer OSM ke peta
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Tambahkan marker untuk menandai lokasi tertentu
    L.marker(lokasi).addTo(map)
        .bindPopup('<b>Lokasi Kami!</b><br>Sekolah Tinggi Ilmu Komputer CKI')
        .openPopup();
}

// Panggil fungsi initOSMMap saat halaman selesai dimuat
window.onload = initOSMMap;


document.addEventListener('DOMContentLoaded', function () {
    // Fungsi untuk mengupdate data di halaman
    updateVisitorCount();
    updateNotificationCount();

    // Fungsi untuk menambah pengunjung
    function updateVisitorCount() {
        let visitorCount = localStorage.getItem('visitorCount');
        if (!visitorCount) {
            visitorCount = 0;
        }
        visitorCount = parseInt(visitorCount) + 1; // Menambahkan pengunjung
        localStorage.setItem('visitorCount', visitorCount); // Menyimpan kembali jumlah pengunjung
        document.getElementById('visitor-count').textContent = visitorCount; // Memperbarui tampilan
    }

    // Fungsi untuk menambah notifikasi
    function updateNotificationCount() {
        let notificationCount = localStorage.getItem('notificationCount');
        if (!notificationCount) {
            notificationCount = 0;
        }
        // Simulasikan penambahan notifikasi
        notificationCount = parseInt(notificationCount) + 1;
        localStorage.setItem('notificationCount', notificationCount); // Menyimpan jumlah notifikasi
        document.getElementById('notification-count').textContent = notificationCount; // Memperbarui tampilan
    }

    // Fungsi untuk menambah anggota aktif
    // Misalnya, jika ada perubahan jumlah anggota, Anda bisa memperbarui manual di sini
    // Kami menggunakan nilai statis untuk anggota terdaftar
    let memberCount = 150; // Anggota terdaftar bisa diubah sesuai dengan data aktual
    document.getElementById('member-count').textContent = memberCount;
});

// Misalnya mengambil data dari API (jika tersedia)
fetch('/api/dashboard')
    .then(response => response.json())
    .then(data => {
        document.getElementById('visitor-count').textContent = data.visitorCount;
        document.getElementById('notification-count').textContent = data.notificationCount;
        document.getElementById('member-count').textContent = data.memberCount;
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
